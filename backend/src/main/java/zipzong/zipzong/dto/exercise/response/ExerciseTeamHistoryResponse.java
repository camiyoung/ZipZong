package zipzong.zipzong.dto.exercise.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExerciseTeamHistoryResponse {
    private int totalTime;
    private List<Perform> performs;

    @Getter
    @Setter
    public static class Perform {
        private String performName;
        private int performNum;
        private int performTime;
    }
}
