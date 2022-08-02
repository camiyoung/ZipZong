package zipzong.zipzong.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import zipzong.zipzong.exception.CustomException;
import zipzong.zipzong.exception.CustomExceptionList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
        memberRepository.save(member);
        String accessTokenExpiration = jwtService.dateToString(token.getAccessToken());
        String refreshTokenExpiration = jwtService.dateToString(token.getRefreshToken());

        return "redirect:" + UriComponentsBuilder.fromUriString("http://localhost:3000/login")
                                                 .queryParam("accessToken", token.getAccessToken())
                                                 .queryParam("refreshToken", token.getRefreshToken())
                                                 .queryParam("accessTokenExpiration", accessTokenExpiration)
                                                 .queryParam("refreshTokenExpiration", refreshTokenExpiration)
                                                 .queryParam("memberId", member.getId().toString())
                                                 .build()
                                                 .toUriString();

    }

    @GetMapping("/refresh")
    public ResponseEntity<String> checkRefreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = request.getHeader("refreshToken");

        if (!jwtService.verifyToken(refreshToken)) {
            throw new CustomException(CustomExceptionList.REFRESH_TOKEN_ERROR);
        }

        String email = jwtService.getEmail(refreshToken);
        String provider = jwtService.getProvider(refreshToken);
        String name = jwtService.getName(refreshToken);

        Member member = memberRepository.findByEmailAndProvider(email, provider)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));
        if(!member.getRefreshToken().equals(refreshToken)) {
            throw new CustomException(CustomExceptionList.REFRESH_TOKEN_ERROR);
        }
        // 이 함수는 리프레시 토큰 분해해서 여기 email하고 소셜플랫폼 가지고 회원을 찾는데 못찾는거같은데요

        Jwt token = jwtService.generateToken(email, provider, name);

        String accessTokenExpiration = jwtService.dateToString(token.getAccessToken());

        response.setHeader("accessToken", token.getAccessToken());
        response.setHeader("accessTokenExpiration", accessTokenExpiration);

        return new ResponseEntity<>("Refresh Token 일치", HttpStatus.OK);
    }

    private Member getAuthMember(Map<String, Object> attributes) {
        return memberRepository.findByEmailAndProvider((String) attributes.get("email"), (String) attributes.get("provider"))
                               .orElseThrow(() -> new NoSuchElementException("Member Not Found"));
    }
}
