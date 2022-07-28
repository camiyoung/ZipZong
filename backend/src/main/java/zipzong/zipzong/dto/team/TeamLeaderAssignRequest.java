package zipzong.zipzong.dto.team;

import lombok.Data;

@Data
public class TeamLeaderAssignRequest {
    Long leaderId;
    Long followerId;
    Long teamId;
}
