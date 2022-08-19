//package jibjoong.jibjoong.config.jwt;
//
//import org.junit.jupiter.api.Test;
//import jibjoong.jibjoong.db.domain.Member;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//class JwtServiceTest {
//
//    private final JwtService jwtService = new JwtService();
//
//    @Test
//    void Token_생성() {
//
//        //given
//        Member testMember = makeMember("신슬기");
//
//        //when
//        Jwt token = jwtService.generateToken(testMember.getEmail(), testMember.getProvider(), testMember.getName());
//
//        //then
//        assertEquals(jwtService.getEmail(token.getRefreshToken()), testMember.getEmail());
//        assertEquals(jwtService.getProvider(token.getRefreshToken()), testMember.getProvider());
//        assertEquals(jwtService.getName(token.getRefreshToken()), testMember.getName());
//        assertEquals(jwtService.getEmail(token.getAccessToken()), testMember.getEmail());
//        assertEquals(jwtService.getProvider(token.getAccessToken()), testMember.getProvider());
//        assertEquals(jwtService.getName(token.getAccessToken()), testMember.getName());
//    }
//
//    @Test
//    void Token_유효기간확인() {
//
//        //given, when
//        String expiredToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2tlbiIsImVtYWlsIjoidGhpbnRoZXVsMzRAbmF2ZXIuY29tIiw" +
//                "icHJvdmlkZXIiOiJrYWthbyIsIm5hbWUiOiLsi6DsiqzquLAiLCJpYXQiOjE2NTgzNzM0MDIsImV4cCI6MTY1ODM3MzQwMn0.vp" +
//                "URSspz43SSgM7hH3uwfz9AdnpwP9YuxN8rxnHJgKI";
//
//        //then
//        assertFalse(jwtService.verifyToken(expiredToken));
//    }
//
//    @Test
//    void Token_유효성확인() {
//        //given
//        Member fakeMember = makeMember("신슬길");
//        Member testMember = makeMember("신슬기");
//
//        //when
//        Jwt fakeToken = jwtService.generateToken(fakeMember.getEmail(), fakeMember.getProvider(), fakeMember.getName());
//        Jwt testToken = jwtService.generateToken(testMember.getEmail(), testMember.getProvider(), testMember.getName());
//
//        //then
//        assertNotEquals(fakeToken.getAccessToken(), testToken.getAccessToken());
//        assertNotEquals(fakeToken.getRefreshToken(), testToken.getRefreshToken());
//    }
//
//    private Member makeMember(String name) {
//        return Member.builder()
//                .email("thintheul34@naver.com")
//                .provider("kakao")
//                .name(name)
//                .build();
//    }
//
//}