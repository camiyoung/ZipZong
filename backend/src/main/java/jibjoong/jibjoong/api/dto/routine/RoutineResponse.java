package jibjoong.jibjoong.api.dto.routine;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class RoutineResponse {

    private String routineName;
    private Long routineId;
    private List<RoutineExercise> exercise;
    private int breakTime;
    private int totalTime;

    @Getter
    static public class RoutineExercise {
        String name;
        int count;

        public RoutineExercise(String name, int count) {
            this.name = name;
            this.count = count;
        }

    }

    @Builder
    public RoutineResponse(String routineName, Long routineId, List<RoutineExercise> exercise, int breakTime, int totalTime) {
        this.routineName = routineName;
        this.routineId = routineId;
        this.exercise = exercise;
        this.breakTime = breakTime;
        this.totalTime = totalTime;
    }

    public static RoutineResponse createRoutineResponse(String routineName, Long routineId, List<RoutineExercise> exercise, int breakTime, int totalTime) {
        RoutineResponse routineResponse = RoutineResponse.builder()
                .routineName(routineName)
                .routineId(routineId)
                .exercise(exercise)
                .breakTime(breakTime)
                .totalTime(totalTime)
                .build();
        return routineResponse;
    }

}


