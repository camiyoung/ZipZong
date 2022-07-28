package zipzong.zipzong.api.dto.member;

import lombok.Data;
import zipzong.zipzong.enums.Role;

import java.time.LocalDateTime;

@Data
public class MemberInfoRequest {
    String repIcon;
    String name;
    String nickname;
    LocalDateTime createdAt;
    Role role;
}
