package jibjoong.jibjoong.api.dto.team.request.member;

import jibjoong.jibjoong.enums.Role;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberInfoRequest {
    Long memberId;
    String repIcon;
    String name;
    String nickname;
    LocalDateTime createdAt;
    Role role;
}
