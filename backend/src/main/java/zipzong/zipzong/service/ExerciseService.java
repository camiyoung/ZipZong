package zipzong.zipzong.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zipzong.zipzong.domain.*;
import zipzong.zipzong.dto.exercise.request.ExerciseResultRequest;
import zipzong.zipzong.dto.exercise.response.ExerciseMemberHistoryResponse;
import zipzong.zipzong.dto.exercise.response.ExerciseResultResponse;
import zipzong.zipzong.dto.exercise.response.ExerciseTeamHistoryResponse;
import zipzong.zipzong.dto.exercise.response.ExerciseTeamTotalResponse;
import zipzong.zipzong.repository.*;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    MemberRepository memberRepository;
    TeamRepository teamRepository;
    RegistrationRepository registrationRepository;
    ExerciseRepository exerciseRepository;
    ExerciseDetailRepository exerciseDetailRepository;

    TeamHistory
    TeamHistoryDetailRepository teamHistoryDetailRepository;
    MemberHistoryDetailRepository memberHistoryDetailRepository;

    public void saveMemberExerciseInfo(Long teamId, List<ExerciseResultRequest.PersonalResult> personalResults) {

        for(ExerciseResultRequest.PersonalResult personalResult : personalResults) {
            Long memberId = personalResult.getMemberId();
            Registration registration = registrationRepository.findByMemberIdAndTeamId(memberId, teamId).orElseThrow();
            LocalDate today = LocalDate.now();

            if(exerciseRepository.findByRegistrationIdAndExerciseDate(registration.getId(), today).isEmpty()) {
                Exercise first = Exercise.builder()
                        .registration(registration)
                        .exerciseDate(today)
                        .exerciseTime(0)
                        .build();
                exerciseRepository.save(first);
            }

            Exercise exercise = exerciseRepository.findByRegistrationIdAndExerciseDate(registration.getId(), today).orElseThrow();
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
            Member member = memberRepository.findById(personalResult.getMemberId()).orElseThrow();

            if(member.getMemberHistory() == null) {
                MemberHistory memberHistory = MemberHistory.builder()
                        .maximumStrick(0)
                        .currentStrick(0)
                        .build();
                member.setMemberHistory(memberHistory);
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
        Team team = teamRepository.findById(teamId).orElseThrow();

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

            Member member = memberRepository.findById(personalResult.getMemberId()).orElseThrow();
            String nickname = member.getNickname();
            List<ExerciseResultRequest.PersonalResultDetail> personalResultDetails = personalResult.getPersonalResultDetails();

            int exerciseNum = personalResultDetails.size();
            double personalAvg = 0;

            for (ExerciseResultRequest.PersonalResultDetail personalResultDetail : personalResultDetails) {
                double performNum = personalResultDetail.getPerformNum();
                double targetNum = personalResultDetail.getTargetNum();

                personalAvg += (performNum / targetNum) * 100;
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

        for(int d = 1; d <= dayOfMonth; d++) {
            List<ExerciseTeamHistoryResponse.Perform> performs = map.getOrDefault(d, new ArrayList<>());
            if(performs.size() == 0) continue;
            ExerciseTeamHistoryResponse.DailyHistory dailyHistory = new ExerciseTeamHistoryResponse.DailyHistory();
            dailyHistory.setDay(d);
            dailyHistory.setTotalTime(performs.size());

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

                dailyHistory.getPerforms().add(ExerciseTeamHistoryResponse.Perform.builder()
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

        for(int d = 1; d <= dayOfMonth; d++) {
            List<ExerciseMemberHistoryResponse.Perform> performs = map.getOrDefault(d, new ArrayList<>());
            if(performs.size() == 0) continue;
            ExerciseMemberHistoryResponse.DailyHistory dailyHistory = new ExerciseMemberHistoryResponse.DailyHistory();
            dailyHistory.setDay(d);
            dailyHistory.setTotalTime(performs.size());

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

        teamhi

        return response;
    }
}
