package jibjoong.jibjoong.api.dto.team.request;

import lombok.Data;

@Data
public class CreateTeamRequest {
    String name;
    String content;
    String repIcon;
    Long memberId;
}
