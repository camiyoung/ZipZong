package jibjoong.jibjoong.api.service;

import jibjoong.jibjoong.api.dto.ranking.HallOfFameResponse;
import jibjoong.jibjoong.api.dto.ranking.MemberRankingResponse;
import jibjoong.jibjoong.api.dto.ranking.TeamRankingResponse;
import jibjoong.jibjoong.db.domain.*;
import jibjoong.jibjoong.db.repository.exercise.ExerciseRepository;
import jibjoong.jibjoong.db.repository.exercise.MemberCalendarRepository;
import jibjoong.jibjoong.db.repository.exercise.TeamCalendarRepository;
import jibjoong.jibjoong.db.repository.history.MemberHistoryDetailRepository;
import jibjoong.jibjoong.db.repository.history.MemberHistoryRepository;
import jibjoong.jibjoong.db.repository.history.TeamHistoryDetailRepository;
import jibjoong.jibjoong.db.repository.history.TeamHistoryRepository;
import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
import jibjoong.jibjoong.db.repository.memberteam.RegistrationRepository;
import jibjoong.jibjoong.db.repository.memberteam.TeamIconRepository;
import jibjoong.jibjoong.db.repository.memberteam.TeamRepository;
import jibjoong.jibjoong.exception.CustomException;
import jibjoong.jibjoong.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class RankingService {
    // @author 황승주
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final MemberCalendarRepository memberCalendarRepository;
    private final MemberHistoryRepository memberHistoryRepository;
    private final RegistrationRepository registrationRepository;
    private final ExerciseRepository exerciseRepository;
    private final TeamCalendarRepository teamCalendarRepository;
    private final TeamHistoryRepository teamHistoryRepository;
    private final MemberHistoryDetailRepository memberHistoryDetailRepository;
    private final TeamHistoryDetailRepository teamHistoryDetailRepository;
    private final TeamIconRepository teamIconRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private static final Long BOUNDARY = 5L;

    @Scheduled(cron = "1 0 0 * * ?")
    public void comprehensiveUpdate() {

        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        LocalDate today = LocalDate.now().minusDays(1);

        // # Redis 초기화 작업
        //  - redis의 정보를 모두 clear한다. (팀 해체 등의 이유)
        if (Boolean.TRUE.equals(redisTemplate.hasKey("halloffame"))) redisTemplate.delete("halloffame");
        if (Boolean.TRUE.equals(redisTemplate.hasKey("strickrank"))) redisTemplate.delete("strickrank");
        if (Boolean.TRUE.equals(redisTemplate.hasKey("timerank"))) redisTemplate.delete("timerank");
        if (Boolean.TRUE.equals(redisTemplate.hasKey("personalstrickrank"))) redisTemplate.delete("personalstrickrank");
        if (Boolean.TRUE.equals(redisTemplate.hasKey("personaltimerank"))) redisTemplate.delete("personaltimerank");

        // # 정보 갱신 작업
        //
        //  - 개인 기록
        //    멤버 캘린더를 확인하여 오늘 날짜에 대한 정보가 없다면 스트릭을 끊는다.

        List<Member> members = memberRepository.AllMembersNoDeleted();
        for (Member member : members) {
            if (memberCalendarRepository.findByMemberIdAndCheckDate(member.getId(), today).isEmpty()) {
                MemberHistory memberHistory = memberHistoryRepository.findByMemberId(member.getId()).orElse
                        (MemberHistory.builder()
                                .maximumStrick(0)
                                .currentStrick(0)
                                .build());

                memberHistory.setCurrentStrick(0);
                memberHistoryRepository.save(memberHistory);
                member.setMemberHistory(memberHistory);
            }

            // 개인 랭킹 Redis 삽입 작업
            //  - 최대 스트릭 랭킹
            //    모든 멤버의 히스토리의 최대 스트릭 길이를 조회하여 value는 memberId, score는 최대 스트릭 길이로 저장
            if (member.getMemberHistory().getMaximumStrick() != 0) {
                String rankingBoard = "personalstrickrank";
                zSetOperations.add(rankingBoard, member.getId().toString(), member.getMemberHistory().getMaximumStrick());
            }

            //  - 누적 시간 랭킹
            //    모든 멤버의 히스토리 디테일의 운동시간을 계산하여 value는 memberId, score는 누적운동 시간으로 저장
            List<MemberHistoryDetail> memberHistoryDetails = memberHistoryDetailRepository.findByMemberHistoryId(member.getMemberHistory().getId());

            int totalTime = 0;
            for (MemberHistoryDetail memberHistoryDetail : memberHistoryDetails) {
                totalTime += memberHistoryDetail.getExerciseTime();
            }

            if (totalTime != 0) {
                String rankingBoard = "personaltimerank";
                zSetOperations.add(rankingBoard, member.getId().toString(), totalTime);
            }
        }

        //  - 팀 기록
        //    각 팀의 모든 멤버의 기록을 조회하여 모두 운동했다면 현재 스트릭 및 최대 스트릭 갱신 + 팀 캘린더에 해당 날짜 state를 SUCCESS로 세팅
        //    모두 운동 하지 않았으나 보유한 실드가 있다면 실드 1개 소모 + 현재 스트릭 및 최대 스트릭 갱신 + 팀 캘린더에 해당 날짜 state를 SHIELD로 세팅
        //    모두 운동 하지 않았고 실드가 없다면 스트릭을 끊는다.

        List<Team> teams = teamRepository.getAllTeamNoDeleted();
        for (Team team : teams) {
            boolean check = true;
            List<Registration> registrations = registrationRepository.findAllInTeamNoResigned(team.getId());
            for (Registration registration : registrations) {
                if (exerciseRepository.findByRegistrationIdAndExerciseDate(registration.getId(), today).isEmpty()) {
                    check = false;
                    break;
                }
            }

            TeamHistory teamHistory = teamHistoryRepository.findByTeamId(team.getId())
                    .orElse(TeamHistory.builder()
                            .maximumStrick(0)
                            .currentStrick(0)
                            .build());

            if (check) {
                teamHistory.setCurrentStrick(teamHistory.getCurrentStrick() + 1);

                if (teamHistory.getMaximumStrick() < teamHistory.getCurrentStrick()) {
                    teamHistory.setMaximumStrick(teamHistory.getCurrentStrick());
                }

                teamHistoryRepository.save(teamHistory);
                team.setTeamHistory(teamHistory);

                TeamCalendar teamCalendar = TeamCalendar.builder()
                        .team(team)
                        .checkDate(today)
                        .state("SUCCESS")
                        .build();

                teamCalendarRepository.save(teamCalendar);
            } else {
                if (team.getShieldCount() > 0) {
                    team.useShield();

                    teamHistory.setCurrentStrick(teamHistory.getCurrentStrick() + 1);

                    if (teamHistory.getMaximumStrick() < teamHistory.getCurrentStrick()) {
                        teamHistory.setMaximumStrick(teamHistory.getCurrentStrick());
                    }

                    teamHistoryRepository.save(teamHistory);
                    team.setTeamHistory(teamHistory);

                    TeamCalendar teamCalendar = TeamCalendar.builder()
                            .team(team)
                            .checkDate(today)
                            .state("SHIELD")
                            .build();

                    teamCalendarRepository.save(teamCalendar);

                    // 최초 실드 사용 뱃지 추가
                    if (teamIconRepository.findByTeamIdAndIconName(team.getId(), "groupShieldFirstUse").isEmpty()) {
                        TeamIcon teamIcon = TeamIcon.builder()
                                .team(team)
                                .iconName("groupShieldFirstUse")
                                .build();
                        teamIconRepository.save(teamIcon);
                    }

                } else {
                    teamHistory.setCurrentStrick(0);
                    teamHistoryRepository.save(teamHistory);
                    team.setTeamHistory(teamHistory);
                }
            }

            // 최초 3일 스트릭 뱃지 추가
            if (teamHistory.getCurrentStrick() == 3 && teamIconRepository.findByTeamIdAndIconName(team.getId(), "groupMaxStreak3Days").isEmpty()) {
                TeamIcon teamIcon = TeamIcon.builder()
                        .team(team)
                        .iconName("groupMaxStreak3Days")
                        .build();
                teamIconRepository.save(teamIcon);
            }

            // 최초 7일 스트릭 뱃지 추가
            if (teamHistory.getCurrentStrick() == 7 && teamIconRepository.findByTeamIdAndIconName(team.getId(), "groupMaxStreak7Days").isEmpty()) {
                TeamIcon teamIcon = TeamIcon.builder()
                        .team(team)
                        .iconName("groupMaxStreak7Days")
                        .build();
                teamIconRepository.save(teamIcon);
            }

            // 최초 21일 스트릭 뱃지 추가
            if (teamHistory.getCurrentStrick() == 21 && teamIconRepository.findByTeamIdAndIconName(team.getId(), "groupMaxStreak21Days").isEmpty()) {
                TeamIcon teamIcon = TeamIcon.builder()
                        .team(team)
                        .iconName("groupMaxStreak21Days")
                        .build();
                teamIconRepository.save(teamIcon);
            }

            // 최초 66일 스트릭 뱃지 추가
            if (teamHistory.getCurrentStrick() == 66 && teamIconRepository.findByTeamIdAndIconName(team.getId(), "groupMaxStreak66Days").isEmpty()) {
                TeamIcon teamIcon = TeamIcon.builder()
                        .team(team)
                        .iconName("groupMaxStreak66Days")
                        .build();
                teamIconRepository.save(teamIcon);
            }

            //    21일 달성 팀 실드 추가
            if (teamHistory.getCurrentStrick() != 0 && teamHistory.getCurrentStrick() % 21 == 0) {
                team.addShieldCount(1);
            }

            //    66일 달성 팀 명예의 전당 달성일 기록
            if (teamHistory.getMaximumStrick() == 66) {
                if (teamHistory.getHallOfFameDate() == null) {
                    teamHistory.setHallOfFameDate(today);
                }
            }

            // # 랭킹정보 Redis 삽입 작업
            //
            //  - 명예의 전당
            //    모든 팀의 히스토리를 조회하여 명예의 전당 달성한 팀들만 뽑고 value는 teamId, score는 (현재날짜 - 달성날짜)로 저장
            if (teamHistory.getHallOfFameDate() != null) {
                String rankingBoard = "halloffame";

                Period period = Period.between(teamHistory.getHallOfFameDate(), today);
                zSetOperations.add(rankingBoard, team.getId().toString(), period.getYears() * 365 + period.getMonths() * 30 + period.getDays() + 1);
            }

            //  - 최대 스트릭 랭킹
            //    모든 팀의 히스토리의 최대 스트릭 길이를 조회하여 value는 teamId, score는 최대 스트릭 길이로 저장
            if (teamHistory.getMaximumStrick() != 0) {
                String rankingBoard = "strickrank";
                zSetOperations.add(rankingBoard, team.getId().toString(), teamHistory.getMaximumStrick());
            }

            //  - 누적 시간 랭킹
            //    모든 팀의 히스토리 디테일의 운동시간을 계산하여 value는 teamId, score는 누적운동 시간으로 저장
            List<TeamHistoryDetail> teamHistoryDetails = teamHistoryDetailRepository.findByTeamHistoryId(teamHistory.getId());

            int totalTime = 0;
            for (TeamHistoryDetail teamHistoryDetail : teamHistoryDetails) {
                totalTime += teamHistoryDetail.getExerciseTime();
            }

            if (totalTime != 0) {
                String rankingBoard = "timerank";
                zSetOperations.add(rankingBoard, team.getId().toString(), totalTime);
            }
        }
    }

    // 명예의 전당
    public List<HallOfFameResponse.HallOfFame> getHallOfFames() {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String rankingBoard = "halloffame";
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, 9);

        if (rankSet.isEmpty()) return new ArrayList<>();

        List<HallOfFameResponse.HallOfFame> hallOfFames = new ArrayList<>();

        int rank = 0;
        for (ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long teamId = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int satisfiedTime = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            HallOfFameResponse.HallOfFame hallOfFame = new HallOfFameResponse.HallOfFame();

            hallOfFame.setRank(rank);
            hallOfFame.setTeamId(teamId);
            hallOfFame.setTeamIcon(team.getRepIcon());
            hallOfFame.setTeamName(team.getName());
            hallOfFame.setSatisfiedTime(satisfiedTime);

            hallOfFames.add(hallOfFame);
        }

        return hallOfFames;
    }

    // 팀 스트릭 랭킹
    public List<HallOfFameResponse.StrickRank> getStrickRanks() {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String rankingBoard = "strickrank";
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, 9);

        if (rankSet.isEmpty()) return new ArrayList<>();

        List<HallOfFameResponse.StrickRank> strickRanks = new ArrayList<>();

        int rank = 0;
        for (ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long teamId = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int maxStrick = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            HallOfFameResponse.StrickRank strickRank = new HallOfFameResponse.StrickRank();

            strickRank.setRank(rank);
            strickRank.setTeamId(teamId);
            strickRank.setTeamIcon(team.getRepIcon());
            strickRank.setTeamName(team.getName());
            strickRank.setMaxStrick(maxStrick);

            strickRanks.add(strickRank);
        }

        return strickRanks;
    }

    // 팀 타임 랭킹
    public List<HallOfFameResponse.TimeRank> getTimeRanks() {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String rankingBoard = "timerank";
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, 9);

        if (rankSet.isEmpty()) return new ArrayList<>();

        List<HallOfFameResponse.TimeRank> timeRanks = new ArrayList<>();

        int rank = 0;
        for (ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long teamId = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int totalTime = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            HallOfFameResponse.TimeRank timeRank = new HallOfFameResponse.TimeRank();

            timeRank.setRank(rank);
            timeRank.setTeamId(teamId);
            timeRank.setTeamIcon(team.getRepIcon());
            timeRank.setTeamName(team.getName());
            timeRank.setTotalTime(totalTime);

            timeRanks.add(timeRank);
        }

        return timeRanks;
    }

    // 개인 스트릭 랭킹
    public List<HallOfFameResponse.PersonalStrickRank> getPersonalStrickRanks() {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String rankingBoard = "personalstrickrank";
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, 9);

        if (rankSet.isEmpty()) return new ArrayList<>();

        List<HallOfFameResponse.PersonalStrickRank> strickRanks = new ArrayList<>();

        int rank = 0;
        for (ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long memberId = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int maxStrick = Objects.requireNonNull(tuple.getScore()).intValue();

            Member member = memberRepository.findById(memberId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
            );

            HallOfFameResponse.PersonalStrickRank strickRank = new HallOfFameResponse.PersonalStrickRank();

            strickRank.setRank(rank);
            strickRank.setMemberId(memberId);
            strickRank.setMemberIcon(member.getRepIcon());
            strickRank.setNickName(member.getNickname());
            strickRank.setMaxStrick(maxStrick);

            strickRanks.add(strickRank);
        }

        return strickRanks;
    }

    // 개인 타임 랭킹
    public List<HallOfFameResponse.PersonalTimeRank> getPersonalTimeRanks() {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String rankingBoard = "personaltimerank";
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, 9);

        if (rankSet.isEmpty()) return new ArrayList<>();

        List<HallOfFameResponse.PersonalTimeRank> timeRanks = new ArrayList<>();

        int rank = 0;
        for (ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long memberId = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int totalTime = Objects.requireNonNull(tuple.getScore()).intValue();

            Member member = memberRepository.findById(memberId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
            );

            HallOfFameResponse.PersonalTimeRank timeRank = new HallOfFameResponse.PersonalTimeRank();

            timeRank.setRank(rank);
            timeRank.setMemberId(memberId);
            timeRank.setMemberIcon(member.getRepIcon());
            timeRank.setNickName(member.getNickname());
            timeRank.setTotalTime(totalTime);

            timeRanks.add(timeRank);
        }

        return timeRanks;
    }

    // 팀 페이지 스트릭 랭킹
    public TeamRankingResponse.StrickRank getStrickRank(Long teamId) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String rankingBoard = "strickrank";

        Long ranking = zSetOperations.reverseRank(rankingBoard, teamId.toString());
        if (ranking == null) return null;

        long start = ranking - BOUNDARY;
        long end = ranking + BOUNDARY;
        if (ranking - BOUNDARY < 0) start = 0L;
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, start, end);

        if (rankSet.isEmpty()) return null;

        TeamRankingResponse.StrickRank strickRank = new TeamRankingResponse.StrickRank();

        List<TeamRankingResponse.StrickRankDetail> over = new ArrayList<>();
        TeamRankingResponse.StrickRankDetail me = new TeamRankingResponse.StrickRankDetail();
        List<TeamRankingResponse.StrickRankDetail> under = new ArrayList<>();

        int rank = (int) start;
        for (ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long id = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int maxStrick = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(id).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            TeamRankingResponse.StrickRankDetail strickRankDetail = new TeamRankingResponse.StrickRankDetail();

            strickRankDetail.setRank(rank);
            strickRankDetail.setTeamId(teamId);
            strickRankDetail.setTeamIcon(team.getRepIcon());
            strickRankDetail.setTeamName(team.getName());
            strickRankDetail.setMaxStrick(maxStrick);

            if (rank < ranking.intValue() + 1) {
                over.add(strickRankDetail);
            } else if (rank == ranking.intValue() + 1) {
                me = strickRankDetail;
            } else {
                under.add(strickRankDetail);
            }
        }

        strickRank.setOver(over);
        strickRank.setMe(me);
        strickRank.setUnder(under);

        return strickRank;
    }

    // 팀 페이지 타임 랭킹
    public TeamRankingResponse.TimeRank getTimeRank(Long teamId) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String rankingBoard = "timerank";

        Long ranking = zSetOperations.reverseRank(rankingBoard, teamId.toString());
        if (ranking == null) return null;

        long start = ranking - BOUNDARY;
        long end = ranking + BOUNDARY;
        if (ranking - BOUNDARY < 0) start = 0L;
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, start, end);

        if (rankSet.isEmpty()) return null;

        TeamRankingResponse.TimeRank timeRank = new TeamRankingResponse.TimeRank();

        List<TeamRankingResponse.TimeRankDetail> over = new ArrayList<>();
        TeamRankingResponse.TimeRankDetail me = new TeamRankingResponse.TimeRankDetail();
        List<TeamRankingResponse.TimeRankDetail> under = new ArrayList<>();

        int rank = (int) start;
        for (ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long id = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int totalTime = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(id).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            TeamRankingResponse.TimeRankDetail timeRankDetail = new TeamRankingResponse.TimeRankDetail();

            timeRankDetail.setRank(rank);
            timeRankDetail.setTeamId(teamId);
            timeRankDetail.setTeamIcon(team.getRepIcon());
            timeRankDetail.setTeamName(team.getName());
            timeRankDetail.setTotalTime(totalTime);

            if (rank < ranking.intValue() + 1) {
                over.add(timeRankDetail);
            } else if (rank == ranking.intValue() + 1) {
                me = timeRankDetail;
            } else {
                under.add(timeRankDetail);
            }
        }

        timeRank.setOver(over);
        timeRank.setMe(me);
        timeRank.setUnder(under);

        return timeRank;
    }

    // 개인 페이지 스트릭 랭킹
    public MemberRankingResponse.StrickRank getPersonalStrickRank(Long memberId) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String rankingBoard = "personalstrickrank";

        Long ranking = zSetOperations.reverseRank(rankingBoard, memberId.toString());
        if (ranking == null) return null;

        long start = ranking - BOUNDARY;
        long end = ranking + BOUNDARY;
        if (ranking - BOUNDARY < 0) start = 0L;
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, start, end);

        if (rankSet.isEmpty()) return null;

        MemberRankingResponse.StrickRank strickRank = new MemberRankingResponse.StrickRank();

        List<MemberRankingResponse.StrickRankDetail> over = new ArrayList<>();
        MemberRankingResponse.StrickRankDetail me = new MemberRankingResponse.StrickRankDetail();
        List<MemberRankingResponse.StrickRankDetail> under = new ArrayList<>();

        int rank = (int) start;
        for (ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long id = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int maxStrick = Objects.requireNonNull(tuple.getScore()).intValue();

            Member member = memberRepository.findById(id).orElseThrow(
                    () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
            );

            MemberRankingResponse.StrickRankDetail strickRankDetail = new MemberRankingResponse.StrickRankDetail();

            strickRankDetail.setRank(rank);
            strickRankDetail.setMemberId(memberId);
            strickRankDetail.setMemberIcon(member.getRepIcon());
            strickRankDetail.setNickName(member.getNickname());
            strickRankDetail.setMaxStrick(maxStrick);

            if (rank < ranking.intValue() + 1) {
                over.add(strickRankDetail);
            } else if (rank == ranking.intValue() + 1) {
                me = strickRankDetail;
            } else {
                under.add(strickRankDetail);
            }
        }

        strickRank.setOver(over);
        strickRank.setMe(me);
        strickRank.setUnder(under);

        return strickRank;
    }

    // 개인 페이지 타임 랭킹
    public MemberRankingResponse.TimeRank getPersonalTimeRank(Long memberId) {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String rankingBoard = "personaltimerank";

        Long ranking = zSetOperations.reverseRank(rankingBoard, memberId.toString());
        if (ranking == null) return null;

        long start = ranking - BOUNDARY;
        long end = ranking + BOUNDARY;
        if (ranking - BOUNDARY < 0) start = 0L;
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, start, end);

        if (rankSet.isEmpty()) return null;

        MemberRankingResponse.TimeRank timeRank = new MemberRankingResponse.TimeRank();

        List<MemberRankingResponse.TimeRankDetail> over = new ArrayList<>();
        MemberRankingResponse.TimeRankDetail me = new MemberRankingResponse.TimeRankDetail();
        List<MemberRankingResponse.TimeRankDetail> under = new ArrayList<>();

        int rank = (int) start;
        for (ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long id = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int totalTime = Objects.requireNonNull(tuple.getScore()).intValue();

            Member member = memberRepository.findById(id).orElseThrow(
                    () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
            );

            MemberRankingResponse.TimeRankDetail timeRankDetail = new MemberRankingResponse.TimeRankDetail();

            timeRankDetail.setRank(rank);
            timeRankDetail.setMemberId(memberId);
            timeRankDetail.setMemberIcon(member.getRepIcon());
            timeRankDetail.setNickName(member.getNickname());
            timeRankDetail.setTotalTime(totalTime);

            if (rank < ranking.intValue() + 1) {
                over.add(timeRankDetail);
            } else if (rank == ranking.intValue() + 1) {
                me = timeRankDetail;
            } else {
                under.add(timeRankDetail);
            }
        }

        timeRank.setOver(over);
        timeRank.setMe(me);
        timeRank.setUnder(under);

        return timeRank;
    }
}