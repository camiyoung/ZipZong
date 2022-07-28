package zipzong.zipzong.dto.team;

import lombok.Data;
import zipzong.zipzong.dto.member.MemberInfoRequest;

import java.util.List;

@Data
public class TeamInfoRequest {
    List<String> icons;
    String name;
    String content;
    String repIcons;
    int shieldCount;
    List<MemberInfoRequest> members;
}
