package zipzong.zipzong.interceptor;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import zipzong.zipzong.config.jwt.Jwt;
import zipzong.zipzong.config.jwt.JwtService;
import zipzong.zipzong.db.domain.Member;
import zipzong.zipzong.db.repository.memberteam.MemberRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.NoSuchElementException;


@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String accessToken = request.getHeader("accessToken");
        if (jwtService.verifyToken(accessToken)) {
            return true;
        }
        String refreshToken = request.getHeader("refreshToken");
        if (!jwtService.verifyToken(refreshToken)) {
            return false;
        }
        String email = jwtService.getEmail(refreshToken);
        String provider = jwtService.getProvider(refreshToken);
        String name = jwtService.getName(refreshToken);

        Member member = memberRepository.findByEmailAndProvider(email, provider)
                .orElseThrow(() -> new NoSuchElementException("Member Not Found"));
        if (member.getRefreshToken().equals(refreshToken)) {
            Jwt token = jwtService.generateToken(email, provider, name);

            String accessTokenExpiration = jwtService.dateToString(token.getAccessToken());

            response.setHeader("accessToken", token.getAccessToken());
            response.setHeader("accessTokenExpiration", accessTokenExpiration);
            return true;
        }
        return false;
    }

}
