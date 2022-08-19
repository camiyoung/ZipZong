//package jibjoong.jibjoong.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jibjoong.jibjoong.api.controller.TeamController;
//import jibjoong.jibjoong.api.dto.team.request.TeamProfileRequest;
//import jibjoong.jibjoong.api.dto.team.response.ChangeTeamInfoResponse;
//import jibjoong.jibjoong.api.dto.team.response.TeamIconResponse;
//import jibjoong.jibjoong.api.service.TeamService;
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
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.NoSuchElementException;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@AutoConfigureRestDocs
//@WebMvcTest(TeamController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//class TeamControllerTest {
//
//    @Autowired
//    MockMvc mockMvc;
//
//    @MockBean
//    private TeamService teamService;
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
//    @DisplayName("팀 정보 변경")
//    void changeTeamProfile() throws Exception {
//        //given
//        TeamProfileRequest teamProfileRequest = makeTeamProfileRequest();
//        ChangeTeamInfoResponse changeTeamInfoResponse = makeChangeProfileInfo();
//        String body = (new ObjectMapper()).writeValueAsString(teamProfileRequest);
//        given(teamService.changeProfileInfo(any(), any(), any())).willReturn(changeTeamInfoResponse);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/team/info")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                     .andExpect(jsonPath("$.data.name").value("teamName"))
//                     .andExpect(jsonPath("$.data.content").value("content"))
//                     .andDo(document("team-change-teamInfo",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("teamId").description("팀 아이디"),
//                                     fieldWithPath("name").description("팀 이름"),
//                                     fieldWithPath("content").description("팀 설명")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data.content").description("팀 이름"),
//                                     fieldWithPath("data.name").description("팀 설명")
//                             )
//                     ));
//
//    }
//
//    private ChangeTeamInfoResponse makeChangeProfileInfo() {
//        ChangeTeamInfoResponse changeTeamInfoResponse = new ChangeTeamInfoResponse();
//        changeTeamInfoResponse.setContent("content");
//        changeTeamInfoResponse.setName("teamName");
//        return changeTeamInfoResponse;
//    }
//
//    private TeamProfileRequest makeTeamProfileRequest() {
//        TeamProfileRequest teamProfileRequest = new TeamProfileRequest();
//        teamProfileRequest.setTeamId(1L);
//        teamProfileRequest.setContent("content");
//        teamProfileRequest.setName("teamName");
//        return teamProfileRequest;
//    }
//
//    @Test
//    @DisplayName("팀 초대링크로 팀 아이디 조회")
//    void getTeamIdByInviteLink() throws  Exception {
//        //given
//        String inviteLink = "link";
//        Long teamId = 1L;
//        given(teamService.getTeamIdByInviteLink(any())).willReturn(teamId);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/team/{invite-link}", inviteLink);
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                     .andExpect(jsonPath("$.data").value(teamId))
//                     .andDo(document("team-get-id-by-inviteLink",
//                             preprocessResponse(prettyPrint()),
//                             pathParameters(
//                                     parameterWithName("invite-link").description("팀의 초대 링크")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("팀 아이디")
//                             )
//                     ));
//    }
//
//
//
//    @Test
//    @DisplayName("대표 아이콘 설정 성공")
//    void changeRepIconSuccess() throws Exception {
//        //given
//        String repIcon = "repIcon";
//        TeamIconResponse teamIconResponse = makeTeamIconResponse();
//        String body = (new ObjectMapper()).writeValueAsString(teamIconResponse);
//        given(teamService.setRepIcon(any(), any())).willReturn(repIcon);
//
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/team/rep-icon")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                     .andExpect(jsonPath("$.data").value(repIcon))
//                     .andDo(document("team-set-repIcon",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("teamId").description("팀 아이디"),
//                                     fieldWithPath("iconName").description("설정할 아이콘")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("변경된 대표 아이콘")
//                             )
//                     ));
//    }
//
//    @Test
//    @DisplayName("팀 대표 아이콘 설정 실패")
//    void changeRepIconFail() throws Exception {
//        //given
//        TeamIconResponse teamIconResponse = makeTeamIconResponse();
//        String body = (new ObjectMapper()).writeValueAsString(teamIconResponse);
//        given(teamService.setRepIcon(any(), any())).willThrow(NoSuchElementException.class);
//
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/team/rep-icon")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isBadRequest());
//    }
//
//    @Test
//    @DisplayName("팀 아이콘 리스트 조회")
//    void getAllIcon() throws Exception {
//        //given
//        String iconName1 = "iconName1";
//        String iconName2 = "iconName2";
//
//        List<String> icons = new ArrayList<>();
//        icons.add(iconName1);
//        icons.add(iconName2);
//        Long teamId = 1L;
//
//        given(teamService.getAllIcon(any())).willReturn(icons);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/team/icons/{team-id}", teamId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                     .andExpect(jsonPath("$.data.[0]").value(iconName1))
//                     .andExpect(jsonPath("$.data.[1]").value(iconName2))
//                     .andDo(document("team-get-icons",
//                             preprocessResponse(prettyPrint()),
//                             pathParameters(
//                                     parameterWithName("team-id").description("팀 아이디")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data.[]").description("아이콘 리스트")
//                             )
//                     ));
//    }
//
//    @Test
//    @DisplayName("팀 아이콘 추가")
//    void addIcon() throws Exception {
//        //given
//        String addIcon = "newIcon";
//        TeamIconResponse teamIconResponse = makeTeamIconResponse();
//        String body = (new ObjectMapper()).writeValueAsString(teamIconResponse);
//        given(teamService.addIcon(any(), any())).willReturn(addIcon);
//
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/team/icon")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                     .andExpect(jsonPath("$.data").value(addIcon))
//                     .andDo(document("team-add-Icon",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("teamId").description("팀 아이디"),
//                                     fieldWithPath("iconName").description("추가할 아이콘")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("추가된 아이콘")
//                             )
//                     ));
//    }
//
//
//    @Test
//    @DisplayName("팀 초대 링크 조회")
//    void getInviteLink() throws Exception{
//        //given
//        Long teamId = 1L;
//        String inviteLink = "Aa5";
//        given(teamService.getInviteLink(any())).willReturn(inviteLink);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/team/invite-link/{team-id}", teamId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                     .andExpect(jsonPath("$.data").value(inviteLink))
//                     .andDo(document("team-get-invite-link",
//                             preprocessResponse(prettyPrint()),
//                             pathParameters(
//                                     parameterWithName("team-id").description("팀 아이디")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("초대 링크")
//                             )
//                     ));
//    }
//
//    @Test
//    @DisplayName("그룹명 중복시 DUPLICATE 메시지 반환")
//    void checkTeamNameDuplicatedReturnDUPLICATE() throws Exception {
//        //given
//        String teamName = "작심삼일";
//        given(teamService.isNameDuplicate(any(String.class))).willReturn(true);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/team/duplicate/{name}", teamName);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data").value("DUPLICATE"))
//                .andDo(document("check-team-name-duplicate",
//                        preprocessResponse(prettyPrint()),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data").description("중복 여부")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("그룹명 중복안되면 NON-DUPLICATE 메시지 반환")
//    void checkTeamNameDuplicatedReturnNONDUPLICATE() throws Exception {
//        //given0
//        String teamName = "작심삼일";
//        given(teamService.isNameDuplicate(any(String.class))).willReturn(false);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/team/duplicate/{name}", teamName);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data").value("NON-DUPLICATE"));
//    }
//
//    private TeamIconResponse makeTeamIconResponse() {
//        TeamIconResponse teamIconResponse = new TeamIconResponse();
//        teamIconResponse.setTeamId(1L);
//        teamIconResponse.setIconName("newIcon");
//        return teamIconResponse;
//    }
//}