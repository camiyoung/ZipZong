package jibjoong.jibjoong.api.dto.team.request.member;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class MemberResponse {
    String name;
    String email;
    String provider;
    String nickname;
    String repIcon;
}
