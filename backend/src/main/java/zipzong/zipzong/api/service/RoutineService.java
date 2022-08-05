package zipzong.zipzong.api.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import zipzong.zipzong.api.dto.routine.RoutineRequest;
import zipzong.zipzong.api.dto.routine.RoutineResponse;
import zipzong.zipzong.db.domain.Routine;
import zipzong.zipzong.db.domain.RoutineDetail;
import zipzong.zipzong.db.domain.Team;
import zipzong.zipzong.db.repository.memberteam.TeamRepository;
import zipzong.zipzong.db.repository.routine.RoutineDetailRepository;
import zipzong.zipzong.db.repository.routine.RoutineRepository;
import zipzong.zipzong.exception.CustomException;
import zipzong.zipzong.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static zipzong.zipzong.api.dto.routine.RoutineResponse.createRoutineResponse;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final RoutineDetailRepository routineDetailRepository;
    private final TeamRepository teamRepository;

    /*
    운동 루틴 등록
     */
    public Long createRoutine(Long teamId, RoutineRequest routineRequest) {
        Routine routine = Routine.createRoutine(routineRequest, getTeamInfo(teamId));
        Long routineId = routineRepository.save(routine).getId();
        for (int i = 0; i < routineRequest.getExercise().size(); i++) {
            RoutineDetail routineDetail = RoutineDetail.createRoutineDetail(getRoutine(routineId), i + 1, routineRequest.getExercise().get(i));
            routineDetailRepository.save(routineDetail);
        }
        return teamId;
    }

    /*
    운동 루틴 삭제
     */
    public Long deleteRoutine(Long routineId) {
        Long teamId = getRoutine(routineId).getTeam().getId();
        routineRepository.delete(getRoutine(routineId));
        return teamId;
    }

    /*
    그룹별 운동 루틴 조회
     */
    public List<RoutineResponse> searchRoutine(Long teamId) {
        List<RoutineResponse> routineList = new ArrayList<>();
        List<Routine> routines = routineRepository.findRoutineByTeam(getTeamInfo(teamId));
        for (Routine routine : routines) {
            List<RoutineResponse.RoutineExercise> exercises = new ArrayList<>();
            List<RoutineDetail> routineDetailList = routineDetailRepository.findRoutineDetailByRoutineId(routine.getId());
            for (RoutineDetail routineDetail : routineDetailList) {
                String name = routineDetail.getName();
                int count = routineDetail.getExerciseCount();
                exercises.add(new RoutineResponse.RoutineExercise(name, count));
            }
            routineList.add(createRoutineResponse(routine.getName(), routine.getId(), exercises, routine.getBreakTime(), routine.getTotalTime()));
        }
        return routineList;
    }

    /*
    루틴의 운동 목록 조회
     */
    public RoutineResponse searchDetailRoutine(Long routineId) {
        Routine routine = getRoutine(routineId);
        List<RoutineResponse.RoutineExercise> exercises = new ArrayList<>();
        List<RoutineDetail> routineDetailList = routineDetailRepository.findRoutineDetailByRoutineId(routine.getId());
        for (RoutineDetail routineDetail : routineDetailList) {
            String name = routineDetail.getName();
            int count = routineDetail.getExerciseCount();
            exercises.add(new RoutineResponse.RoutineExercise(name, count));
        }
        RoutineResponse response = createRoutineResponse(routine.getName(), routine.getId(), exercises, routine.getBreakTime(), routine.getTotalTime());
        return response;
    }

    /*
    운동 루틴 수정
     */
    public Long updateRoutine(Long routineId, RoutineRequest routineRequest) {
        Routine routine = Routine.updateRoutine(routineRequest, routineId, getRoutine(routineId).getTeam());
        routineRepository.save(routine);
        List<RoutineDetail> routineDetailList = routineDetailRepository.findRoutineDetailByRoutineId(routineId);
        for (RoutineDetail routineDetail : routineDetailList) {
            routineDetailRepository.delete(routineDetail);
        }
        for (int i = 0; i < routineRequest.getExercise().size(); i++) {
            RoutineDetail routineDetail = RoutineDetail.createRoutineDetail(getRoutine(routineId), i + 1, routineRequest.getExercise().get(i));
            routineDetailRepository.save(routineDetail);
        }
        return getRoutine(routineId).getTeam().getId();
    }

    private Team getTeamInfo(Long teamId) {
        return teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR));
    }

    private Routine getRoutine(Long routineId) {
        return routineRepository.findById(routineId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROUTINE_NOT_FOUND));
    }


}
