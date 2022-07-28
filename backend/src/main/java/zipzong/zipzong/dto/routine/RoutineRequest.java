package zipzong.zipzong.dto.routine;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RoutineRequest {
    private String routineName;
    private List<RoutineExercise> exercise;
    private int breakTime;
    private int totalTime;

    @Getter
    @Setter
    static public class RoutineExercise {
        String name;
        int count;
    }
}


