//package jibjoong.jibjoong.controller;
//
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jibjoong.jibjoong.api.controller.RoutineController;
//import jibjoong.jibjoong.api.dto.routine.RoutineRequest;
//import jibjoong.jibjoong.api.dto.routine.RoutineResponse;
//import jibjoong.jibjoong.api.service.RoutineService;
//import jibjoong.jibjoong.config.auth.OAuthService;
//import jibjoong.jibjoong.config.jwt.JwtService;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.RequestBuilder;
//import org.springframework.test.web.servlet.ResultActions;
//import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
//import jibjoong.jibjoong.db.repository.routine.RoutineDetailRepository;
//import jibjoong.jibjoong.db.repository.routine.RoutineRepository;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(RoutineController.class)
//@AutoConfigureRestDocs
//@MockBean(JpaMetamodelMappingContext.class)
//public class RoutineControllerTest {
//
//    @Autowired
//    MockMvc mockMvc;
//
//    @MockBean
//    private OAuthService oAuthService;
//
//    @MockBean
//    private JwtService jwtService;
//
//    @MockBean
//    private RoutineService routineService;
//
//    @MockBean
//    private RoutineRepository routineRepository;
//
//    @MockBean
//    private MemberRepository memberRepository;
//
//    @MockBean
//    private RoutineDetailRepository routineDetailRepository;
//
//    @Test
//    @DisplayName("그룹별 루틴 등록")
//    void createRoutine() throws Exception {
//        //given
//        Long teamId = 1L;
//        RoutineRequest routineRequest = makeRoutineRequest("routine1");
//        String body = (new ObjectMapper()).writeValueAsString(routineRequest);
//        given(routineService.createRoutine(anyLong(), any())).willReturn(teamId);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/routine/{teamId}", teamId)
//                .content(body)
//                .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data").value("1"))
//                .andDo(document("create-routine-by-team",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("teamId").description("팀 아이디")
//                        ),
//                        requestFields(
//                                fieldWithPath("routineName").description("루틴 이름"),
//                                fieldWithPath("exercise.[].name").description("루틴의 운동 이름"),
//                                fieldWithPath("exercise.[].count").description("루틴의 운동 횟수"),
//                                fieldWithPath("breakTime").description("휴식 시간"),
//                                fieldWithPath("totalTime").description("운동 총 시간")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data").description("팀 아이디")
//                        )
//                ));
//    }
//
//
//    @Test
//    @DisplayName("팀별 루틴 조회")
//    void searchRoutine() throws Exception {
//        //given
//        Long teamId = 1L;
//        List<RoutineResponse> routineResponse = makeRoutineResponse();
//        given(routineService.searchRoutine(anyLong())).willReturn(routineResponse);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/routine/{teamId}", teamId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.[0].routineName").value("routine1"))
//                .andDo(document("get-routine-by-team",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("teamId").description("팀 아이디")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.[].routineName").description("루틴이름 "),
//                                fieldWithPath("data.[].routineId").description("루틴 아이디 "),
//                                fieldWithPath("data.[].exercise.[].name").description("루틴의 운동 이름 "),
//                                fieldWithPath("data.[].exercise.[].count").description("루틴의 운동 횟수 "),
//                                fieldWithPath("data.[].breakTime").description("휴식 시간"),
//                                fieldWithPath("data.[].totalTime").description("운동 총 시간")
//                        )
//                ));
//
//    }
//
//    @Test
//    @DisplayName("루틴별 운동 조회")
//    void searchDetailRoutine() throws Exception {
//        //given
//        Long routineId = 1L;
//        RoutineResponse routineResponse = makeRoutineResponse().get(0);
//        given(routineService.searchDetailRoutine(anyLong())).willReturn(routineResponse);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/routine/detail/{routineId}", routineId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.routineName").value("routine1"))
//                .andDo(document("get-routine-detail-by-routine",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("routineId").description("루틴 아이디")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.routineName").description("루틴이름 "),
//                                fieldWithPath("data.routineId").description("루틴 아이디 "),
//                                fieldWithPath("data.exercise.[].name").description("루틴의 운동 이름 "),
//                                fieldWithPath("data.exercise.[].count").description("루틴의 운동 횟수 "),
//                                fieldWithPath("data.breakTime").description("휴식 시간"),
//                                fieldWithPath("data.totalTime").description("운동 총 시간")
//                        )
//                ));
//
//    }
//
//    @Test
//    @DisplayName("팀의 루틴 수정")
//    void modifyRoutine() throws Exception {
//        //given
//        Long routineId = 1L;
//        RoutineRequest routineRequest = makeRoutineRequest("routine2");
//        String body = (new ObjectMapper()).writeValueAsString(routineRequest);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/routine/{routineId}", routineId)
//                .content(body)
//                .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data").value("0"))
//                .andDo(document("modify-routine-by-routineId",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("routineId").description("루틴 아이디")
//                        ),
//                        requestFields(
//                                fieldWithPath("routineName").description("루틴 이름"),
//                                fieldWithPath("exercise.[].name").description("루틴의 운동 이름"),
//                                fieldWithPath("exercise.[].count").description("루틴의 운동 횟수"),
//                                fieldWithPath("breakTime").description("휴식 시간"),
//                                fieldWithPath("totalTime").description("운동 총 시간")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data").description("팀 아이디")
//                        )
//                ));
//
//    }
//
//    @Test
//    @DisplayName("팀의 루틴 제거")
//    void deleteRoutine() throws Exception {
//        //given
//        Long routineId = 1L;
//        Long teamId = 1L;
//        given(routineService.deleteRoutine(anyLong())).willReturn(teamId);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.delete("/routine/{routineId}", routineId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data").value(teamId))
//                .andDo(document("delete-routine-by-routineId",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("routineId").description("루틴 아이디")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data").description("루틴 아이디")
//                        )
//                ));
//
//    }
//
//    private RoutineRequest makeRoutineRequest(String routineName) {
//        List<RoutineRequest.RoutineExercise> exercises = new ArrayList<>();
//        exercises.add(new RoutineRequest.RoutineExercise("PUSHUP", 24));
//        exercises.add(new RoutineRequest.RoutineExercise("BURPEE", 5));
//        RoutineRequest routineRequest = RoutineRequest.builder()
//                .routineName(routineName)
//                .exercise(exercises)
//                .breakTime(60)
//                .totalTime(180)
//                .build();
//        return routineRequest;
//    }
//
//    private List<RoutineResponse> makeRoutineResponse() {
//        List<RoutineResponse> routineResponseList = new ArrayList<>();
//        List<RoutineResponse.RoutineExercise> exercise1 = new ArrayList<>();
//        exercise1.add(new RoutineResponse.RoutineExercise("PUSHUP", 24));
//        exercise1.add(new RoutineResponse.RoutineExercise("BURPEE", 5));
//        RoutineResponse routineResponse1 = RoutineResponse.builder()
//                .routineName("routine1")
//                .routineId(1L)
//                .exercise(exercise1)
//                .breakTime(60)
//                .totalTime(180)
//                .build();
//        List<RoutineResponse.RoutineExercise> exercise2 = new ArrayList<>();
//        exercise2.add(new RoutineResponse.RoutineExercise("PUSHUP", 10));
//        exercise2.add(new RoutineResponse.RoutineExercise("BURPEE", 10));
//        exercise2.add(new RoutineResponse.RoutineExercise("PUSHUP", 20));
//        RoutineResponse routineResponse2 = RoutineResponse.builder()
//                .routineName("routine2")
//                .routineId(2L)
//                .exercise(exercise2)
//                .breakTime(60)
//                .totalTime(300)
//                .build();
//        routineResponseList.add(routineResponse1);
//        routineResponseList.add(routineResponse2);
//        return routineResponseList;
//    }
//
//}