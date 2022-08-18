package jibjoong.jibjoong.interceptor;

import jibjoong.jibjoong.api.service.RegistrationService;
import jibjoong.jibjoong.config.jwt.JwtService;
import jibjoong.jibjoong.db.domain.Registration;
import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
import jibjoong.jibjoong.db.repository.memberteam.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import jibjoong.jibjoong.exception.CustomException;
import jibjoong.jibjoong.exception.CustomExceptionList;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class TeamInterceptor implements HandlerInterceptor {
    // @author 황승주

    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final RegistrationRepository registrationRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Map<String, String> pathVariables = (Map)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        String value = (String) pathVariables.get("teamId");

        String accessToken = request.getHeader("accessToken");
        String email = jwtService.getEmail(accessToken);
        String provider = jwtService.getProvider(accessToken);

        Long id = memberRepository.findByEmailAndProvider(email, provider).orElseThrow(
                () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
        ).getId();

        List<Registration> registrations = registrationRepository.findAllInTeamNoResigned(Long.parseLong(value));
        for(Registration registration : registrations) {
            if(Objects.equals(registration.getMember().getId(), id)) {
                return true;
            }
        }

        throw new CustomException(CustomExceptionList.NO_AUTHENTICATION_ERROR);
    }
}
