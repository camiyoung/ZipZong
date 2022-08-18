package jibjoong.jibjoong.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriComponentsBuilder;
import jibjoong.jibjoong.config.jwt.Jwt;
import jibjoong.jibjoong.config.jwt.JwtService;
import jibjoong.jibjoong.db.domain.Member;
import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
import jibjoong.jibjoong.exception.CustomException;
import jibjoong.jibjoong.exception.CustomExceptionList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuthController {
    // @author 황승주
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    static final String SUCCESS = "success";

    @GetMapping("/info")
    public void createToken(HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        Member member = getAuthMember(attributes);

        Jwt token = jwtService.generateToken(member.getEmail(), member.getProvider(), member.getName());

        member.setRefreshToken(token.getRefreshToken());
        memberRepository.save(member);

        String accessTokenExpiration = jwtService.dateToString(token.getAccessToken());
        String refreshTokenExpiration = jwtService.dateToString(token.getRefreshToken());

        Boolean hasNickname = member.getNickname() == null ? false : true;

        String nickname;

        if(hasNickname) {
            nickname = member.getNickname();
        } else {
            nickname = "";
        }

        response.sendRedirect(UriComponentsBuilder.fromUriString("http://i7a805.p.ssafy.io/login")
                .queryParam("accessToken", token.getAccessToken())
                .queryParam("refreshToken", token.getRefreshToken())
                .queryParam("accessTokenExpiration", accessTokenExpiration)
                .queryParam("refreshTokenExpiration", refreshTokenExpiration)
                .queryParam("memberId", member.getId().toString())
                .queryParam("hasNickname", hasNickname.toString())
                .queryParam("nickname",nickname)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString());
//        return "redirect:" + UriComponentsBuilder.fromUriString("http://i7a805.p.ssafy.io/login")
//                                                 .queryParam("accessToken", token.getAccessToken())
//                                                 .queryParam("refreshToken", token.getRefreshToken())
//                                                 .queryParam("accessTokenExpiration", accessTokenExpiration)
//                                                 .queryParam("refreshTokenExpiration", refreshTokenExpiration)
//                                                 .queryParam("memberId", member.getId().toString())
//                                                 .queryParam("hasNickname", hasNickname.toString())
//                                                 .queryParam("nickname",nickname)
//                                                 .build()
//                                                 .encode(StandardCharsets.UTF_8)
//                                                 .toUriString();

    }
    // @author 황승주
    @GetMapping("/refresh")
    public ResponseEntity<Map<String, String>> checkRefreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = request.getHeader("refreshToken");

        if (!jwtService.verifyToken(refreshToken)) {
            throw new CustomException(CustomExceptionList.REFRESH_TOKEN_ERROR);
        }

        String email = jwtService.getEmail(refreshToken);
        String provider = jwtService.getProvider(refreshToken);
        String name = jwtService.getName(refreshToken);

        Member member = memberRepository.findByEmailAndProvider(email, provider)
                                        .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));
        if (!member.getRefreshToken()
                   .equals(refreshToken)) {
            throw new CustomException(CustomExceptionList.REFRESH_TOKEN_ERROR);
        }

        Jwt token = jwtService.generateToken(email, provider, name);

        String accessTokenExpiration = jwtService.dateToString(token.getAccessToken());

        Map<String, String> map = new HashMap<>();
        map.put("accessToken", token.getAccessToken());
        map.put("accessTokenExpiration", accessTokenExpiration);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    private Member getAuthMember(Map<String, Object> attributes) {
        return memberRepository.findByEmailAndProvider((String) attributes.get("email"), (String) attributes.get("provider"))
                               .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));
    }
}
