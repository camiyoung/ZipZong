package zipzong.zipzong.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zipzong.zipzong.api.dto.common.BasicResponse;
import zipzong.zipzong.api.dto.routine.RoutineRequest;
import zipzong.zipzong.api.dto.routine.RoutineResponse;
import zipzong.zipzong.api.service.RoutineService;

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
        routineService.createRoutine(teamId, routineRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, teamId), HttpStatus.CREATED);
    }

    //루틴 삭제
    @DeleteMapping("/{routineId}")
    public ResponseEntity<BasicResponse<Long>> routineDelete(@PathVariable Long routineId) {
        routineService.deleteRoutine(routineId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, routineId), HttpStatus.OK);
    }

    //루틴 조회
    @GetMapping("/{teamId}")
    public ResponseEntity<BasicResponse<List<RoutineResponse>>> routineLoad(@PathVariable Long teamId) {
        List<RoutineResponse> responses = routineService.searchRoutine(teamId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responses), HttpStatus.OK);
    }

    //루틴 수정
    @PutMapping("/{routineId}")
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
