package jibjoong.jibjoong.interceptor;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;
    private final MemberInterceptor memberInterceptor;
    private final TeamInterceptor teamInterceptor;
    private final TeamLeaderInterceptor teamLeaderInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry interceptorRegistry) {

        interceptorRegistry.addInterceptor(authInterceptor)
                .addPathPatterns("/**");
                // 팀 초대 링크로 팀 아이디 조회
                //.excludePathPatterns("**/team/invite-link/**", "**/registration/team/**");
//        interceptorRegistry.addInterceptor(memberInterceptor)
//                //.addPathPatterns("/**");
//                .excludePathPatterns("/**");
//        interceptorRegistry.addInterceptor(teamInterceptor)
//                //.addPathPatterns("/**");
//                .excludePathPatterns("/**");
//        interceptorRegistry.addInterceptor(teamLeaderInterceptor)
//                //.addPathPatterns("/**");
//                .excludePathPatterns("/**");
    }
}
