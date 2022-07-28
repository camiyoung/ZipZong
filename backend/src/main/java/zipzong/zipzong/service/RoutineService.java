package zipzong.zipzong.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import zipzong.zipzong.domain.Routine;
import zipzong.zipzong.domain.RoutineDetail;
import zipzong.zipzong.domain.Team;
import zipzong.zipzong.dto.routine.RoutineRequest;
import zipzong.zipzong.dto.routine.RoutineResponse;
import zipzong.zipzong.repository.RoutineDetailRepository;
import zipzong.zipzong.repository.RoutineRepository;
import zipzong.zipzong.repository.TeamRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static zipzong.zipzong.dto.routine.RoutineResponse.createRoutineResponse;

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
    public void createRoutine(Long teamId, RoutineRequest routineRequest) {
        Routine routine = Routine.createRoutine(routineRequest, getTeamInfo(teamId));
        Long routineId = routineRepository.save(routine).getId();
        for (int i = 0; i < routineRequest.getExercise().size(); i++) {
            RoutineDetail routineDetail = RoutineDetail.createRoutineDetail(getRoutine(routineId), i + 1, routineRequest.getExercise().get(i));
            routineDetailRepository.save(routineDetail);
        }
    }

    /*
    운동 루틴 삭제
     */
    public void deleteRoutine(Long routineId) {
        routineRepository.delete(getRoutine(routineId));
    }

    /*
    운동 루틴 조회
     */
    public List<RoutineResponse> searchRoutine(Long teamId) {
        List<RoutineResponse> routineList = new ArrayList<>();
        List<Routine> routines = routineRepository.findRoutineByTeam(getTeamInfo(teamId));
        for (int i = 0; i < routines.size(); i++) {
            Routine routine = routines.get(i);
            List<RoutineResponse.RoutineExercise> exercises = new ArrayList<>();
            List<RoutineDetail> routineDetailList = routineDetailRepository.findRoutineDetailByRoutineId(routine.getId());
            for (int j = 0; j < routineDetailList.size(); j++) {
                String name = routineDetailList.get(j).getName();
                int count = routineDetailList.get(j).getExerciseCount();
                exercises.add(new RoutineResponse.RoutineExercise(name, count));
            }
            routineList.add(createRoutineResponse(routine.getName(), routine.getId(), exercises, routine.getBreakTime(), routine.getTotalTime()));
        }
        return routineList;


    }

    /*
    운동 루틴 수정
     */
    public void updateRoutine(Long teamId, Long routineId, RoutineRequest routineRequest) {
        Routine routine = Routine.updateRoutine(routineRequest, routineId, getTeamInfo(teamId));
        routineRepository.save(routine);
        List<RoutineDetail> routineDetailList = routineDetailRepository.findRoutineDetailByRoutineId(routineId);
        for (int i = 0; i < routineDetailList.size(); i++) {
            routineDetailRepository.delete(routineDetailList.get(i));
        }
        for (int i = 0; i < routineRequest.getExercise().size(); i++) {
            RoutineDetail routineDetail = RoutineDetail.createRoutineDetail(getRoutine(routineId), i + 1, routineRequest.getExercise().get(i));
            routineDetailRepository.save(routineDetail);
        }
    }

    private Team getTeamInfo(Long teamId) {
        return teamRepository.findById(teamId)
                .orElseThrow(() -> new NoSuchElementException("Team Not Found"));
    }

    private Routine getRoutine(Long routineId) {
        return routineRepository.findById(routineId)
                .orElseThrow(() -> new NoSuchElementException("Routine Not Found"));
    }


}
