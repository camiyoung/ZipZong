package zipzong.zipzong.dto.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberResponse {
    String name;
    String email;
    String provider;
    String nickname;
}
