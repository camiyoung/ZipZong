package jibjoong.jibjoong.api.dto.team.request;

import lombok.Data;

@Data
public class TeamLeaderAssignRequest {
    Long leaderId;
    Long followerId;
    Long teamId;
}
