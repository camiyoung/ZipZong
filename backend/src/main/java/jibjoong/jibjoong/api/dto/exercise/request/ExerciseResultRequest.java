package jibjoong.jibjoong.api.dto.exercise.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExerciseResultRequest {
    Long teamId;
    List<PersonalResult> personalResults;

    @Getter
    @Setter
    public static class PersonalResult {
        Long memberId;
        List<PersonalResultDetail> personalResultDetails;
    }

    @Getter
    @Setter
    public static class PersonalResultDetail {
        String exerciseName;
        int performNum;
        int targetNum;
    }
}



/*
{
    groupId: Long
    personalResults :
    [
         {
            memberId: int
            personalResultDetails: [
                {
                    exerciseName: String
                    performNum: int
                    targetNum: int
                }, ...
            ]
        }, ...
    ]
    restTime: int
}
 */


