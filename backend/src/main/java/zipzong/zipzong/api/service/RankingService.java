package zipzong.zipzong.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import zipzong.zipzong.api.dto.ranking.HallOfFameResponse;
import zipzong.zipzong.api.dto.ranking.TeamRankingResponse;
import zipzong.zipzong.db.domain.Team;
import zipzong.zipzong.db.repository.memberteam.TeamRepository;
import zipzong.zipzong.exception.CustomException;
import zipzong.zipzong.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class RankingService {

    private final TeamRepository teamRepository;

    private final RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();

    final ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

    private static final Long BOUNDARY = 5L;

    @Scheduled(cron = "0 0 0 * * ?")
    public void comprehensiveUpdate() {
        // # 정보 갱신 작업

        //  - 개인 기록
        //    멤버 캘린더를 확인하여 오늘 날짜에 대한 정보가 없다면 스트릭을 끊는다.
        //
        //  - 팀 기록
        //    각 팀의 모든 멤버의 기록을 조회하여 모두 운동했다면 현재 스트릭 및 최대 스트릭 갱신 + 팀 캘린더에 해당 날짜 state를 SUCCESS로 세팅
        //    모두 운동 하지 않았으나 보유한 실드가 있다면 실드 1개 소모 + 현재 스트릭 및 최대 스트릭 갱신 + 팀 캘린더에 해당 날짜 state를 SHIELD로 세팅
        //    모두 운동 하지 않았고 실드가 없다면 스트릭을 끊는다.
        //    21일 달성 팀 실드 추가
        //    66일 달성 팀 명예의 전당 달성일 기록
        //
        // # 랭킹정보 Redis 삽입 작업
        //  - redis의 정보를 모두 clear한다. (팀 해체 등의 이유)
        //
        //  - 명예의 전당
        //    모든 팀의 히스토리를 조회하여 명예의 전당 달성한 팀들만 뽑고 value는 teamId, score는 (현재날짜 - 달성날짜)로 저장
        //
        //  - 누적 시간 랭킹
        //    모든 팀의 히스토리 디테일의 운동시간을 계산하여 value는 teamId, score는 누적운동 시간으로 저장
        //
        //  - 최대 스트릭 랭킹
        //    모든 팀의 히스토리의 최대 스트릭 길이를 조회하여 value는 teamId, score는 최대 스트릭 길이로 저장


    }

    public List<HallOfFameResponse.HallOfFame> getHallOfFames() {
        String rankingBoard = "halloffame";
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, 9);

        if(rankSet == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        List<HallOfFameResponse.HallOfFame> hallOfFames = new ArrayList<>();

        int rank = 0;
        for(ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long teamId = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int satisfiedTime = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            HallOfFameResponse.HallOfFame hallOfFame = new HallOfFameResponse.HallOfFame();

            hallOfFame.setRank(rank);
            hallOfFame.setTeamIcon(team.getRepIcon());
            hallOfFame.setTeamName(team.getName());
            hallOfFame.setSatisfiedTime(satisfiedTime);

            hallOfFames.add(hallOfFame);
        }

        return hallOfFames;
    }

    public List<HallOfFameResponse.StrickRank> getStrickRanks() {
        String rankingBoard = "strickrank";
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, 9);

        if(rankSet == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        List<HallOfFameResponse.StrickRank> strickRanks = new ArrayList<>();

        int rank = 0;
        for(ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long teamId = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int maxStrick = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            HallOfFameResponse.StrickRank strickRank = new HallOfFameResponse.StrickRank();

            strickRank.setRank(rank);
            strickRank.setTeamIcon(team.getRepIcon());
            strickRank.setTeamName(team.getName());
            strickRank.setMaxStrick(maxStrick);

            strickRanks.add(strickRank);
        }

        return strickRanks;
    }

    public List<HallOfFameResponse.TimeRank> getTimeRanks() {
        String rankingBoard = "timerank";
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, 9);

        if(rankSet == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        List<HallOfFameResponse.TimeRank> timeRanks = new ArrayList<>();

        int rank = 0;
        for(ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long teamId = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int totalTime = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            HallOfFameResponse.TimeRank timeRank = new HallOfFameResponse.TimeRank();

            timeRank.setRank(rank);
            timeRank.setTeamIcon(team.getRepIcon());
            timeRank.setTeamName(team.getName());
            timeRank.setTotalTime(totalTime);

            timeRanks.add(timeRank);
        }

        return timeRanks;
    }

    public List<TeamRankingResponse.StrickRank> getStrickRanks(Long teamId) {
        String rankingBoard = "strickrank";

        Long ranking = zSetOperations.reverseRank(rankingBoard, teamId);
        if(ranking == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        long start = ranking - BOUNDARY;
        long end = ranking + BOUNDARY;
        if(ranking - BOUNDARY < 0) start = 0L;
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, start, end);

        if(rankSet == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        List<TeamRankingResponse.StrickRank> strickRanks = new ArrayList<>();

        int rank = (int)start;
        for(ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long id = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int maxStrick = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            TeamRankingResponse.StrickRank strickRank = new TeamRankingResponse.StrickRank();

            strickRank.setRank(rank);
            strickRank.setTeamIcon(team.getRepIcon());
            strickRank.setTeamName(team.getName());
            strickRank.setMaxStrick(maxStrick);

            strickRanks.add(strickRank);
        }

        return strickRanks;
    }

    public List<TeamRankingResponse.TimeRank> getTimeRanks(Long teamId) {
        String rankingBoard = "timerank";

        Long ranking = zSetOperations.reverseRank(rankingBoard, teamId);
        if(ranking == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        long start = ranking - BOUNDARY;
        long end = ranking + BOUNDARY;
        if(ranking - BOUNDARY < 0) start = 0L;
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, start, end);

        if(rankSet == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        List<TeamRankingResponse.TimeRank> timeRanks = new ArrayList<>();

        int rank = (int)start;
        for(ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long id = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int totalTime = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            TeamRankingResponse.TimeRank timeRank = new TeamRankingResponse.TimeRank();

            timeRank.setRank(rank);
            timeRank.setTeamIcon(team.getRepIcon());
            timeRank.setTeamName(team.getName());
            timeRank.setTotalTime(totalTime);

            timeRanks.add(timeRank);
        }

        return timeRanks;
    }
}