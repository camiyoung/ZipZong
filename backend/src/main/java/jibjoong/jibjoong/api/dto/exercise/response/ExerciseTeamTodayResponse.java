package jibjoong.jibjoong.api.dto.exercise.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExerciseTeamTodayResponse {
    List<NiceMember> niceMembers;

    @Getter
    @Setter
    public static class NiceMember {
        Long memberId;
        String nickName;
    }
}
