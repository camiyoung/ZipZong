package jibjoong.jibjoong.config.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@EnableWebSecurity //spring security 설정을 활성화시켜주는 어노테이션
@RequiredArgsConstructor //final 필드 생성자 만들어줌
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    // @author 황승주
    private final OAuthService oAuthService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()//csrf 공격을 막아주는 옵션을 disable, rest api같은 경우에는 브라우저를 통해 request 받지 않기 때문에 해당 옵션을 꺼도 됩니다.
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .logout().logoutSuccessUrl("/") //logout 요청시 홈으로 이동 - 기본 logout url = "/logout"
                .and()
                .oauth2Login() //OAuth2 로그인 설정 시작점
                .defaultSuccessUrl("/api/oauth/info", true) //OAuth2 성공시 redirect(토큰 생성)
                .userInfoEndpoint() //OAuth2 로그인 성공 이후 사용자 정보를 가져올 때 설정 담당
                .userService(oAuthService); //OAuth2 로그인 성공 시, 작업을 진행할 MemberService
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("http://localhost:3000");
        configuration.addAllowedOriginPattern("http://localhost:8080");
        configuration.addAllowedOriginPattern("http://i7a805.p.ssafy.io:8080");
        configuration.addAllowedOriginPattern("https://i7a805.p.ssafy.io:8080");
        configuration.addAllowedOriginPattern("http://i7a805.p.ssafy.io:3000");
        configuration.addAllowedOriginPattern("https://i7a805.p.ssafy.io:3000");
        configuration.addAllowedOriginPattern("https://i7a805.p.ssafy.io");
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
