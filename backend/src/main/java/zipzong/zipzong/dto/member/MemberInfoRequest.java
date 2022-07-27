package zipzong.zipzong.dto.member;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberInfoRequest {
    String repIcon;
    String name;
    String nickname;
    LocalDateTime createdAt;
    Boolean isLeader;
}
