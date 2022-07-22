package zipzong.zipzong.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import zipzong.zipzong.config.auth.OAuthService;
import zipzong.zipzong.config.jwt.Jwt;
import zipzong.zipzong.config.jwt.JwtService;
import zipzong.zipzong.domain.Member;
import zipzong.zipzong.repository.MemberRepository;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/*
@WebMvcTest(OAuthController.class)
@AutoConfigureRestDocs
class OAuthControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private JwtService jwtService;

    @MockBean
    private MemberRepository memberRepository;
    @MockBean
    private OAuthService oAuthService;

    static final String DATE_FORMAT = "yyyy-MM-dd-HH-mm-ss";
    @Test
    void Oauth_로그인() throws Exception {
        //given
        DefaultOAuth2User user = makeDefaultOAuth2User();
        Authentication authentication = new UsernamePasswordAuthenticationToken(user, "password", user.getAuthorities());

        given(memberRepository.findByEmailAndProvider(any(), any())).willReturn(makeMember());
        given(jwtService.generateToken(any(),any(),any())).willReturn(makeJwt());
        given(jwtService.dateToString(any())).willReturn(DATE_FORMAT);

        //when
        ResultActions resultActions = mockMvc.perform(get("/oauth/info")
                .with(authentication(authentication))
        );

        //then
        resultActions.andExpect(status().isOk())
                .andDo(document("login",
                        preprocessResponse(prettyPrint()),
                        responseHeaders(
                                headerWithName("accessToken").description("인증토큰"),
                                headerWithName("refreshToken").description("갱신토큰"),
                                headerWithName("accessTokenExpiration").description("인증토큰 만료일"),
                                headerWithName("refreshTokenExpiration").description("갱신토큰 만료일")
                        ),
                        responseFields(
                                fieldWithPath("message").description("응답 메시지"),
                                fieldWithPath("data.name").description("사용자 이름"),
                                fieldWithPath("data.email").description("사용자 이메일"),
                                fieldWithPath("data.provider").description("로그인 제공사"),
                                fieldWithPath("data.nickname").description("사용자 닉네임")
                        )
                ));

    }

    private Jwt makeJwt() {
        String token = "header.payload.signature";
        return new Jwt(token,token);
    }

    private Optional<Member> makeMember() {
        Member member = Member
                .builder()
                .name("김준우")
                .email("bababrll@naver.com")
                .provider("naver")
                .build();

        return Optional.of(member);
    }

    private DefaultOAuth2User makeDefaultOAuth2User() {
        //{sub=107986715009708108628, provider=google, name=김준우, email=bababrll@naver.com}
        Map<String, Object> customAttribute = new LinkedHashMap<>();
        customAttribute.put("sub", "107986715009708108628");
        customAttribute.put("provider", "google");
        customAttribute.put("name", "김준우");
        customAttribute.put("email", "bababrll@naver.com");

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("USER")),
                customAttribute,
                "sub");
    }

}
*/