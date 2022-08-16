package jibjoong.jibjoong.api.dto.exercise.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExerciseMemberTotalResponse {
    List<PerformMemberTotal> performMemberTotals;
    int currentStrick;
    int totalTime;

    @Getter
    @Setter
    public static class PerformMemberTotal {
        String performName;
        int performTotal;
    }
}
