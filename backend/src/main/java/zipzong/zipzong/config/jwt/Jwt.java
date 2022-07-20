package zipzong.zipzong.config.jwt;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Jwt {
    private String token;
    private String refreshToken;

    public Jwt(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}