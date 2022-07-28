package zipzong.zipzong.dto.team;

import lombok.Data;

@Data
public class CreateTeamRequest {
    String name;
    String content;
    String repIcon;
    Long memberId;
}
