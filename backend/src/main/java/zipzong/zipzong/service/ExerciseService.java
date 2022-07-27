package zipzong.zipzong.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zipzong.zipzong.domain.*;
import zipzong.zipzong.dto.exercise.request.ExerciseResultRequest;
import zipzong.zipzong.dto.exercise.response.ExerciseResultResponse;
import zipzong.zipzong.dto.exercise.response.ExerciseTeamHistoryResponse;
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
        int day = 0;

        if(month == 2) {
            if(year % 400 == 0) day = 29;
            else if(year % 100 == 0) day = 28;
            else if(year % 4 == 0) day = 29;
            else day = 28;
        } else if(month == 4 && month == 6 && month == 9 && month == 11) {
            day = 30;
        } else {
            day = 31;
        }

        ExerciseTeamHistoryResponse response = new ExerciseTeamHistoryResponse();


        return null;
    }
}
