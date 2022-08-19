package jibjoong.jibjoong.api.service;

import jibjoong.jibjoong.api.dto.exercise.request.ExerciseResultRequest;
import jibjoong.jibjoong.api.dto.exercise.response.*;
import jibjoong.jibjoong.db.domain.*;
import jibjoong.jibjoong.db.repository.exercise.ExerciseDetailRepository;
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
import jibjoong.jibjoong.enums.CheckExist;
import jibjoong.jibjoong.exception.CustomException;
import jibjoong.jibjoong.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ExerciseService {
    // @author 황승주
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final RegistrationRepository registrationRepository;
    private final ExerciseRepository exerciseRepository;
    private final ExerciseDetailRepository exerciseDetailRepository;
    private final TeamHistoryRepository teamHistoryRepository;
    private final TeamHistoryDetailRepository teamHistoryDetailRepository;
    private final TeamCalendarRepository teamCalendarRepository;
    private final TeamIconRepository teamIconRepository;
    private final MemberHistoryRepository memberHistoryRepository;
    private final MemberHistoryDetailRepository memberHistoryDetailRepository;
    private final MemberCalendarRepository memberCalendarRepository;

    public void saveMemberExerciseInfo(Long teamId, List<ExerciseResultRequest.PersonalResult> personalResults) {

        for(ExerciseResultRequest.PersonalResult personalResult : personalResults) {
            Long memberId = personalResult.getMemberId();
            Registration registration = registrationRepository.findMemberIdAndTeamIdNoResigned(memberId, teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            LocalDate today = LocalDate.now();

            if(exerciseRepository.findByRegistrationIdAndExerciseDate(registration.getId(), today).isEmpty()) {
                Exercise first = Exercise.builder()
                        .registration(registration)
                        .exerciseDate(today)
                        .exerciseTime(0)
                        .build();
                exerciseRepository.save(first);
            }

            Exercise exercise = exerciseRepository.findByRegistrationIdAndExerciseDate(registration.getId(), today).orElseThrow(
                    () -> new CustomException(CustomExceptionList.EXERCISE_RECORD_NOT_EXIST)
            );
            int totalTime = 0;

            List<ExerciseResultRequest.PersonalResultDetail> personalResultDetails = personalResult.getPersonalResultDetails();
            for(ExerciseResultRequest.PersonalResultDetail personalResultDetail : personalResultDetails) {
                ++totalTime;
                ExerciseDetail exerciseDetail = ExerciseDetail.builder()
                        .exercise(exercise)
                        .exerciseName(personalResultDetail.getExerciseName())
                        .exerciseNum(personalResultDetail.getPerformNum())
                        .build();
                exerciseDetailRepository.save(exerciseDetail);
            }
            int prevTime = exercise.getExerciseTime();
            exercise.setExerciseTime(prevTime + totalTime);
        }
    }

    public void updateMemberExerciseHistory(List<ExerciseResultRequest.PersonalResult> personalResults) {

        for (ExerciseResultRequest.PersonalResult personalResult : personalResults) {
            Member member = memberRepository.findById(personalResult.getMemberId()).orElseThrow(
                    () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
            );

            if(member.getMemberHistory() == null) {
                MemberHistory memberHistory = MemberHistory.builder()
                        .maximumStrick(0)
                        .currentStrick(0)
                        .build();
                member.setMemberHistory(memberHistory);
            }

            // 오늘 개인 첫 운동이라면 스탬프 찍기 + 현재 스트릭 및 최대 스트릭 갱신
            if(memberCalendarRepository.findByMemberIdAndCheckDate(member.getId(), LocalDate.now()).isEmpty()) {
                MemberCalendar memberCalendar = MemberCalendar
                        .builder()
                        .member(member)
                        .checkDate(LocalDate.now())
                        .build();
                memberCalendarRepository.save(memberCalendar);

                MemberHistory memberHistory = memberHistoryRepository.findByMemberId(member.getId()).orElseThrow(
                        () -> new CustomException(CustomExceptionList.MEMBER_HISTORY_NOT_FOUND)
                );

                memberHistory.setCurrentStrick(memberHistory.getCurrentStrick() + 1);
                if(memberHistory.getMaximumStrick() < memberHistory.getCurrentStrick()) {
                    memberHistory.setMaximumStrick(memberHistory.getCurrentStrick());
                }
            }

            MemberHistory memberHistory = member.getMemberHistory();

            Map<String, int[]> records = new HashMap<>();

            List<ExerciseResultRequest.PersonalResultDetail> personalResultDetails = personalResult.getPersonalResultDetails();

            for (ExerciseResultRequest.PersonalResultDetail personalResultDetail : personalResultDetails) {
                String exerciseName = personalResultDetail.getExerciseName();
                int performNum = personalResultDetail.getPerformNum();
                int[] record = records.getOrDefault(exerciseName, new int[]{0, 0});
                record[0] += performNum;
                ++record[1];
                records.put(exerciseName, record);
            }

            for (Map.Entry<String, int[]> record : records.entrySet()) {
                MemberHistoryDetail memberHistoryDetail = MemberHistoryDetail.builder()
                        .memberHistory(memberHistory)
                        .exerciseName(record.getKey())
                        .exerciseNum(record.getValue()[0])
                        .exerciseTime(record.getValue()[1])
                        .build();

                memberHistoryDetailRepository.save(memberHistoryDetail);
            }
        }
    }

    public void updateTeamExerciseHistory(Long teamId, List<ExerciseResultRequest.PersonalResult> personalResults) {
        Team team = teamRepository.findById(teamId).orElseThrow(
                () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
        );

        if(team.getTeamHistory() == null) {
            TeamHistory teamHistory = TeamHistory.builder()
                    .maximumStrick(0)
                    .currentStrick(0)
                    .build();
            team.setTeamHistory(teamHistory);
        }

        TeamHistory teamHistory = team.getTeamHistory();

        Map<String, int[]> records = new HashMap<>();

        for (ExerciseResultRequest.PersonalResult personalResult : personalResults) {
            List<ExerciseResultRequest.PersonalResultDetail> personalResultDetails = personalResult.getPersonalResultDetails();
            for (ExerciseResultRequest.PersonalResultDetail personalResultDetail : personalResultDetails) {
                String exerciseName = personalResultDetail.getExerciseName();
                int performNum = personalResultDetail.getPerformNum();
                int[] record = records.getOrDefault(exerciseName, new int[]{0, 0});
                record[0] += performNum;
                ++record[1];
                records.put(exerciseName, record);
            }
        }

        for (Map.Entry<String, int[]> record : records.entrySet()) {
            TeamHistoryDetail teamHistoryDetail = TeamHistoryDetail.builder()
                    .teamHistory(teamHistory)
                    .exerciseName(record.getKey())
                    .exerciseNum(record.getValue()[0])
                    .exerciseTime(record.getValue()[1])
                    .build();

            teamHistoryDetailRepository.save(teamHistoryDetail);
        }
    }

    public ExerciseResultResponse calculatePercentageAvg
            (List<ExerciseResultRequest.PersonalResult> personalResults) {
        ExerciseResultResponse exerciseResultResponse = new ExerciseResultResponse();
        List<ExerciseResultResponse.PersonalPercentage> personalPercentages = new ArrayList<>();

        int personNum = personalResults.size();
        double totalAvg = 0;

        for (ExerciseResultRequest.PersonalResult personalResult : personalResults) {
            ExerciseResultResponse.PersonalPercentage personalPercentage = new ExerciseResultResponse.PersonalPercentage();

            Member member = memberRepository.findById(personalResult.getMemberId()).orElseThrow(
                    () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
            );
            String nickname = member.getNickname();
            List<ExerciseResultRequest.PersonalResultDetail> personalResultDetails = personalResult.getPersonalResultDetails();

            int exerciseNum = personalResultDetails.size();
            double personalAvg = 0;

            for (ExerciseResultRequest.PersonalResultDetail personalResultDetail : personalResultDetails) {
                double performNum = personalResultDetail.getPerformNum();
                double targetNum = personalResultDetail.getTargetNum();

                double calculatedAvg = (performNum / targetNum) * 100;

                if(calculatedAvg > 100) calculatedAvg = 100;

                personalAvg += calculatedAvg;
            }
            personalAvg /= exerciseNum;

            personalPercentage.setNickname(nickname);
            personalPercentage.setPercentage((int) personalAvg);
            totalAvg += personalAvg;

            personalPercentages.add(personalPercentage);
        }
        totalAvg /= personNum;

        exerciseResultResponse.setPersonalPercentages(personalPercentages);
        exerciseResultResponse.setAvgPercentage((int) totalAvg);

        return exerciseResultResponse;
    }

    public ExerciseTeamHistoryResponse teamHistoryByYearAndMonth(Long teamId, int year, int month) {
        int dayOfMonth = 0;

        if(month == 2) {
            if(year % 400 == 0) dayOfMonth = 29;
            else if(year % 100 == 0) dayOfMonth = 28;
            else if(year % 4 == 0) dayOfMonth = 29;
            else dayOfMonth = 28;
        } else if(month == 4 || month == 6 || month == 9 || month == 11) {
            dayOfMonth = 30;
        } else {
            dayOfMonth = 31;
        }

        List<ExerciseDetail> exerciseDetails = exerciseDetailRepository.getTeamMonthlyHistory(teamId, year, month);
        ExerciseTeamHistoryResponse response = new ExerciseTeamHistoryResponse();

        List<ExerciseTeamHistoryResponse.DailyHistory> dailyHistories = new ArrayList<>();
        Map<Integer, List<ExerciseTeamHistoryResponse.Perform>> map = new TreeMap<>();

        for(ExerciseDetail exerciseDetail : exerciseDetails) {
            int day = exerciseDetail.getExercise().getExerciseDate().getDayOfMonth();
            ExerciseTeamHistoryResponse.Perform perform = ExerciseTeamHistoryResponse.Perform.builder()
                    .performName(exerciseDetail.getExerciseName())
                    .performNum(exerciseDetail.getExerciseNum())
                    .performTime(1)
                    .build();
            List<ExerciseTeamHistoryResponse.Perform> performs = map.getOrDefault(day, new ArrayList<ExerciseTeamHistoryResponse.Perform>());
            performs.add(perform);
            map.put(day, performs);
        }

        List<TeamCalendar> teamCalendars = teamCalendarRepository.isMonthExercised(teamId, year, month);

        for(int d = 1; d <= dayOfMonth; d++) {
            List<ExerciseTeamHistoryResponse.Perform> performs = map.getOrDefault(d, new ArrayList<>());
            ExerciseTeamHistoryResponse.DailyHistory dailyHistory = new ExerciseTeamHistoryResponse.DailyHistory();
            dailyHistory.setDay(d);
            dailyHistory.setTotalTime(performs.size());
            dailyHistory.setPerforms(new ArrayList<>());
            dailyHistory.setState("FAIL");

            for(TeamCalendar teamCalendar : teamCalendars) {
                if(teamCalendar.getCheckDate().getDayOfMonth() == d) {
                    if(teamCalendar.getState().equals("SHIELD")) {
                        dailyHistory.setState("SHIELD");
                        break;
                    } else {
                        dailyHistory.setState("SUCCESS");
                        break;
                    }
                }
            }

            Map<String, int[]> performInfo = new TreeMap<>();
            for(ExerciseTeamHistoryResponse.Perform perform : performs) {
                String performName = perform.getPerformName();
                int[] performData = new int[2];
                performData[0] = perform.getPerformNum();
                performData[1] = perform.getPerformTime();

                int[] totalData = performInfo.getOrDefault(performName, new int[2]);
                totalData[0] += performData[0];
                totalData[1] += performData[1];

                performInfo.put(performName, totalData);
            }

            for(Map.Entry<String, int[]> entry : performInfo.entrySet()) {
                String performName = entry.getKey();
                int performNum = entry.getValue()[0];
                int performTime = entry.getValue()[1];

                dailyHistory.getPerforms().add(ExerciseTeamHistoryResponse.Perform
                                .builder()
                                .performName(performName)
                                .performNum(performNum)
                                .performTime(performTime)
                                .build());
            }
            dailyHistories.add(dailyHistory);
        }
        response.setDailyHistories(dailyHistories);
        return response;
    }

    public ExerciseMemberHistoryResponse memberHistoryByYearAndMonth(Long memberId, int year, int month) {
        int dayOfMonth = 0;

        if(month == 2) {
            if(year % 400 == 0) dayOfMonth = 29;
            else if(year % 100 == 0) dayOfMonth = 28;
            else if(year % 4 == 0) dayOfMonth = 29;
            else dayOfMonth = 28;
        } else if(month == 4 || month == 6 || month == 9 || month == 11) {
            dayOfMonth = 30;
        } else {
            dayOfMonth = 31;
        }

        List<ExerciseDetail> exerciseDetails = exerciseDetailRepository.getMemberMonthlyHistory(memberId, year, month);
        ExerciseMemberHistoryResponse response = new ExerciseMemberHistoryResponse();

        List<ExerciseMemberHistoryResponse.DailyHistory> dailyHistories = new ArrayList<>();
        Map<Integer, List<ExerciseMemberHistoryResponse.Perform>> map = new TreeMap<>();

        for(ExerciseDetail exerciseDetail : exerciseDetails) {
            int day = exerciseDetail.getExercise().getExerciseDate().getDayOfMonth();
            ExerciseMemberHistoryResponse.Perform perform = ExerciseMemberHistoryResponse.Perform.builder()
                    .performName(exerciseDetail.getExerciseName())
                    .performNum(exerciseDetail.getExerciseNum())
                    .performTime(1)
                    .build();
            List<ExerciseMemberHistoryResponse.Perform> performs = map.getOrDefault(day, new ArrayList<ExerciseMemberHistoryResponse.Perform>());
            performs.add(perform);
            map.put(day, performs);
        }

        List<MemberCalendar> memberCalendars = memberCalendarRepository.isMonthExercised(memberId, year, month);

        for(int d = 1; d <= dayOfMonth; d++) {
            List<ExerciseMemberHistoryResponse.Perform> performs = map.getOrDefault(d, new ArrayList<>());
            ExerciseMemberHistoryResponse.DailyHistory dailyHistory = new ExerciseMemberHistoryResponse.DailyHistory();
            dailyHistory.setDay(d);
            dailyHistory.setTotalTime(performs.size());
            dailyHistory.setPerforms(new ArrayList<>());
            dailyHistory.setState("FAIL");

            for(MemberCalendar memberCalendar : memberCalendars) {
                if(memberCalendar.getCheckDate().getDayOfMonth() == d) {
                    dailyHistory.setState("SUCCESS");
                }
            }

            Map<String, int[]> performInfo = new TreeMap<>();
            for(ExerciseMemberHistoryResponse.Perform perform : performs) {
                String performName = perform.getPerformName();
                int[] performData = new int[2];
                performData[0] = perform.getPerformNum();
                performData[1] = perform.getPerformTime();

                int[] totalData = performInfo.getOrDefault(performName, new int[2]);
                totalData[0] += performData[0];
                totalData[1] += performData[1];

                performInfo.put(performName, totalData);
            }

            for(Map.Entry<String, int[]> entry : performInfo.entrySet()) {
                String performName = entry.getKey();
                int performNum = entry.getValue()[0];
                int performTime = entry.getValue()[1];

                dailyHistory.getPerforms().add(ExerciseMemberHistoryResponse.Perform.builder()
                        .performName(performName)
                        .performNum(performNum)
                        .performTime(performTime)
                        .build());
            }
            dailyHistories.add(dailyHistory);
        }
        response.setDailyHistories(dailyHistories);
        return response;
    }

    public ExerciseTeamTotalResponse totalTeamHistory(Long teamId) {
        ExerciseTeamTotalResponse response = new ExerciseTeamTotalResponse();

        TeamHistory teamHistory = teamHistoryRepository.findByTeamId(teamId).orElse(
                TeamHistory.builder()
                        .maximumStrick(0)
                        .currentStrick(0)
                        .build()
        );

        response.setCurrentStrick(teamHistory.getCurrentStrick());

        List<ExerciseTeamTotalResponse.PerformTeamTotal> performTeamTotals = new ArrayList<>();

        List<TeamHistoryDetail> teamHistoryDetails = teamHistoryDetailRepository.findByTeamHistoryId(teamHistory.getId());
        Map<String, Integer> exercises = new TreeMap<>();

        for(TeamHistoryDetail teamHistoryDetail : teamHistoryDetails) {
            String exerciseName = teamHistoryDetail.getExerciseName();
            int exerciseNum = teamHistoryDetail.getExerciseNum();

            exerciseNum += exercises.getOrDefault(exerciseName, 0);

            exercises.put(exerciseName, exerciseNum);
        }

        for(Map.Entry<String, Integer> entry : exercises.entrySet()) {
            ExerciseTeamTotalResponse.PerformTeamTotal performTeamTotal = new ExerciseTeamTotalResponse.PerformTeamTotal();
            performTeamTotal.setPerformName(entry.getKey());
            performTeamTotal.setPerformTotal(entry.getValue());

            performTeamTotals.add(performTeamTotal);
        }

        response.setPerformTeamTotals(performTeamTotals);

        return response;
    }

    public ExerciseMemberTotalResponse totalMemberHistory(Long memberId) {
        ExerciseMemberTotalResponse response = new ExerciseMemberTotalResponse();
        int totalTime = 0;

        MemberHistory memberHistory = memberHistoryRepository.findByMemberId(memberId).orElse(
                MemberHistory.builder()
                        .maximumStrick(0)
                        .currentStrick(0)
                        .build()
        );

        response.setCurrentStrick(memberHistory.getCurrentStrick());

        List<ExerciseMemberTotalResponse.PerformMemberTotal> performMemberTotals = new ArrayList<>();

        List<MemberHistoryDetail> memberHistoryDetails = memberHistoryDetailRepository.findByMemberHistoryId(memberHistory.getId());

        Map<String, Integer> exercises = new HashMap<>();

        for(MemberHistoryDetail memberHistoryDetail : memberHistoryDetails) {
            String exerciseName = memberHistoryDetail.getExerciseName();
            int exerciseNum = memberHistoryDetail.getExerciseNum();
            ++totalTime;

            exerciseNum += exercises.getOrDefault(exerciseName, 0);

            exercises.put(exerciseName, exerciseNum);
        }

        for(Map.Entry<String, Integer> entry : exercises.entrySet()) {
            ExerciseMemberTotalResponse.PerformMemberTotal performMemberTotal = new ExerciseMemberTotalResponse.PerformMemberTotal();
            performMemberTotal.setPerformName(entry.getKey());
            performMemberTotal.setPerformTotal(entry.getValue());

            performMemberTotals.add(performMemberTotal);
        }

        response.setPerformMemberTotals(performMemberTotals);
        response.setTotalTime(totalTime);

        return response;
    }

    public ExerciseTeamTodayResponse exerciseMemberToday(Long teamId) {
        ExerciseTeamTodayResponse exerciseTeamTodayResponse = new ExerciseTeamTodayResponse();

        List<ExerciseTeamTodayResponse.NiceMember> niceMembers = new ArrayList<>();

        List<Registration> registrations = registrationRepository.findAllByTeamId(teamId);
        System.out.println(registrations);
        for(Registration registration : registrations) {
            if(registration.getIsResign() == CheckExist.Y) continue;
            if(exerciseRepository.findByRegistrationIdAndExerciseDate(registration.getId(), LocalDate.now()).isEmpty())
                continue;
            ExerciseTeamTodayResponse.NiceMember niceMember = new ExerciseTeamTodayResponse.NiceMember();
            niceMember.setMemberId(registration.getMember().getId());
            niceMember.setNickName(registration.getMember().getNickname());

            niceMembers.add(niceMember);
        }

        exerciseTeamTodayResponse.setNiceMembers(niceMembers);

        return exerciseTeamTodayResponse;
    }

    public void teamBadgeUpdate(Long teamId) {
        List<TeamHistoryDetail> teamHistoryDetails = teamHistoryDetailRepository.teamAllTime(teamId);

        int totalTime = 0;

        for(TeamHistoryDetail teamHistoryDetail : teamHistoryDetails) {
            totalTime += teamHistoryDetail.getExerciseTime();
        }

        if(totalTime >= 60 * 10000 && teamIconRepository.findByTeamIdAndIconName(teamId, "groupMaxExerciseTime10000").isEmpty()) {
            TeamIcon teamIcon = TeamIcon.builder()
                    .team(teamRepository.findById(teamId).orElseThrow(
                            () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)))
                    .iconName("groupMaxExerciseTime10000")
                    .build();
        }
        else if(totalTime >= 60 * 1000 && teamIconRepository.findByTeamIdAndIconName(teamId, "groupMaxExerciseTime1000").isEmpty()) {
            TeamIcon teamIcon = TeamIcon.builder()
                    .team(teamRepository.findById(teamId).orElseThrow(
                            () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)))
                    .iconName("groupMaxExerciseTime1000")
                    .build();
        }
        else if(totalTime >= 60 * 100 && teamIconRepository.findByTeamIdAndIconName(teamId, "groupMaxExerciseTime100").isEmpty()) {
            TeamIcon teamIcon = TeamIcon.builder()
                    .team(teamRepository.findById(teamId).orElseThrow(
                            () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)))
                    .iconName("groupMaxExerciseTime100")
                    .build();
        }
        else if(totalTime >= 60 * 10 && teamIconRepository.findByTeamIdAndIconName(teamId, "groupMaxExerciseTime10").isEmpty()) {
            TeamIcon teamIcon = TeamIcon.builder()
                    .team(teamRepository.findById(teamId).orElseThrow(
                            () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)))
                    .iconName("groupMaxExerciseTime10")
                    .build();
        }
    }
}