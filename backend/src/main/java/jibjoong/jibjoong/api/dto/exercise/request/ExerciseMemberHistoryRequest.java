package jibjoong.jibjoong.api.dto.exercise.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExerciseMemberHistoryRequest {
    Long memberId;
    int year;
    int month;
}
