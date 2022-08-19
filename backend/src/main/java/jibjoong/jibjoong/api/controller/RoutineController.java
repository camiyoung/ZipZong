package jibjoong.jibjoong.api.controller;

import jibjoong.jibjoong.api.dto.common.BasicResponse;
import jibjoong.jibjoong.api.dto.routine.RoutineRequest;
import jibjoong.jibjoong.api.dto.routine.RoutineResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jibjoong.jibjoong.api.service.RoutineService;

import java.util.List;

@RestController
@RequestMapping("/routine")
@RequiredArgsConstructor
public class RoutineController {
    private final RoutineService routineService;

    static final String SUCCESS = "success";

    //루틴 저장
    @PostMapping("/{teamId}")
    public ResponseEntity<BasicResponse<Long>> routineSave(@RequestBody RoutineRequest routineRequest, @PathVariable Long teamId) {
        Long id = routineService.createRoutine(teamId, routineRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, id), HttpStatus.CREATED);
    }

    //루틴 삭제
    @DeleteMapping("/remove/{routineId}")
    public ResponseEntity<BasicResponse<Long>> routineDelete(@PathVariable Long routineId) {
        Long teamId = routineService.deleteRoutine(routineId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, teamId), HttpStatus.OK);
    }

    //그룹별 루틴 조회
    @GetMapping("/{teamId}")
    public ResponseEntity<BasicResponse<List<RoutineResponse>>> routineLoad(@PathVariable Long teamId) {
        List<RoutineResponse> responses = routineService.searchRoutine(teamId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responses), HttpStatus.OK);
    }

    //루틴의 운동 리스트 조회
    @GetMapping("/detail/{routineId}")
    public ResponseEntity<BasicResponse<RoutineResponse>> routineDetailLoad(@PathVariable Long routineId) {
        RoutineResponse response = routineService.searchDetailRoutine(routineId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    //루틴 수정
    @PutMapping("/modify/{routineId}")
    public ResponseEntity<BasicResponse<Long>> routineModify(@RequestBody RoutineRequest routineRequest, @PathVariable Long routineId) {
        Long teamId = routineService.updateRoutine(routineId, routineRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, teamId), HttpStatus.CREATED);
    }

    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
