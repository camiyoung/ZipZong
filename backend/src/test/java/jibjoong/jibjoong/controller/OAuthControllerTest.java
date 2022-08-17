//package jibjoong.jibjoong.controller;
//
//import jibjoong.jibjoong.api.controller.OAuthController;
//import jibjoong.jibjoong.config.auth.OAuthService;
//import jibjoong.jibjoong.config.jwt.Jwt;
//import jibjoong.jibjoong.config.jwt.JwtService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.RequestBuilder;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import jibjoong.jibjoong.db.domain.Member;
//import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
//
//import java.util.Collections;
//import java.util.LinkedHashMap;
//import java.util.Map;
//import java.util.Optional;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
//import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//
//@WebMvcTest(OAuthController.class)
//@AutoConfigureRestDocs
//@MockBean(JpaMetamodelMappingContext.class)
//class OAuthControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//    @MockBean
//    private JwtService jwtService;
//
//    @MockBean
//    private MemberRepository memberRepository;
//    @MockBean
//    private OAuthService oAuthService;
//
//    static final String DATE_FORMAT = "yyyy-MM-dd-HH-mm-ss";
//
//    @Test
//    void OAuth_로그인() throws Exception {
//        //given
//        DefaultOAuth2User user = makeDefaultOAuth2User();
//        Authentication authentication = new UsernamePasswordAuthenticationToken(user, "password", user.getAuthorities());
//
//        given(memberRepository.findByEmailAndProvider(any(), any())).willReturn(makeMember());
//        given(jwtService.generateToken(any(), any(), any())).willReturn(makeJwt());
//        given(jwtService.dateToString(any())).willReturn(DATE_FORMAT);
//
//        //when
//        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/oauth/info")
//                                                              .with(authentication(authentication));
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().is3xxRedirection())
//                     .andDo(document("login",
//                             preprocessResponse(prettyPrint()),
//                             responseHeaders(
//                                     headerWithName("Location").description("redirect url")
//                             )));
//    }
//
//
//    private Jwt makeJwt() {
//        String token = "header.payload.signature";
//        return new Jwt(token, token);
//    }
//
//    private Optional<Member> makeMember() {
//        Member member = Member
//                .builder()
//                .name("김준우")
//                .email("bababrll@naver.com")
//                .provider("naver")
//                .repIcon("repIcon")
//                .id(1L)
//                .build();
//
//        return Optional.of(member);
//    }
//
//    private DefaultOAuth2User makeDefaultOAuth2User() {
//        //{sub=107986715009708108628, provider=google, name=김준우, email=bababrll@naver.com}
//        Map<String, Object> customAttribute = new LinkedHashMap<>();
//        customAttribute.put("sub", "107986715009708108628");
//        customAttribute.put("provider", "google");
//        customAttribute.put("name", "김준우");
//        customAttribute.put("email", "bababrll@naver.com");
//
//        return new DefaultOAuth2User(
//                Collections.singleton(new SimpleGrantedAuthority("USER")),
//                customAttribute,
//                "sub");
//    }
//
//}
