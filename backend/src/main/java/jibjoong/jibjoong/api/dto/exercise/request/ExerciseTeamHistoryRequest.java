package jibjoong.jibjoong.api.dto.exercise.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExerciseTeamHistoryRequest {
    Long teamId;
    int year;
    int month;
}
