package zipzong.zipzong.dto.team;

import lombok.Data;

@Data
public class TeamProfileRequest {
    Long teamId;
    String name;
    String content;
}
