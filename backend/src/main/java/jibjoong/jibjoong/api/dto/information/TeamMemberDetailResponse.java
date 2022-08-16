package jibjoong.jibjoong.api.dto.information;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TeamMemberDetailResponse {
    String nickname;
    String memberIcon;
    LocalDate registrationDate;
    LocalDate lastExercised;
    int currentStrick;
    int maximumStrick;
    int totalTime;
}
