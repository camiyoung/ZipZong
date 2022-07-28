package zipzong.zipzong.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriComponentsBuilder;
import zipzong.zipzong.config.jwt.Jwt;
import zipzong.zipzong.config.jwt.JwtService;
import zipzong.zipzong.db.domain.Member;
import zipzong.zipzong.db.repository.memberteam.MemberRepository;

import java.util.Map;
import java.util.NoSuchElementException;

@Controller
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuthController {
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    static final String SUCCESS = "success";

    @GetMapping("/info")
    public String createToken(Authentication authentication) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        Member member = getAuthMember(attributes);

        Jwt token = jwtService.generateToken(member.getEmail(), member.getProvider(), member.getName());

        member.setRefreshToken(token.getRefreshToken());

        String accessTokenExpiration = jwtService.dateToString(token.getAccessToken());
        String refreshTokenExpiration = jwtService.dateToString(token.getRefreshToken());

        return "redirect:" + UriComponentsBuilder.fromUriString("http://localhost:3000/login")
                                                 .queryParam("accessToken", token.getAccessToken())
                                                 .queryParam("refreshToken", token.getRefreshToken())
                                                 .queryParam("accessTokenExpiration", accessTokenExpiration)
                                                 .queryParam("refreshTokenExpiration", refreshTokenExpiration)
                                                 .queryParam("memberId", member.getId())
                                                 .build()
                                                 .toUriString();

    }

    private Member getAuthMember(Map<String, Object> attributes) {
        return memberRepository.findByEmailAndProvider((String) attributes.get("email"), (String) attributes.get("provider"))
                               .orElseThrow(() -> new NoSuchElementException("Member Not Found"));
    }
}
