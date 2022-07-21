package zipzong.zipzong.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zipzong.zipzong.config.jwt.Jwt;
import zipzong.zipzong.config.jwt.JwtService;
import zipzong.zipzong.domain.Member;
import zipzong.zipzong.dto.common.BasicResponse;
import zipzong.zipzong.dto.member.MemberResponse;
import zipzong.zipzong.repository.MemberRepository;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuthController {
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    static final String SUCCESS = "success";

    @GetMapping("/info")
    public ResponseEntity createToken(Authentication authentication) {
        HttpHeaders responseHeader = new HttpHeaders();
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        Member member = getAuthMember(attributes);

        Jwt token = jwtService.generateToken(member.getEmail(), member.getProvider(), member.getName());

        member.setRefreshToken(token.getRefreshToken());
        memberRepository.save(member);

        String accessTokenExpiration = jwtService.dateToString(token.getAccessToken());
        String refreshTokenExpiration = jwtService.dateToString(token.getRefreshToken());

        responseHeader.add("accessToken", token.getAccessToken());
        responseHeader.add("refreshToken", token.getRefreshToken());
        responseHeader.add("accessTokenExpiration", accessTokenExpiration);
        responseHeader.add("refreshTokenExpiration", refreshTokenExpiration);

        return new ResponseEntity(makeBasicResponse(SUCCESS, member.toMemberResponse()), responseHeader, HttpStatus.OK);

    }

    private Member getAuthMember(Map<String, Object> attributes) {
        return memberRepository.findByEmailAndProvider((String) attributes.get("email"), (String) attributes.get("provider"))
                .orElseThrow(() -> new NoSuchElementException("Member Not Found"));
    }

    private BasicResponse<MemberResponse> makeBasicResponse(String message, MemberResponse data) {

        return BasicResponse
                .<MemberResponse>builder()
                .message(message)
                .data(data)
                .build();
    }
}
