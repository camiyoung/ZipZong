package zipzong.zipzong.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zipzong.zipzong.dto.routine.RoutineRequest;
import zipzong.zipzong.dto.routine.RoutineResponse;
import zipzong.zipzong.service.RoutineService;

import java.util.List;

@RestController
@RequestMapping("/routine")
@RequiredArgsConstructor
public class RoutineController {
    private final RoutineService routineService;

    //루틴 저장
    @PostMapping("/{teamId}")
    public void routineSave(@RequestBody RoutineRequest routineRequest, @PathVariable Long teamId) {
        routineService.createRoutine(teamId, routineRequest);
    }

    //루틴 삭제
    @DeleteMapping("/{routineId}")
    public void routineDelete(@PathVariable Long routineId) {
        routineService.deleteRoutine(routineId);
    }

    //루틴 조회
    @GetMapping("/{teamId}")
    public ResponseEntity<List<RoutineResponse>> routineLoad(@PathVariable Long teamId) {
        return new ResponseEntity<List<RoutineResponse>>(routineService.searchRoutine(teamId), HttpStatus.OK);
    }

    @PutMapping("/{teamId}/{routineId}")
    public void routineModify(@RequestBody RoutineRequest routineRequest, @PathVariable Long teamId, @PathVariable Long routineId) {
        routineService.updateRoutine(teamId, routineId, routineRequest);
    }

}
