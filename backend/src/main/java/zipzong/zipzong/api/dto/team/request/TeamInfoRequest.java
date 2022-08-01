package zipzong.zipzong.api.dto.team.request;

import lombok.Data;
import zipzong.zipzong.api.dto.team.request.member.MemberInfoRequest;

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
