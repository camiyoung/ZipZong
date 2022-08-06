package zipzong.zipzong.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;
import zipzong.zipzong.api.controller.RankingController;
import zipzong.zipzong.api.service.RankingService;
import zipzong.zipzong.config.auth.OAuthService;
import zipzong.zipzong.config.jwt.JwtService;
import zipzong.zipzong.db.repository.memberteam.MemberRepository;

@WebMvcTest(RankingController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
public class RankingControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private OAuthService oAuthService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private MemberRepository memberRepository;

    @MockBean
    private RankingService rankingService;

}
