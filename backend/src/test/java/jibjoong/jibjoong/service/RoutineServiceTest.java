//package jibjoong.jibjoong.service;
//
//import jibjoong.jibjoong.api.dto.routine.RoutineRequest;
//import jibjoong.jibjoong.api.dto.routine.RoutineResponse;
//import jibjoong.jibjoong.api.service.RoutineService;
//import org.junit.jupiter.api.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import jibjoong.jibjoong.db.domain.Routine;
//import jibjoong.jibjoong.db.domain.Team;
//import jibjoong.jibjoong.db.repository.memberteam.RegistrationRepository;
//import jibjoong.jibjoong.db.repository.memberteam.TeamRepository;
//import jibjoong.jibjoong.db.repository.routine.RoutineDetailRepository;
//import jibjoong.jibjoong.db.repository.routine.RoutineRepository;
//import jibjoong.jibjoong.exception.CustomException;
//import jibjoong.jibjoong.exception.CustomExceptionList;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@DataJpaTest
//@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
//public class RoutineServiceTest {
//
//    @Autowired
//    RoutineRepository routineRepository;
//
//    @Autowired
//    RoutineDetailRepository routineDetailRepository;
//
//    @Autowired
//    RegistrationRepository registrationRepository;
//
//    @Autowired
//    TeamRepository teamRepository;
//
//    RoutineService routineService;
//
//    long teamId;
//
//    @BeforeEach
//    void init() {
//        Team team = Team.builder()
//                .id(10L)
//                .name("test team")
//                .inviteLink("inviteLink")
//                .shieldCount(0)
//                .repIcon("repIcon")
//                .build();
//        teamId = teamRepository.save(team).getId();
//        routineService = new RoutineService(routineRepository, routineDetailRepository, teamRepository);
//
//    }
//
//    @Test
//    @DisplayName("루틴 생성")
//    void createRoutine() {
//        //given
//        List<RoutineRequest.RoutineExercise> exercises = new ArrayList<>();
//        exercises.add(new RoutineRequest.RoutineExercise("PUSHUP", 24));
//        exercises.add(new RoutineRequest.RoutineExercise("BURPEE", 5));
//        RoutineRequest routineRequest = RoutineRequest.builder()
//                .routineName("routine1")
//                .exercise(exercises)
//                .breakTime(60)
//                .totalTime(180)
//                .build();
//
//        //when
//        routineService.createRoutine(teamId, routineRequest);
//
//        //then
//        List<Routine> routine = routineRepository.findRoutineByTeam(getTeamInfo(teamId));
//        Assertions.assertEquals(routine.get(0).getName(), "routine1");
//
//    }
//
//    @Test
//    @DisplayName("그룹별 루틴 조회")
//    void searchRoutine() {
//        //given
//        List<RoutineRequest.RoutineExercise> exercises = new ArrayList<>();
//        exercises.add(new RoutineRequest.RoutineExercise("PUSHUP", 24));
//        exercises.add(new RoutineRequest.RoutineExercise("BURPEE", 5));
//        RoutineRequest routineRequest = RoutineRequest.builder()
//                .routineName("routine1")
//                .exercise(exercises)
//                .breakTime(60)
//                .totalTime(180)
//                .build();
//        routineService.createRoutine(teamId, routineRequest);
//        //when
//        List<RoutineResponse> routines = routineService.searchRoutine(teamId);
//
//        //then
//        Assertions.assertEquals(routines.get(0).getRoutineName(), "routine1");
//    }
//
//    @Test
//    @DisplayName("루틴 아이디로 루틴 상세 정보 조회")
//    void searchDetailRoutine() {
//        //given
//        List<RoutineRequest.RoutineExercise> exercises = new ArrayList<>();
//        exercises.add(new RoutineRequest.RoutineExercise("PUSHUP", 24));
//        exercises.add(new RoutineRequest.RoutineExercise("BURPEE", 5));
//        RoutineRequest routineRequest = RoutineRequest.builder()
//                .routineName("routine1")
//                .exercise(exercises)
//                .breakTime(60)
//                .totalTime(180)
//                .build();
//        routineService.createRoutine(teamId, routineRequest);
//        Long routineId = routineRepository.findRoutineByTeam(getTeamInfo(teamId)).get(0).getId();
//
//        //when
//        RoutineResponse routine = routineService.searchDetailRoutine(routineId);
//
//        //then
//        Assertions.assertEquals(routine.getRoutineName(), "routine1");
//    }
//
//    @Test
//    @DisplayName("루틴 내용 수정")
//    void updateRoutine() {
//        //given
//        List<RoutineRequest.RoutineExercise> exercises = new ArrayList<>();
//        exercises.add(new RoutineRequest.RoutineExercise("PUSHUP", 24));
//        exercises.add(new RoutineRequest.RoutineExercise("BURPEE", 5));
//        RoutineRequest routineRequest = RoutineRequest.builder()
//                .routineName("routine1")
//                .exercise(exercises)
//                .breakTime(60)
//                .totalTime(180)
//                .build();
//        routineService.createRoutine(teamId, routineRequest);
//        Long routineId = routineRepository.findRoutineByTeam(getTeamInfo(teamId)).get(0).getId();
//        //when
//        List<RoutineRequest.RoutineExercise> updateExercises = new ArrayList<>();
//        updateExercises.add(new RoutineRequest.RoutineExercise("PUSHUP", 2));
//        updateExercises.add(new RoutineRequest.RoutineExercise("BURPEE", 50));
//        RoutineRequest updateRoutineRequest = RoutineRequest.builder()
//                .routineName("updateRoutine")
//                .exercise(updateExercises)
//                .breakTime(60)
//                .totalTime(180)
//                .build();
//        routineService.updateRoutine(routineId, updateRoutineRequest);
//
//        //then
//        Routine routine = routineRepository.findById(routineId).orElseThrow();
//        Assertions.assertEquals(routine.getName(), "updateRoutine");
//
//    }
//
//    private Team getTeamInfo(Long teamId) {
//        return teamRepository.findById(teamId)
//                .orElseThrow(() -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR));
//    }
//
//}
