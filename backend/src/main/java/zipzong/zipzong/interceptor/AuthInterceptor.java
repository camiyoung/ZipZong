package zipzong.zipzong.interceptor;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import zipzong.zipzong.config.jwt.Jwt;
import zipzong.zipzong.config.jwt.JwtService;
import zipzong.zipzong.db.domain.Member;
import zipzong.zipzong.db.repository.memberteam.MemberRepository;
import zipzong.zipzong.exception.CustomException;
import zipzong.zipzong.exception.CustomExceptionList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.NoSuchElementException;


@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String accessToken = request.getHeader("accessToken");
        if (jwtService.verifyToken(accessToken)) {
            return true;
        }
        throw new CustomException(CustomExceptionList.ACCESS_TOKEN_ERROR);
    }
}
