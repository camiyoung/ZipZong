package zipzong.zipzong.dto.team;

import lombok.Data;

@Data
public class TeamResponse {
    String teamName;
    String icon;
    Long groupId;
    int count;
}
