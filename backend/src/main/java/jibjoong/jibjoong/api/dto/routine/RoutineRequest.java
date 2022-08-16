package jibjoong.jibjoong.api.dto.routine;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RoutineRequest {
    private String routineName;
    private List<RoutineExercise> exercise;
    private int breakTime;
    private int totalTime;

    @Getter
    @Setter
    @NoArgsConstructor
    static public class RoutineExercise {
        String name;
        int count;

        public RoutineExercise(String name, int count) {
            this.name = name;
            this.count = count;
        }


    }

    @Builder
    public RoutineRequest(String routineName, List<RoutineExercise> exercise, int breakTime, int totalTime) {
        this.routineName = routineName;
        this.exercise = exercise;
        this.breakTime = breakTime;
        this.totalTime = totalTime;
    }
}


