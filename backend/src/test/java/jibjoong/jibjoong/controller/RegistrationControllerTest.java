//package jibjoong.jibjoong.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jibjoong.jibjoong.api.dto.team.request.CreateTeamRequest;
//import jibjoong.jibjoong.api.dto.team.request.TeamInfoRequest;
//import jibjoong.jibjoong.api.dto.team.request.TeamLeaderAssignRequest;
//import jibjoong.jibjoong.api.dto.team.response.TeamResponse;
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
//import jibjoong.jibjoong.api.controller.RegistrationController;
//import jibjoong.jibjoong.api.dto.team.request.member.MemberInfoRequest;
//import jibjoong.jibjoong.api.dto.team.TeamMemberId;
//import jibjoong.jibjoong.api.service.RegistrationService;
//import jibjoong.jibjoong.config.auth.OAuthService;
//import jibjoong.jibjoong.config.jwt.JwtService;
//import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
//import jibjoong.jibjoong.enums.Role;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static java.time.LocalDateTime.now;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@AutoConfigureRestDocs
//@WebMvcTest(RegistrationController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//class RegistrationControllerTest {
//
//    @Autowired
//    MockMvc mockMvc;
//
//    @MockBean
//    private RegistrationService registrationService;
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
//    @Test
//    @DisplayName("회원이 가입한 팀 조회")
//    void getMemberJoinedTeam() throws Exception {
//        //given
//        Long memberId = 1L;
//
//        List<TeamResponse> result = new ArrayList<>();
//        result.add(makeTeamResponse(2L));
//        result.add(makeTeamResponse(3L));
//
//        given(registrationService.findJoinedTeam(any())).willReturn(result);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/registration/member/{member-id}", memberId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                     .andExpect(jsonPath("$.data.[0].groupId").value(2L))
//                     .andExpect(jsonPath("$.data.[1].groupId").value(3L))
//                     .andDo(document("get-member-joined-team",
//                             preprocessResponse(prettyPrint()),
//                             pathParameters(
//                                     parameterWithName("member-id").description("회원 아이디")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data.[].teamName").description("팀 이름"),
//                                     fieldWithPath("data.[].icon").description("팀 대표 아이콘"),
//                                     fieldWithPath("data.[].groupId").description("팀 아이디"),
//                                     fieldWithPath("data.[].count").description("팀 인원수")
//                             )
//                     ));
//
//    }
//
//    private TeamResponse makeTeamResponse(Long groupId) {
//        TeamResponse teamResponse = new TeamResponse();
//        teamResponse.setTeamName("5조");
//        teamResponse.setCount(3);
//        teamResponse.setIcon("basic");
//        teamResponse.setGroupId(groupId);
//        return teamResponse;
//    }
//
//    @Test
//    @DisplayName("팀 디테일 정보 조회")
//    void getTeamDetailInfo() throws Exception {
//        //given
//        Long teamId = 1L;
//        TeamInfoRequest teamInfoRequest = makeTeamInfoRequest();
//
//
//        given(registrationService.getTeamInfo(any())).willReturn(teamInfoRequest);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/registration/team/{team-id}", teamId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                     .andExpect(jsonPath("$.data.repIcons").value("repIcon"))
//                     .andDo(document("get-team-detail-info",
//                             preprocessResponse(prettyPrint()),
//                             pathParameters(
//                                     parameterWithName("team-id").description("팀 아이디")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data.icons.[]").description("보유한 팀 아이콘 이름"),
//                                     fieldWithPath("data.name").description("팀 이름"),
//                                     fieldWithPath("data.content").description("팀 소개"),
//                                     fieldWithPath("data.repIcons").description("팀 대표 아이콘"),
//                                     fieldWithPath("data.shieldCount").description("쉴드 아이템 개수"),
//                                     fieldWithPath("data.members.[].repIcon").description("회원 대표 아이콘"),
//                                     fieldWithPath("data.members.[].name").description("회원 이름"),
//                                     fieldWithPath("data.members.[].memberId").description("회원 아이디"),
//                                     fieldWithPath("data.members.[].nickname").description("회원 닉네임"),
//                                     fieldWithPath("data.members.[].createdAt").description("회원 가입일"),
//                                     fieldWithPath("data.members.[].role").description("회원 역할")
//                             )
//                     ));
//    }
//
//    private TeamInfoRequest makeTeamInfoRequest() {
//        TeamInfoRequest teamInfoRequest = new TeamInfoRequest();
//
//        List<String> icons = new ArrayList<>();
//        icons.add("addIcon1");
//        icons.add("addIcon2");
//        teamInfoRequest.setIcons(icons);
//        teamInfoRequest.setContent("content");
//        teamInfoRequest.setRepIcons("repIcon");
//        teamInfoRequest.setName("teamName");
//        teamInfoRequest.setShieldCount(1);
//
//        List<MemberInfoRequest> memberInfoRequestList = new ArrayList<>();
//
//        MemberInfoRequest memberInfoRequest1 = new MemberInfoRequest();
//        memberInfoRequest1.setMemberId(1L);
//        memberInfoRequest1.setName("name");
//        memberInfoRequest1.setNickname("nickname1");
//        memberInfoRequest1.setRepIcon("basic");
//        memberInfoRequest1.setCreatedAt(now());
//        memberInfoRequest1.setRole(Role.LEADER);
//
//        MemberInfoRequest memberInfoRequest2 = new MemberInfoRequest();
//        memberInfoRequest2.setMemberId(2L);
//        memberInfoRequest2.setName("name");
//        memberInfoRequest2.setNickname("nickname2");
//        memberInfoRequest2.setRepIcon("basic");
//        memberInfoRequest2.setCreatedAt(now());
//        memberInfoRequest2.setRole(Role.FOLLOWER);
//
//        memberInfoRequestList.add(memberInfoRequest1);
//        memberInfoRequestList.add(memberInfoRequest2);
//
//        teamInfoRequest.setMembers(memberInfoRequestList);
//
//        return teamInfoRequest;
//    }
//
//    @Test
//    @DisplayName("팀 생성")
//    void createTeam() throws Exception {
//        //given
//        TeamMemberId teamMemberId = makeTeamMemberId();
//        CreateTeamRequest createTeamRequest = makeCreateTeamRequest();
//        String body = (new ObjectMapper()).writeValueAsString(createTeamRequest);
//        given(registrationService.createTeam(any(), any())).willReturn(teamMemberId);
//
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/registration/create")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                     .andExpect(jsonPath("$.data.teamId").value(teamMemberId.getTeamId()))
//                     .andDo(document("create-team",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("name").description("팀 이름"),
//                                     fieldWithPath("content").description("팀 소개"),
//                                     fieldWithPath("repIcon").description("대표 아이콘"),
//                                     fieldWithPath("memberId").description("팀 만든 회원 아이디")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data.teamId").description("생성된 팀 아이디"),
//                                     fieldWithPath("data.memberId").description("생성한 회원 아이디")
//                             )
//                     ));
//    }
//
//    private TeamMemberId makeTeamMemberId() {
//        TeamMemberId teamMemberId = new TeamMemberId();
//        teamMemberId.setMemberId(1L);
//        teamMemberId.setTeamId(1L);
//        return teamMemberId;
//    }
//
//    private CreateTeamRequest makeCreateTeamRequest() {
//        CreateTeamRequest createTeamRequest = new CreateTeamRequest();
//        createTeamRequest.setName("name");
//        createTeamRequest.setContent("content");
//        createTeamRequest.setRepIcon("repIcon");
//        createTeamRequest.setMemberId(2L);
//        return createTeamRequest;
//
//    }
//
//    @Test
//    @DisplayName("팀 가입")
//    void joinTeam() throws Exception {
//        //given
//        TeamMemberId teamMemberId = makeTeamMemberId();
//        String body = (new ObjectMapper()).writeValueAsString(teamMemberId);
//        given(registrationService.joinTeam(any(), any())).willReturn(null);
//
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/registration/join")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                     .andDo(document("join-team",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("teamId").description("가입할 팀 아이디"),
//                                     fieldWithPath("memberId").description("가입할 회원 아이디")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("반환 값 없음")
//                             )
//                     ));
//    }
//
//    @Test
//    @DisplayName("회원이 그룹을 탈퇴하는 경우")
//    void resignTeam() throws Exception {
//        //given
//        TeamMemberId teamMemberId = makeTeamMemberId();
//        Long resignMemberId = 1L;
//        String body = (new ObjectMapper()).writeValueAsString(teamMemberId);
//        given(registrationService.resignTeam(any(), any())).willReturn(resignMemberId);
//
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/registration/team/resign")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                     .andDo(document("resign-team",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("teamId").description("탈퇴할 팀 아이디"),
//                                     fieldWithPath("memberId").description("탈퇴할 회원 아이디")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("탈퇴한 회원 아이디")
//                             )
//                     ));
//
//    }
//
//    @Test
//    @DisplayName("그룹원이 팀원을 강퇴하는 경우")
//    void expelMember() throws Exception {
//        //given
//        TeamLeaderAssignRequest teamLeaderAssignRequest = new TeamLeaderAssignRequest();
//        teamLeaderAssignRequest.setTeamId(1L);
//        teamLeaderAssignRequest.setLeaderId(1L);
//        teamLeaderAssignRequest.setFollowerId(2L);
//
//        Long followerId = 2L;
//        String body = (new ObjectMapper()).writeValueAsString(teamLeaderAssignRequest);
//        given(registrationService.expelMember(any(), any(), any())).willReturn(followerId);
//
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/registration/team/expel")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                     .andDo(document("expel-member",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("leaderId").description("그룹장 아이디"),
//                                     fieldWithPath("followerId").description("그룹원 아이디"),
//                                     fieldWithPath("teamId").description("팀 아이디")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("강퇴된 그룹원 아이디")
//                             )
//                     ));
//    }
//
//    @Test
//    @DisplayName("그룹장이 그룹장을 위임하는 경우")
//    void delegateLeader() throws Exception {
//        //given
//        TeamLeaderAssignRequest teamLeaderAssignRequest = new TeamLeaderAssignRequest();
//        teamLeaderAssignRequest.setTeamId(1L);
//        teamLeaderAssignRequest.setLeaderId(1L);
//        teamLeaderAssignRequest.setFollowerId(2L);
//
//        Long followerId = 2L;
//        String body = (new ObjectMapper()).writeValueAsString(teamLeaderAssignRequest);
//        given(registrationService.delegateLeader(any(), any(), any())).willReturn(followerId);
//
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/registration/team/assign")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                     .andDo(document("assign-leader-to-follower",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("leaderId").description("그룹장 아이디"),
//                                     fieldWithPath("followerId").description("그룹원 아이디"),
//                                     fieldWithPath("teamId").description("팀 아이디")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("리더가 된 그룹원 아이디")
//                             )
//                     ));
//    }
//
//
//    @Test
//    @DisplayName("그룹장이 그룹을 제거하는 경우")
//    void deleteTeam() throws Exception {
//        //given
//        TeamMemberId teamMemberId = makeTeamMemberId();
//        Long deletedTeamId = 1L;
//        String body = (new ObjectMapper()).writeValueAsString(teamMemberId);
//        given(registrationService.deleteTeam(any(), any())).willReturn(deletedTeamId);
//
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/registration/delete-team")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                     .andDo(document("delete-team",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("teamId").description("탈퇴할 팀 아이디"),
//                                     fieldWithPath("memberId").description("탈퇴를 진행하는 리더의 회원 아이디")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("탈퇴된 팀 아이디")
//                             )
//                     ));
//    }
//}