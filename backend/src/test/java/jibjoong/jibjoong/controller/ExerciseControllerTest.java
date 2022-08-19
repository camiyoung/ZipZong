package jibjoong.jibjoong.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jibjoong.jibjoong.api.controller.ExerciseController;
//import jibjoong.jibjoong.api.dto.exercise.request.ExerciseMemberHistoryRequest;
//import jibjoong.jibjoong.api.dto.exercise.request.ExerciseResultRequest;
//import jibjoong.jibjoong.api.dto.exercise.request.ExerciseTeamHistoryRequest;
//import jibjoong.jibjoong.api.dto.exercise.response.*;
//import jibjoong.jibjoong.api.service.ExerciseService;
//import jibjoong.jibjoong.config.auth.OAuthService;
//import jibjoong.jibjoong.config.jwt.JwtService;
//import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
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
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(ExerciseController.class)
//@AutoConfigureRestDocs
//@MockBean(JpaMetamodelMappingContext.class)
//public class ExerciseControllerTest {
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
//    private MemberRepository memberRepository;
//
//    @MockBean
//    private ExerciseService exerciseService;
//
//    @Test
//    @DisplayName("운동 결과 저장 후 달성률 반환")
//    void saveExerciseResult() throws Exception {
//        // given
//        ExerciseResultRequest exerciseResultRequest = makeExerciseResultRequest();
//        ExerciseResultResponse exerciseResultResponse = makeExerciseResultResponse();
//        String body = (new ObjectMapper()).writeValueAsString(exerciseResultRequest);
//        given(exerciseService.calculatePercentageAvg(any())).willReturn(exerciseResultResponse);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/exercise/result")
//                .content(body)
//                .contentType(MediaType.APPLICATION_JSON);
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data.avgPercentage").value(exerciseResultResponse.getAvgPercentage()))
//                .andDo(document("exercise-result",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                                fieldWithPath("teamId").description("팀 ID"),
//                                fieldWithPath("personalResults.[]").description("개인 별 운동 기록"),
//                                fieldWithPath("personalResults.[].memberId").description("회원 ID"),
//                                fieldWithPath("personalResults.[].personalResultDetails.[]").description("동작 별 정보"),
//                                fieldWithPath("personalResults.[].personalResultDetails.[].exerciseName").description("동작 이름"),
//                                fieldWithPath("personalResults.[].personalResultDetails.[].performNum").description("실시 횟수"),
//                                fieldWithPath("personalResults.[].personalResultDetails.[].targetNum").description("목적 횟수")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.personalPercentages.[]").description("회원 달성률"),
//                                fieldWithPath("data.personalPercentages.[].nickname").description("회원 닉네임"),
//                                fieldWithPath("data.personalPercentages.[].percentage").description("개인별 달성률"),
//                                fieldWithPath("data.avgPercentage").description("전체 평균 달성률")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("팀 월별 기록 조회")
//    void teamMonthlyHistory() throws Exception {
//        // given
//        ExerciseTeamHistoryRequest exerciseTeamHistoryRequest = makeExerciseTeamHistoryRequest();
//        ExerciseTeamHistoryResponse exerciseTeamHistoryResponse = makeExerciseTeamHistoryResponse();
//        given(exerciseService.teamHistoryByYearAndMonth(anyLong(), anyInt(), anyInt())).willReturn(exerciseTeamHistoryResponse);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/exercise/history/team", exerciseTeamHistoryRequest)
//                .param("teamId", String.valueOf(exerciseTeamHistoryRequest.getTeamId()))
//                .param("year", String.valueOf(exerciseTeamHistoryRequest.getYear()))
//                .param("month", String.valueOf(exerciseTeamHistoryRequest.getMonth()));
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.dailyHistories.[0].day").value(1))
//                .andDo(document("exercise-team-monthly",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestParameters(
//                                parameterWithName("teamId").description("팀 ID"),
//                                parameterWithName("year").description("연"),
//                                parameterWithName("month").description("월")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.dailyHistories.[]").description("일자 별 운동기록"),
//                                fieldWithPath("data.dailyHistories.[].day").description("일자"),
//                                fieldWithPath("data.dailyHistories.[].totalTime").description("당일 운동시간"),
//                                fieldWithPath("data.dailyHistories.[].state").description("캘린더 표시상태"),
//                                fieldWithPath("data.dailyHistories.[].performs.[]").description("동작별 정보"),
//                                fieldWithPath("data.dailyHistories.[].performs.[].performName").description("동작별 정보"),
//                                fieldWithPath("data.dailyHistories.[].performs.[].performNum").description("동작별 횟수"),
//                                fieldWithPath("data.dailyHistories.[].performs.[].performTime").description("동작별 시간")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("팀 누적 기록 조회")
//    void teamExerciseHistory() throws Exception {
//        // given
//        ExerciseTeamTotalResponse exerciseTeamTotalResponse = makeExerciseTeamTotalResponse();
//        given(exerciseService.totalTeamHistory(anyLong())).willReturn(exerciseTeamTotalResponse);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/exercise/history/team/sum?teamId=1");
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.currentStrick").value(5))
//                .andDo(document("exercise-team-history",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestParameters(
//                                parameterWithName("teamId").description("팀 ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.currentStrick").description("현재 스트릭 일 수"),
//                                fieldWithPath("data.performTeamTotals.[]").description("동작 별 통계"),
//                                fieldWithPath("data.performTeamTotals.[].performName").description("동작 이름"),
//                                fieldWithPath("data.performTeamTotals.[].performTotal").description("동작 총 횟수")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("회원 월별 기록 조회")
//    void memberMonthlyHistory() throws Exception {
//        // given
//        ExerciseMemberHistoryRequest exerciseMemberHistoryRequest = makeExerciseMemberHistoryRequest();
//        ExerciseMemberHistoryResponse exerciseMemberHistoryResponse = makeExerciseMemberHistoryResponse();
//        given(exerciseService.memberHistoryByYearAndMonth(anyLong(), anyInt(), anyInt())).willReturn(exerciseMemberHistoryResponse);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/exercise/history/member", exerciseMemberHistoryRequest)
//                .param("memberId", String.valueOf(exerciseMemberHistoryRequest.getMemberId()))
//                .param("year", String.valueOf(exerciseMemberHistoryRequest.getYear()))
//                .param("month", String.valueOf(exerciseMemberHistoryRequest.getMonth()));
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.dailyHistories.[0].day").value(1))
//                .andDo(document("exercise-member-monthly",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestParameters(
//                                parameterWithName("memberId").description("회원 ID"),
//                                parameterWithName("year").description("연"),
//                                parameterWithName("month").description("월")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.dailyHistories.[]").description("일자 별 운동기록"),
//                                fieldWithPath("data.dailyHistories.[].day").description("일자"),
//                                fieldWithPath("data.dailyHistories.[].totalTime").description("당일 운동시간"),
//                                fieldWithPath("data.dailyHistories.[].state").description("캘린더 표시 상태"),
//                                fieldWithPath("data.dailyHistories.[].performs.[]").description("동작별 정보"),
//                                fieldWithPath("data.dailyHistories.[].performs.[].performName").description("동작별 정보"),
//                                fieldWithPath("data.dailyHistories.[].performs.[].performNum").description("동작별 횟수"),
//                                fieldWithPath("data.dailyHistories.[].performs.[].performTime").description("동작별 시간")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("회원 누적 기록 조회")
//    void memberExerciseHistory() throws Exception {
//        // given
//        ExerciseMemberTotalResponse exerciseMemberTotalResponse = makeExerciseMemberTotalResponse();
//        given(exerciseService.totalMemberHistory(anyLong())).willReturn(exerciseMemberTotalResponse);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/exercise/history/member/sum?memberId=1");
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.currentStrick").value(5))
//                .andDo(document("exercise-member-history",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestParameters(
//                                parameterWithName("memberId").description("회원 ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.currentStrick").description("현재 스트릭 일 수"),
//                                fieldWithPath("data.totalTime").description("총 운동 누적 분"),
//                                fieldWithPath("data.performMemberTotals.[]").description("동작 별 통계"),
//                                fieldWithPath("data.performMemberTotals.[].performName").description("동작 이름"),
//                                fieldWithPath("data.performMemberTotals.[].performTotal").description("동작 총 횟수")
//
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("당일 팀 멤버 운동 현황 조회")
//    void teamMemberExerciseToday() throws Exception {
//        // given
//        ExerciseTeamTodayResponse exerciseTeamTodayResponse = makeExerciseTeamTodayResponse();
//        given(exerciseService.exerciseMemberToday(anyLong())).willReturn(exerciseTeamTodayResponse);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/exercise/today/team?teamId=1");
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.niceMembers.[0].memberId").value(1L))
//                .andDo(document("exercise-team-today",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestParameters(
//                                parameterWithName("teamId").description("팀 ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.niceMembers.[]").description("오늘 운동한 멤버 목록"),
//                                fieldWithPath("data.niceMembers.[].memberId").description("멤버 ID"),
//                                fieldWithPath("data.niceMembers.[].nickName").description("닉네임")
//                        )
//                        ));
//    }
//
//    private ExerciseResultRequest makeExerciseResultRequest() {
//        ExerciseResultRequest exerciseResultRequest = new ExerciseResultRequest();
//
//        exerciseResultRequest.setTeamId(1L);
//        List<ExerciseResultRequest.PersonalResult> personalResults = new ArrayList<>();
//
//        ExerciseResultRequest.PersonalResult personalResult1 = new ExerciseResultRequest.PersonalResult();
//        personalResult1.setMemberId(1L);
//
//        List<ExerciseResultRequest.PersonalResultDetail> personalResultDetails1 = new ArrayList<>();
//        ExerciseResultRequest.PersonalResultDetail personalResultDetail1 = new ExerciseResultRequest.PersonalResultDetail();
//        personalResultDetail1.setExerciseName("PUSHUP");
//        personalResultDetail1.setPerformNum(5);
//        personalResultDetail1.setTargetNum(10);
//        personalResultDetails1.add(personalResultDetail1);
//        personalResult1.setPersonalResultDetails(personalResultDetails1);
//
//        ExerciseResultRequest.PersonalResult personalResult2 = new ExerciseResultRequest.PersonalResult();
//        personalResult2.setMemberId(2L);
//
//        List<ExerciseResultRequest.PersonalResultDetail> personalResultDetails2 = new ArrayList<>();
//        ExerciseResultRequest.PersonalResultDetail personalResultDetail2 = new ExerciseResultRequest.PersonalResultDetail();
//        personalResultDetail2.setExerciseName("PUSHUP");
//        personalResultDetail2.setPerformNum(8);
//        personalResultDetail2.setTargetNum(10);
//        personalResultDetails2.add(personalResultDetail2);
//        personalResult2.setPersonalResultDetails(personalResultDetails2);
//
//        personalResults.add(personalResult1);
//        personalResults.add(personalResult2);
//
//        exerciseResultRequest.setPersonalResults(personalResults);
//
//        return exerciseResultRequest;
//    }
//
//    private ExerciseResultResponse makeExerciseResultResponse() {
//        ExerciseResultResponse exerciseResultResponse = new ExerciseResultResponse();
//
//        List<ExerciseResultResponse.PersonalPercentage> personalPercentages = new ArrayList<>();
//        ExerciseResultResponse.PersonalPercentage personalPercentage = new ExerciseResultResponse.PersonalPercentage();
//        ExerciseResultResponse.PersonalPercentage personalPercentage2 = new ExerciseResultResponse.PersonalPercentage();
//
//        personalPercentage.setNickname("닉네임1");
//        personalPercentage.setPercentage(50);
//        personalPercentage2.setNickname("닉네임2");
//        personalPercentage2.setPercentage(80);
//
//        personalPercentages.add(personalPercentage);
//        personalPercentages.add(personalPercentage2);
//
//        exerciseResultResponse.setAvgPercentage(65);
//        exerciseResultResponse.setPersonalPercentages(personalPercentages);
//
//        return exerciseResultResponse;
//    }
//
//    private ExerciseTeamHistoryRequest makeExerciseTeamHistoryRequest() {
//        ExerciseTeamHistoryRequest exerciseTeamHistoryRequest = new ExerciseTeamHistoryRequest();
//        exerciseTeamHistoryRequest.setTeamId(1L);
//        exerciseTeamHistoryRequest.setYear(2022);
//        exerciseTeamHistoryRequest.setMonth(8);
//        return exerciseTeamHistoryRequest;
//    }
//
//    private ExerciseTeamHistoryResponse makeExerciseTeamHistoryResponse() {
//        ExerciseTeamHistoryResponse exerciseTeamHistoryResponse = new ExerciseTeamHistoryResponse();
//
//        List<ExerciseTeamHistoryResponse.DailyHistory> dailyHistories = new ArrayList<>();
//
//        ExerciseTeamHistoryResponse.DailyHistory dailyHistory = new ExerciseTeamHistoryResponse.DailyHistory();
//
//        List<ExerciseTeamHistoryResponse.Perform> performs = new ArrayList<>();
//        ExerciseTeamHistoryResponse.Perform perform1 = new ExerciseTeamHistoryResponse.Perform();
//        perform1.setPerformName("PUSHUP");
//        perform1.setPerformNum(18);
//        perform1.setPerformTime(1);
//
//        ExerciseTeamHistoryResponse.Perform perform2 = new ExerciseTeamHistoryResponse.Perform();
//        perform2.setPerformName("LEGRAISE");
//        perform2.setPerformNum(30);
//        perform2.setPerformTime(2);
//
//        performs.add(perform1);
//        performs.add(perform2);
//
//        dailyHistory.setDay(1);
//        dailyHistory.setTotalTime(3);
//        dailyHistory.setPerforms(performs);
//        dailyHistory.setState("SUCCESS");
//
//        dailyHistories.add(dailyHistory);
//
//        exerciseTeamHistoryResponse.setDailyHistories(dailyHistories);
//
//        return exerciseTeamHistoryResponse;
//    }
//
//    private ExerciseTeamTotalResponse makeExerciseTeamTotalResponse() {
//        ExerciseTeamTotalResponse exerciseTeamTotalResponse = new ExerciseTeamTotalResponse();
//
//        List<ExerciseTeamTotalResponse.PerformTeamTotal> performTeamTotals = new ArrayList<>();
//
//        ExerciseTeamTotalResponse.PerformTeamTotal performTeamTotal = new ExerciseTeamTotalResponse.PerformTeamTotal();
//        performTeamTotal.setPerformTotal(500);
//        performTeamTotal.setPerformName("PUSHUP");
//
//        performTeamTotals.add(performTeamTotal);
//
//        exerciseTeamTotalResponse.setPerformTeamTotals(performTeamTotals);
//        exerciseTeamTotalResponse.setCurrentStrick(5);
//
//        return exerciseTeamTotalResponse;
//    }
//
//    private ExerciseMemberHistoryRequest makeExerciseMemberHistoryRequest() {
//        ExerciseMemberHistoryRequest exerciseMemberHistoryRequest = new ExerciseMemberHistoryRequest();
//        exerciseMemberHistoryRequest.setMemberId(1L);
//        exerciseMemberHistoryRequest.setYear(2022);
//        exerciseMemberHistoryRequest.setMonth(8);
//        return exerciseMemberHistoryRequest;
//    }
//
//    private ExerciseMemberHistoryResponse makeExerciseMemberHistoryResponse() {
//        ExerciseMemberHistoryResponse exerciseMemberHistoryResponse = new ExerciseMemberHistoryResponse();
//
//        List<ExerciseMemberHistoryResponse.DailyHistory> dailyHistories = new ArrayList<>();
//
//        ExerciseMemberHistoryResponse.DailyHistory dailyHistory = new ExerciseMemberHistoryResponse.DailyHistory();
//
//        List<ExerciseMemberHistoryResponse.Perform> performs = new ArrayList<>();
//        ExerciseMemberHistoryResponse.Perform perform1 = new ExerciseMemberHistoryResponse.Perform();
//        perform1.setPerformName("PUSHUP");
//        perform1.setPerformNum(18);
//        perform1.setPerformTime(1);
//
//        ExerciseMemberHistoryResponse.Perform perform2 = new ExerciseMemberHistoryResponse.Perform();
//        perform2.setPerformName("LEGRAISE");
//        perform2.setPerformNum(30);
//        perform2.setPerformTime(2);
//
//        performs.add(perform1);
//        performs.add(perform2);
//
//        dailyHistory.setDay(1);
//        dailyHistory.setTotalTime(3);
//        dailyHistory.setPerforms(performs);
//        dailyHistory.setState("SUCCESS");
//
//        dailyHistories.add(dailyHistory);
//
//        exerciseMemberHistoryResponse.setDailyHistories(dailyHistories);
//
//        return exerciseMemberHistoryResponse;
//    }
//
//    private ExerciseMemberTotalResponse makeExerciseMemberTotalResponse() {
//        ExerciseMemberTotalResponse exerciseMemberTotalResponse = new ExerciseMemberTotalResponse();
//
//        List<ExerciseMemberTotalResponse.PerformMemberTotal> performMemberTotals = new ArrayList<>();
//
//        ExerciseMemberTotalResponse.PerformMemberTotal performMemberTotal = new ExerciseMemberTotalResponse.PerformMemberTotal();
//        performMemberTotal.setPerformTotal(500);
//        performMemberTotal.setPerformName("PUSHUP");
//
//        performMemberTotals.add(performMemberTotal);
//
//        exerciseMemberTotalResponse.setPerformMemberTotals(performMemberTotals);
//        exerciseMemberTotalResponse.setCurrentStrick(5);
//
//        return exerciseMemberTotalResponse;
//    }
//
//    private ExerciseTeamTodayResponse makeExerciseTeamTodayResponse() {
//        ExerciseTeamTodayResponse exerciseTeamTodayResponse = new ExerciseTeamTodayResponse();
//        List<ExerciseTeamTodayResponse.NiceMember> niceMembers = new ArrayList<>();
//
//        ExerciseTeamTodayResponse.NiceMember niceMember1 = new ExerciseTeamTodayResponse.NiceMember();
//        ExerciseTeamTodayResponse.NiceMember niceMember2 = new ExerciseTeamTodayResponse.NiceMember();
//
//        niceMember1.setMemberId(1L);
//        niceMember1.setNickName("닉네임1");
//        niceMember2.setMemberId(2L);
//        niceMember2.setNickName("닉네임2");
//
//        niceMembers.add(niceMember1);
//        niceMembers.add(niceMember2);
//
//        exerciseTeamTodayResponse.setNiceMembers(niceMembers);
//
//        return exerciseTeamTodayResponse;
//    }
//}
