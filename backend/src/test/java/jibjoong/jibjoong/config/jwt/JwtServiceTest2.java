//package jibjoong.jibjoong.config.jwt;
//
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.Test;
//import jibjoong.jibjoong.db.domain.Member;
//
//
//class JwtServiceTest2 {
//    final JwtService jwtService = new JwtService();
//
//    @Test
//    void 토큰_null일때_검증(){
//        //given
//        String token = null;
//        //when
//        boolean result = jwtService.verifyToken(token);
//        //then
//        Assertions.assertThat(result).isEqualTo(false);
//    }
//
//    @Test
//    void 토큰_신뢰성_검증() {
//        //given
//        Member member = makeMember();
//
//        Jwt tokens = jwtService.generateToken(member.getEmail(), member.getProvider(), member.getName());
//        String accessToken = tokens.getAccessToken();
//        String refreshToken = tokens.getRefreshToken();
//
//        //when
//        String accessEmail = jwtService.getEmail(accessToken);
//        String accessProvider = jwtService.getProvider(accessToken);
//        String accessName = jwtService.getName(accessToken);
//        String refreshEmail = jwtService.getEmail(refreshToken);
//        String refreshProvider = jwtService.getProvider(refreshToken);
//        String refreshName = jwtService.getName(refreshToken);
//
//        boolean prepareEmail = accessEmail.equals(refreshEmail);
//        boolean prepareProvider = accessProvider.equals(refreshProvider);
//        boolean prepareName = accessName.equals(refreshName);
//        boolean prepareEmail2 = accessEmail.equals("platinadark@gmail.com");
//        boolean prepareProvider2 = accessProvider.equals("Google");
//        boolean prepareName2 = accessName.equals("황승주");
//
//        //then
//        Assertions.assertThat(prepareEmail).isEqualTo(true);
//        Assertions.assertThat(prepareProvider).isEqualTo(true);
//        Assertions.assertThat(prepareName).isEqualTo(true);
//
//        Assertions.assertThat(prepareEmail2).isEqualTo(true);
//        Assertions.assertThat(prepareProvider2).isEqualTo(true);
//        Assertions.assertThat(prepareName2).isEqualTo(true);
//    }
//
//    @Test
//    void 토큰_유효시간_검증() {
//        //given
//        Member member = makeMember();
//
//        Jwt tokens = jwtService.generateToken(member.getEmail(), member.getProvider(), member.getName());
//        String accessToken = "MODIFIED_TOKEN";
//        String refreshToken = tokens.getRefreshToken();
//
//        //when
//        boolean error_result = jwtService.verifyToken(accessToken);
//        boolean normal_result = jwtService.verifyToken(refreshToken);
//
//        //then
//        Assertions.assertThat(error_result).isEqualTo(false);
//        Assertions.assertThat(normal_result).isEqualTo(true);
//
//    }
//
//    private Member makeMember(){
//        return Member.builder()
//                .name("황승주")
//                .provider("Google")
//                .email("platinadark@gmail.com")
//                .build();
//    }
//
//}