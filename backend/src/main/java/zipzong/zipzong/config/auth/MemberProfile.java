package zipzong.zipzong.config.auth;

import lombok.Getter;
import lombok.Setter;
import zipzong.zipzong.db.domain.Member;

@Getter
@Setter
public class MemberProfile {
    private String name;
    private String email;
    private String provider;
    private String nickname;

    public Member toMember() {
        return Member.builder()
                     .name(name)
                     .email(email)
                     .provider(provider)
                     .build();
    }

}
