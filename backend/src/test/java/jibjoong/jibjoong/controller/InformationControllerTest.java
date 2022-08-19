//package jibjoong.jibjoong.controller;
//
//import jibjoong.jibjoong.api.controller.InformationController;
//import jibjoong.jibjoong.api.dto.information.TeamDetailResponse;
//import jibjoong.jibjoong.api.service.InformationService;
//import jibjoong.jibjoong.config.auth.OAuthService;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.RequestBuilder;
//import org.springframework.test.web.servlet.ResultActions;
//import jibjoong.jibjoong.api.dto.information.MemberDetailResponse;
//import jibjoong.jibjoong.api.dto.information.TeamMemberDetailResponse;
//import jibjoong.jibjoong.config.jwt.JwtService;
//import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(InformationController.class)
//@AutoConfigureRestDocs
//@MockBean(JpaMetamodelMappingContext.class)
//public class InformationControllerTest {
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
//    private InformationService informationService;
//
//    @Test
//    @DisplayName("팀 상세정보 조회")
//    void teamDetail() throws Exception {
//        // given
//        TeamDetailResponse teamDetailResponse = makeTeamDetailResponse();
//        given(informationService.getTeamInfoDetail(anyLong())).willReturn(teamDetailResponse);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/information/team/{teamId}", 1L);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andDo(document("show-team-detail",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("teamId").description("팀 ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.teamName").description("팀 이름"),
//                                fieldWithPath("data.teamIcon").description("팀 아이콘"),
//                                fieldWithPath("data.createDate").description("팀 생성 날짜"),
//                                fieldWithPath("data.currentStrick").description("현재 그룹 스트릭"),
//                                fieldWithPath("data.maximumStrick").description("최대 그룹 스트릭"),
//                                fieldWithPath("data.totalTime").description("누적 시간"),
//                                fieldWithPath("data.teamLeader").description("그룹장 닉네임"),
//                                fieldWithPath("data.teamMembers.[]").description("그룹원 목록"),
//                                fieldWithPath("data.content").description("그룹 설명")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("멤버 상세정보 조회")
//    void memberDetail() throws Exception {
//        // given
//        MemberDetailResponse memberDetailResponse = makeMemberDetailResponse();
//        given(informationService.getMemberInfoDetail(anyLong())).willReturn(memberDetailResponse);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/information/member/{memberId}", 1L);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andDo(document("show-member-detail",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("memberId").description("멤버 ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.nickname").description("닉네임"),
//                                fieldWithPath("data.memberIcon").description("멤버 아이콘"),
//                                fieldWithPath("data.currentStrick").description("현재 그룹 스트릭"),
//                                fieldWithPath("data.maximumStrick").description("최대 그룹 스트릭"),
//                                fieldWithPath("data.totalTime").description("누적 시간")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("그룹 내 멤버 상세정보 조회")
//    void teamMemberDetail() throws Exception {
//        // given
//        TeamMemberDetailResponse teamMemberDetailResponse = makeTeamMemberDetailResponse();
//        given(informationService.getTeamMemberInfoDetail(anyLong(), anyLong())).willReturn(teamMemberDetailResponse);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/information/member/{teamId}/{memberId}", 1L, 1L);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andDo(document("show-team-member-detail",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("teamId").description("팀 ID"),
//                                parameterWithName("memberId").description("멤버 ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.nickname").description("닉네임"),
//                                fieldWithPath("data.memberIcon").description("멤버 아이콘"),
//                                fieldWithPath("data.registrationDate").description("그룹 가입 날짜"),
//                                fieldWithPath("data.lastExercised").description("그룹에서 마지막으로 운동한 날짜"),
//                                fieldWithPath("data.currentStrick").description("현재 그룹 스트릭"),
//                                fieldWithPath("data.maximumStrick").description("최대 그룹 스트릭"),
//                                fieldWithPath("data.totalTime").description("누적 시간")
//                        )
//                ));
//    }
//
//    private TeamDetailResponse makeTeamDetailResponse() {
//        TeamDetailResponse teamDetailResponse = new TeamDetailResponse();
//        List<String> teamMembers = new ArrayList<>();
//        teamMembers.add("승주");
//        teamMembers.add("종민");
//        teamMembers.add("슬기");
//        teamMembers.add("지영");
//        teamMembers.add("송지");
//
//        teamDetailResponse.setTeamName("팀 이름");
//        teamDetailResponse.setTeamIcon("아이콘 이름");
//        teamDetailResponse.setCreateDate(LocalDate.of(2022, 8, 16));
//        teamDetailResponse.setCurrentStrick(50);
//        teamDetailResponse.setMaximumStrick(60);
//        teamDetailResponse.setTotalTime(1000);
//        teamDetailResponse.setTeamLeader("승주");
//        teamDetailResponse.setTeamMembers(teamMembers);
//        teamDetailResponse.setContent("안녕하세요");
//
//        return teamDetailResponse;
//    }
//
//    private MemberDetailResponse makeMemberDetailResponse() {
//        MemberDetailResponse memberDetailResponse = new MemberDetailResponse();
//        memberDetailResponse.setNickname("승주");
//        memberDetailResponse.setMemberIcon("아이콘");
//        memberDetailResponse.setCurrentStrick(50);
//        memberDetailResponse.setMaximumStrick(70);
//        memberDetailResponse.setTotalTime(1000);
//
//        return memberDetailResponse;
//    }
//
//    private TeamMemberDetailResponse makeTeamMemberDetailResponse() {
//        TeamMemberDetailResponse teamMemberDetailResponse = new TeamMemberDetailResponse();
//        teamMemberDetailResponse.setNickname("승주");
//        teamMemberDetailResponse.setMemberIcon("아이콘");
//        teamMemberDetailResponse.setRegistrationDate(LocalDate.of(2022, 7, 6));
//        teamMemberDetailResponse.setLastExercised(LocalDate.of(2022, 8, 15));
//        teamMemberDetailResponse.setCurrentStrick(50);
//        teamMemberDetailResponse.setMaximumStrick(70);
//        teamMemberDetailResponse.setTotalTime(1000);
//
//        return teamMemberDetailResponse;
//    }
//}
