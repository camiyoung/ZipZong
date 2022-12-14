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
//    @DisplayName("??? ???????????? ??????")
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
//                                parameterWithName("teamId").description("??? ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("?????????"),
//                                fieldWithPath("data.teamName").description("??? ??????"),
//                                fieldWithPath("data.teamIcon").description("??? ?????????"),
//                                fieldWithPath("data.createDate").description("??? ?????? ??????"),
//                                fieldWithPath("data.currentStrick").description("?????? ?????? ?????????"),
//                                fieldWithPath("data.maximumStrick").description("?????? ?????? ?????????"),
//                                fieldWithPath("data.totalTime").description("?????? ??????"),
//                                fieldWithPath("data.teamLeader").description("????????? ?????????"),
//                                fieldWithPath("data.teamMembers.[]").description("????????? ??????"),
//                                fieldWithPath("data.content").description("?????? ??????")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("?????? ???????????? ??????")
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
//                                parameterWithName("memberId").description("?????? ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("?????????"),
//                                fieldWithPath("data.nickname").description("?????????"),
//                                fieldWithPath("data.memberIcon").description("?????? ?????????"),
//                                fieldWithPath("data.currentStrick").description("?????? ?????? ?????????"),
//                                fieldWithPath("data.maximumStrick").description("?????? ?????? ?????????"),
//                                fieldWithPath("data.totalTime").description("?????? ??????")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("?????? ??? ?????? ???????????? ??????")
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
//                                parameterWithName("teamId").description("??? ID"),
//                                parameterWithName("memberId").description("?????? ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("?????????"),
//                                fieldWithPath("data.nickname").description("?????????"),
//                                fieldWithPath("data.memberIcon").description("?????? ?????????"),
//                                fieldWithPath("data.registrationDate").description("?????? ?????? ??????"),
//                                fieldWithPath("data.lastExercised").description("???????????? ??????????????? ????????? ??????"),
//                                fieldWithPath("data.currentStrick").description("?????? ?????? ?????????"),
//                                fieldWithPath("data.maximumStrick").description("?????? ?????? ?????????"),
//                                fieldWithPath("data.totalTime").description("?????? ??????")
//                        )
//                ));
//    }
//
//    private TeamDetailResponse makeTeamDetailResponse() {
//        TeamDetailResponse teamDetailResponse = new TeamDetailResponse();
//        List<String> teamMembers = new ArrayList<>();
//        teamMembers.add("??????");
//        teamMembers.add("??????");
//        teamMembers.add("??????");
//        teamMembers.add("??????");
//        teamMembers.add("??????");
//
//        teamDetailResponse.setTeamName("??? ??????");
//        teamDetailResponse.setTeamIcon("????????? ??????");
//        teamDetailResponse.setCreateDate(LocalDate.of(2022, 8, 16));
//        teamDetailResponse.setCurrentStrick(50);
//        teamDetailResponse.setMaximumStrick(60);
//        teamDetailResponse.setTotalTime(1000);
//        teamDetailResponse.setTeamLeader("??????");
//        teamDetailResponse.setTeamMembers(teamMembers);
//        teamDetailResponse.setContent("???????????????");
//
//        return teamDetailResponse;
//    }
//
//    private MemberDetailResponse makeMemberDetailResponse() {
//        MemberDetailResponse memberDetailResponse = new MemberDetailResponse();
//        memberDetailResponse.setNickname("??????");
//        memberDetailResponse.setMemberIcon("?????????");
//        memberDetailResponse.setCurrentStrick(50);
//        memberDetailResponse.setMaximumStrick(70);
//        memberDetailResponse.setTotalTime(1000);
//
//        return memberDetailResponse;
//    }
//
//    private TeamMemberDetailResponse makeTeamMemberDetailResponse() {
//        TeamMemberDetailResponse teamMemberDetailResponse = new TeamMemberDetailResponse();
//        teamMemberDetailResponse.setNickname("??????");
//        teamMemberDetailResponse.setMemberIcon("?????????");
//        teamMemberDetailResponse.setRegistrationDate(LocalDate.of(2022, 7, 6));
//        teamMemberDetailResponse.setLastExercised(LocalDate.of(2022, 8, 15));
//        teamMemberDetailResponse.setCurrentStrick(50);
//        teamMemberDetailResponse.setMaximumStrick(70);
//        teamMemberDetailResponse.setTotalTime(1000);
//
//        return teamMemberDetailResponse;
//    }
//}
