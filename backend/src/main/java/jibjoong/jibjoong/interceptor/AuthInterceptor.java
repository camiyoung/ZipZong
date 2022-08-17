package jibjoong.jibjoong.interceptor;

import jibjoong.jibjoong.config.jwt.JwtService;
import jibjoong.jibjoong.exception.CustomException;
import jibjoong.jibjoong.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


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
        System.out.println("실행!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        throw new CustomException(CustomExceptionList.ACCESS_TOKEN_ERROR);
    }
}
