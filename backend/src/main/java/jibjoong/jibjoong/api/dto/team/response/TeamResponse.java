package jibjoong.jibjoong.api.dto.team.response;

import lombok.Data;

@Data
public class TeamResponse {
    String teamName;
    String icon;
    Long groupId;
    int count;
}
