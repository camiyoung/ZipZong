package zipzong.zipzong.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import zipzong.zipzong.config.auth.OAuthService;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OAuthController.class)
class OAuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OAuthService oAuthService;

    @Test
    void Oauth_로그인() throws Exception {
        //given
        DefaultOAuth2User user = makeDefaultOAuth2User();
        Authentication authentication = new UsernamePasswordAuthenticationToken(user, "password", user.getAuthorities());

        //when
        ResultActions resultActions = mockMvc.perform(get("/oauth/loginInfo").with(authentication(authentication)));

        //then
        resultActions.andExpect(status().isOk());
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
