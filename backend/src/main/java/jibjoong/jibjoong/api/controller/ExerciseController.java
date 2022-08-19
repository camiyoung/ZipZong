package jibjoong.jibjoong.api.controller;

import jibjoong.jibjoong.api.dto.common.BasicResponse;
import jibjoong.jibjoong.api.dto.exercise.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jibjoong.jibjoong.api.dto.exercise.request.ExerciseMemberHistoryRequest;
import jibjoong.jibjoong.api.dto.exercise.request.ExerciseResultRequest;
import jibjoong.jibjoong.api.dto.exercise.request.ExerciseTeamHistoryRequest;
import jibjoong.jibjoong.api.service.ExerciseService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/exercise")
public class ExerciseController {
    // @author 황승주

    final ExerciseService exerciseService;

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

        // 그룹별 실시간 뱃지 갱신
        exerciseService.teamBadgeUpdate(teamId);

        // 멤버 별 평균 달성률 계산(return)
        ExerciseResultResponse response = exerciseService.calculatePercentageAvg(personalResults);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.CREATED);
    }

    // 그룹 월별 운동기록 조회
    @GetMapping("/history/team")
    public ResponseEntity<BasicResponse<ExerciseTeamHistoryResponse>> exerciseTeamHistory(@ModelAttribute ExerciseTeamHistoryRequest request) {

        ExerciseTeamHistoryResponse response = exerciseService.teamHistoryByYearAndMonth(request.getTeamId(), request.getYear(), request.getMonth());

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    // 그룹 누적 운동기록 조회
    @GetMapping("/history/team/sum")
    public ResponseEntity<BasicResponse<ExerciseTeamTotalResponse>> exerciseTeamTotal(@RequestParam Long teamId) {
        ExerciseTeamTotalResponse response = exerciseService.totalTeamHistory(teamId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    // 회원 월별 운동기록 조회
    @GetMapping("/history/member")
    public ResponseEntity<BasicResponse<ExerciseMemberHistoryResponse>> exerciseMemberHistory(@ModelAttribute ExerciseMemberHistoryRequest request) {
        Long memberId = request.getMemberId();
        int year = request.getYear();
        int month = request.getMonth();

        ExerciseMemberHistoryResponse response = exerciseService.memberHistoryByYearAndMonth(memberId, year, month);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    // 회원 누적 운동기록 조회
    @GetMapping("/history/member/sum")
    public ResponseEntity<BasicResponse<ExerciseMemberTotalResponse>> exerciseMemberTotal(@RequestParam Long memberId) {
        ExerciseMemberTotalResponse response = exerciseService.totalMemberHistory(memberId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    // 그룹 내 오늘 운동한 그룹원 조회
    @GetMapping("/today/team")
    public ResponseEntity<BasicResponse<ExerciseTeamTodayResponse>> exerciseTeamToday(@RequestParam Long teamId) {
        ExerciseTeamTodayResponse response = exerciseService.exerciseMemberToday(teamId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}