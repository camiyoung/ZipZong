package zipzong.zipzong.config.jwt;

import org.junit.jupiter.api.Test;
import zipzong.zipzong.domain.Member;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {


    private final JwtService jwtService = new JwtService();

    @Test
    void Token_생성() {

        //given
        Member testMember = Member.builder()
                .email("thintheul34@naver.com")
                .provider("kakao")
                .name("신슬기")
                .build();

        //when
        Jwt token = jwtService.generateToken(testMember.getEmail(), testMember.getProvider(), testMember.getName());

        //then
        assertEquals(jwtService.getEmail(token.getRefreshToken()), testMember.getEmail());
        assertEquals(jwtService.getProvider(token.getRefreshToken()), testMember.getProvider());
        assertEquals(jwtService.getName(token.getRefreshToken()), testMember.getName());
        assertEquals(jwtService.getEmail(token.getToken()), testMember.getEmail());
        assertEquals(jwtService.getProvider(token.getToken()), testMember.getProvider());
        assertEquals(jwtService.getName(token.getToken()), testMember.getName());
    }

    @Test
    void Token_유효기간확인() {

        //given, when
        String fakeToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2tlbiIsImVtYWlsIjoidGhpbnRoZXVsMzRAbmF2ZXIuY29tIiw" +
                "icHJvdmlkZXIiOiJrYWthbyIsIm5hbWUiOiLsi6DsiqzquLAiLCJpYXQiOjE2NTgzNzM0MDIsImV4cCI6MTY1ODM3MzQwMn0.vp" +
                "URSspz43SSgM7hH3uwfz9AdnpwP9YuxN8rxnHJgKI";

        //then
        assertFalse(jwtService.verifyToken(fakeToken));
    }

    @Test
    void Token_유효성확인() {
        //given
        Member fakeMember = Member.builder()
                .email("thintheul34@naver.com")
                .provider("kakao")
                .name("신슬길")
                .build();
        Member testMember = Member.builder()
                .email("thintheul34@naver.com")
                .provider("kakao")
                .name("신슬기")
                .build();

        //when
        Jwt fakeToken = jwtService.generateToken(fakeMember.getEmail(), fakeMember.getProvider(), fakeMember.getName());
        Jwt testToken = jwtService.generateToken(testMember.getEmail(), testMember.getProvider(), testMember.getName());

        //then
        assertNotEquals(fakeToken.getToken(),testToken.getToken());
        assertNotEquals(fakeToken.getRefreshToken(),testToken.getRefreshToken());
    }

}