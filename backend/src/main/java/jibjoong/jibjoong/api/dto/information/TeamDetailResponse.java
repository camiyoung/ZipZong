package jibjoong.jibjoong.api.dto.information;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class TeamDetailResponse {
    String teamName;
    String teamIcon;
    LocalDate createDate;
    int currentStrick;
    int maximumStrick;
    int totalTime;
    String teamLeader;
    List<String> teamMembers;
    String content;
}
