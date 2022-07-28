package zipzong.zipzong.controller;

import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import zipzong.zipzong.api.controller.ExerciseController;
import zipzong.zipzong.config.auth.OAuthService;
import zipzong.zipzong.config.jwt.JwtService;
import zipzong.zipzong.db.repository.memberteam.MemberRepository;

@WebMvcTest(ExerciseController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
public class ExerciseControllerTest {
    @MockBean
    private OAuthService oAuthService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private MemberRepository memberRepository;


}
