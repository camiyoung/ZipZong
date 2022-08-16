package jibjoong.jibjoong.api.dto.information;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDetailResponse {
    String nickname;
    String memberIcon;
    int currentStrick;
    int maximumStrick;
    int totalTime;
}
