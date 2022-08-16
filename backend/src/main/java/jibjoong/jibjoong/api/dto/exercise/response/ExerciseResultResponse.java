package jibjoong.jibjoong.api.dto.exercise.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExerciseResultResponse {
    private List<PersonalPercentage> personalPercentages;
    private int avgPercentage;

    @Getter
    @Setter
    public static class PersonalPercentage {
        private String nickname;
        private int percentage;
    }
}


