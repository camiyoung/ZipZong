package zipzong.zipzong.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zipzong.zipzong.dto.common.BasicResponse;
import zipzong.zipzong.dto.exercise.request.ExerciseResultRequest;
import zipzong.zipzong.dto.exercise.response.ExerciseResultResponse;
import zipzong.zipzong.service.ExerciseService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/exercise")
public class ExerciseController {

    ExerciseService exerciseService;

    static final String SUCCESS = "success";

    // 운동 결과 저장 및 반환
    @PostMapping("/result")
    public ResponseEntity<BasicResponse<ExerciseResultResponse>> exerciseResult(@RequestBody ExerciseResultRequest result) {
        Long teamId = result.getTeamId();
        List<ExerciseResultRequest.PersonalResult> personalResults = result.getPersonalResults();

        // 개인별 운동 기록 저장(exercise, exerciseDetail 테이블)
        exerciseService.saveMemberExerciseInfo(teamId, personalResults);

        // 개인별 누적 운동 기록 갱신(memberHistory, memberHistoryDetail 테이블)
        exerciseService.updateMemberExerciseHistory(personalResults);

        // 그룹별 누적 운동 기록 갱신(teamHistory, teamHistoryDetail 테이블)
        exerciseService.updateTeamExerciseHistory(teamId, personalResults);

        // 멤버 별 평균 달성률 계산(return)
        ExerciseResultResponse response = exerciseService.calculatePercentageAvg(personalResults);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    private BasicResponse<ExerciseResultResponse> makeBasicResponse(String message, ExerciseResultResponse data) {
        return BasicResponse
                .<ExerciseResultResponse>builder()
                .message(message)
                .data(data)
                .build();
    }
}
