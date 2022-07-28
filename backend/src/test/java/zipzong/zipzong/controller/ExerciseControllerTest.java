package zipzong.zipzong.controller;

import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import zipzong.zipzong.config.auth.OAuthService;
import zipzong.zipzong.config.jwt.JwtService;
import zipzong.zipzong.repository.MemberRepository;

@WebMvcTest(ExerciseController.class)
@AutoConfigureRestDocs
public class ExerciseControllerTest {
    @MockBean
    private OAuthService oAuthService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private MemberRepository memberRepository;


}
