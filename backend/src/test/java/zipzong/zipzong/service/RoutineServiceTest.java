package zipzong.zipzong.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import zipzong.zipzong.api.dto.routine.RoutineRequest;
import zipzong.zipzong.api.dto.routine.RoutineResponse;
import zipzong.zipzong.api.service.RoutineService;
import zipzong.zipzong.db.domain.Routine;
import zipzong.zipzong.db.domain.Team;
import zipzong.zipzong.db.repository.memberteam.RegistrationRepository;
import zipzong.zipzong.db.repository.memberteam.TeamRepository;
import zipzong.zipzong.db.repository.routine.RoutineDetailRepository;
import zipzong.zipzong.db.repository.routine.RoutineRepository;

import java.util.ArrayList;
import java.util.List;

@DataJpaTest
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
public class RoutineServiceTest {

    @Autowired
    RoutineRepository routineRepository;

    @Autowired
    RoutineDetailRepository routineDetailRepository;

    @Autowired
    RegistrationRepository registrationRepository;

    @Autowired
    TeamRepository teamRepository;

    RoutineService routineService;

    long teamId;

    @BeforeEach
    void init() {
        Team team = Team.builder()
                .id(10L)
                .name("test team")
                .inviteLink("inviteLink")
                .shieldCount(0)
                .repIcon("repIcon")
                .build();
        teamId = teamRepository.save(team).getId();
        routineService = new RoutineService(routineRepository, routineDetailRepository, teamRepository);

    }

    @Order(1)
    @Test
    void createRoutine() {
        //given
        List<RoutineRequest.RoutineExercise> exercises = new ArrayList<>();
        exercises.add(new RoutineRequest.RoutineExercise("PUSHUP", 24));
        exercises.add(new RoutineRequest.RoutineExercise("BURPEE", 5));
        RoutineRequest routineRequest = RoutineRequest.builder()
                .routineName("routine1")
                .exercise(exercises)
                .breakTime(60)
                .totalTime(180)
                .build();

        //when
        routineService.createRoutine(teamId, routineRequest);

        //then
        Routine routine = routineRepository.findById(1L).orElseThrow();
        Assertions.assertEquals(routine.getName(), "routine1");

    }

    @Order(2)
    @Test
    void searchRoutine() {
        //given
        List<RoutineRequest.RoutineExercise> exercises = new ArrayList<>();
        exercises.add(new RoutineRequest.RoutineExercise("PUSHUP", 24));
        exercises.add(new RoutineRequest.RoutineExercise("BURPEE", 5));
        RoutineRequest routineRequest = RoutineRequest.builder()
                .routineName("routine1")
                .exercise(exercises)
                .breakTime(60)
                .totalTime(180)
                .build();
        routineService.createRoutine(teamId, routineRequest);
        //when
        List<RoutineResponse> routines = routineService.searchRoutine(teamId);

        //then
        Assertions.assertEquals(routines.get(0).getRoutineName(), "routine1");
    }

    @Order(3)
    @Test
    void updateRoutine() {
        //given
        List<RoutineRequest.RoutineExercise> exercises = new ArrayList<>();
        exercises.add(new RoutineRequest.RoutineExercise("PUSHUP", 24));
        exercises.add(new RoutineRequest.RoutineExercise("BURPEE", 5));
        RoutineRequest routineRequest = RoutineRequest.builder()
                .routineName("routine1")
                .exercise(exercises)
                .breakTime(60)
                .totalTime(180)
                .build();
        routineService.createRoutine(teamId, routineRequest);
        //when
        List<RoutineRequest.RoutineExercise> updateExercises = new ArrayList<>();
        updateExercises.add(new RoutineRequest.RoutineExercise("PUSHUP", 2));
        updateExercises.add(new RoutineRequest.RoutineExercise("BURPEE", 50));
        RoutineRequest updateRoutineRequest = RoutineRequest.builder()
                .routineName("updateRoutine")
                .exercise(updateExercises)
                .breakTime(60)
                .totalTime(180)
                .build();
        routineService.updateRoutine(3L, updateRoutineRequest);

        //then
        Routine routine = routineRepository.findById(3L).orElseThrow();
        Assertions.assertEquals(routine.getName(), "updateRoutine");

    }

}
