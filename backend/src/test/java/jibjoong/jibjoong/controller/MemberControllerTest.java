//package jibjoong.jibjoong.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jibjoong.jibjoong.api.controller.MemberController;
//import jibjoong.jibjoong.api.dto.icon.IconResponse;
//import jibjoong.jibjoong.api.dto.nickname.NicknameSetResponse;
//import jibjoong.jibjoong.api.service.MemberService;
//import jibjoong.jibjoong.config.auth.OAuthService;
//import jibjoong.jibjoong.config.jwt.JwtService;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.RequestBuilder;
//import org.springframework.test.web.servlet.ResultActions;
//import jibjoong.jibjoong.db.domain.Member;
//import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.NoSuchElementException;
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
//
//@AutoConfigureRestDocs
//@WebMvcTest(MemberController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//class MemberControllerTest {
//
//    @Autowired
//    MockMvc mockMvc;
//
//    @MockBean
//    private MemberService memberService;
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
//    @DisplayName("닉네임으로 회원 정보 조회 성공")
//    void getMemberInfoByNicknameSuccess() throws Exception {
//        //given
//        String nickname = "JunWoo";
//        Member member = makeMember(nickname);
//        given(memberService.getUserInfo(any(String.class))).willReturn(member);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/member/info/{nickname}", nickname);
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        resultActions.andExpect(status().isOk())
//                     .andExpect(jsonPath("$.data.nickname").value(nickname))
//                     .andDo(document("get-member-info-by-nickname",
//                             preprocessResponse(prettyPrint()),
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data.name").description("회원 이름"),
//                                     fieldWithPath("data.email").description("회원 이메일"),
//                                     fieldWithPath("data.provider").description("이메일 제공자"),
//                                     fieldWithPath("data.nickname").description("회원 닉네임"),
//                                     fieldWithPath("data.repIcon").description("대표 아이콘")
//                             )
//                     ));
//    }
//
//    @Test
//    @DisplayName("닉네임으로 회원 정보 조회 실패")
//    void getMemberInfoByNicknameFail() throws Exception {
//        //given
//        String nickname = "JunWoo";
//        Member member = makeMember(nickname);
//        given(memberService.getUserInfo(any(String.class))).willThrow(NoSuchElementException.class);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/member/info/{nickname}", nickname);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        resultActions.andExpect(status().isBadRequest());
//    }
//
//    @Test
//    @DisplayName("닉네임 중복시 DUPLICATE 메시지 반환")
//    void checkNicknameDuplicatedReturnDUPLICATE() throws Exception {
//        //given
//        String nickname = "JunWoo";
//        given(memberService.isNicknameDuplicate(any(String.class))).willReturn(true);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/member/duplicate/{nickname}", nickname);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                     .andExpect(jsonPath("$.data").value("DUPLICATE"))
//                     .andDo(document("check-nickname-duplicate",
//                             preprocessResponse(prettyPrint()),
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("중복 여부")
//                             )
//                     ));
//    }
//
//    @Test
//    @DisplayName("닉네임 중복안되면 NON-DUPLICATE 메시지 반환")
//    void checkNicknameDuplicatedReturnNONDUPLICATE() throws Exception {
//        //given0
//        String nickname = "JunWoo";
//        given(memberService.isNicknameDuplicate(any(String.class))).willReturn(false);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/member/duplicate/{nickname}", nickname);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                     .andExpect(jsonPath("$.data").value("NON-DUPLICATE"));
//    }
//
//    @Test
//    @DisplayName("사용자 닉네임 설정 성공")
//    void setNicknameSuccess() throws Exception {
//        //given
//        String nickname = "JunWoo";
//        String body = "{\"memberId\" : \"1\", \"nickname\" : \"JunWoo\"}";
//        given(memberService.setNickName(any(NicknameSetResponse.class))).willReturn(makeMember(nickname));
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/member/nickname")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        resultActions.andExpect(status().isCreated())
//                     .andExpect(jsonPath("$.data.nickname").value("JunWoo"))
//                     .andDo(document("set-nickname",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("memberId").description("기존 아이디"),
//                                     fieldWithPath("nickname").description("설정할 닉네임")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data.name").description("회원 이름"),
//                                     fieldWithPath("data.email").description("회원 이메일"),
//                                     fieldWithPath("data.provider").description("이메일 제공자"),
//                                     fieldWithPath("data.nickname").description("회원 닉네임"),
//                                     fieldWithPath("data.repIcon").description("대표 아이콘")
//                             )
//                     ));
//
//
//    }
//
//    @Test
//    @DisplayName("사용자 닉네임 설정 실패 - 회원 아이디 조회 실패")
//    void setNicknameFail() throws Exception {
//        //given
//        String body = "{\"origin\" : \"origin\", \"nickname\" : \"JunWoo\"}";
//        given(memberService.setNickName(any(NicknameSetResponse.class))).willThrow(NoSuchElementException.class);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/member/nickname")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        resultActions.andExpect(status().isBadRequest());
//    }
//
//    @Test
//    @DisplayName("사용자 닉네임 설정 실패 - 동시성 이슈 발생")
//    void setNicknameFailWithConcurrency() throws Exception {
//        //given
//        String body = "{\"origin\" : \"origin\", \"nickname\" : \"JunWoo\"}";
//        given(memberService.setNickName(any(NicknameSetResponse.class))).willThrow(DataIntegrityViolationException.class);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/member/nickname")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        resultActions.andExpect(status().is4xxClientError());
//    }
//
//    @Test
//    @DisplayName("닉네임 변경 성공")
//    void changeNicknameSuccess() throws Exception {
//        //given
//        String nickname = "JunWoo";
//        String body = "{\"origin\" : \"origin\", \"nickname\" : \"JunWoo\"}";
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/member/nickname")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        resultActions.andExpect(status().isCreated())
//                     .andExpect(jsonPath("$.data").value(nickname))
//                     .andDo(document("change-nickname",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("origin").description("기존 닉네임"),
//                                     fieldWithPath("nickname").description("설정할 닉네임")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("회원 닉네임")
//                             )
//                     ));
//    }
//
//    @Test
//    @DisplayName("닉네임 변경 실패")
//    void changeNicknameFail() throws Exception {
//        //given
//        String nickname = "JunWoo";
//        given(memberService.updateNickName(any(), any())).willThrow(IllegalStateException.class);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/member/nickname")
//                                                                        .content("{\"origin\" : \"origin\", \"nickname\" : \"JunWoo\"}")
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isBadRequest());
//    }
//
//    @Test
//    @DisplayName("대표 아이콘 설정 성공")
//    void changeRepIconSuccess() throws Exception {
//        //given
//        String repIcon = "repIcon";
//        IconResponse iconResponse = makeIconResponse();
//        String body = (new ObjectMapper()).writeValueAsString(iconResponse);
//        given(memberService.setRepIcon(any(), any())).willReturn(repIcon);
//
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/member/rep-icon")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                     .andExpect(jsonPath("$.data").value(repIcon))
//                     .andDo(document("set-repIcon",
//                             preprocessRequest(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("nickname").description("회원 닉네임"),
//                                     fieldWithPath("icon").description("설정할 아이콘")
//                             ),
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("변경된 대표 아이콘")
//                             )
//                     ));
//    }
//
//
//    @Test
//    @DisplayName("대표 아이콘 설정 실패")
//    void changeRepIconFail() throws Exception {
//        //given
//        IconResponse iconResponse = makeIconResponse();
//        String body = (new ObjectMapper()).writeValueAsString(iconResponse);
//        given(memberService.setRepIcon(any(), any())).willThrow(NoSuchElementException.class);
//
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/member/rep-icon")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isBadRequest());
//    }
//
//    @Test
//    @DisplayName("회원 아이콘 리스트 조회")
//    void getAllIcon() throws Exception {
//        //given
//        String iconName1 = "iconName1";
//        String iconName2 = "iconName2";
//
//        List<String> icons = new ArrayList<>();
//        icons.add(iconName1);
//        icons.add(iconName2);
//        Long memberId = 1L;
//
//        given(memberService.getAllIcon(any())).willReturn(icons);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/member/icon/{member-id}", 1L);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                     .andExpect(jsonPath("$.data.[0]").value(iconName1))
//                     .andExpect(jsonPath("$.data.[1]").value(iconName2))
//                     .andDo(document("get-icons",
//                             preprocessRequest(prettyPrint()),
//                             pathParameters(
//                                     parameterWithName("member-id").description("회원 아이디")
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
//    @DisplayName("회원 아이콘 추가")
//    void addIcon() throws Exception {
//        //given
//        String addIcon = "newIcon";
//        IconResponse iconResponse = makeIconResponse();
//        String body = (new ObjectMapper()).writeValueAsString(iconResponse);
//        given(memberService.addIcon(any(), any())).willReturn(addIcon);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/member/icon")
//                                                                        .content(body)
//                                                                        .contentType(MediaType.APPLICATION_JSON);
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                     .andExpect(jsonPath("$.data").value(addIcon))
//                     .andDo(document("add-Icon",
//                             preprocessRequest(prettyPrint()),
//                             preprocessResponse(prettyPrint()),
//                             requestFields(
//                                     fieldWithPath("nickname").description("회원 닉네임"),
//                                     fieldWithPath("icon").description("추가할 아이콘")
//                             ),
//
//
//                             responseFields(
//                                     fieldWithPath("message").description("메시지"),
//                                     fieldWithPath("data").description("추가된 아이콘")
//                             )
//                     ));
//    }
//
//    @Test
//    @DisplayName("회원 탈퇴")
//    void removeUser() throws Exception {
//        //given
//        given(memberService.removeUser(anyLong())).willReturn(true);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/member/remove/{memberId}", 1L);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions
//                .andDo(document("remove-user",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("memberId").description("회원 아이디")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data").description("true: 성공, false: 그룹장인 그룹 존재")
//                        )
//                ));
//    }
//
//    private IconResponse makeIconResponse() {
//        IconResponse iconResponse = new IconResponse();
//        iconResponse.setIcon("icon");
//        iconResponse.setNickname("nickname");
//        return iconResponse;
//    }
//
//
//    private Member makeMember(String nickname) {
//        return Member.builder()
//                     .id(1L)
//                     .nickname(nickname)
//                     .provider("google")
//                     .email("bababrll@naver.com")
//                     .name("김준우")
//                     .repIcon("repIcon")
//                     .build();
//    }
//
//}