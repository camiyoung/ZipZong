package jibjoong.jibjoong.api.dto.exercise.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExerciseTeamTotalResponse {
    List<PerformTeamTotal> performTeamTotals;
    int currentStrick;

    @Getter
    @Setter
    public static class PerformTeamTotal {
        String performName;
        int performTotal;
    }
}
