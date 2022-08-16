package jibjoong.jibjoong.api.dto.exercise.response;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ExerciseTeamHistoryResponse {
    private List<DailyHistory> dailyHistories;

    @Getter
    @Setter
    public static class DailyHistory
    {
        private int day;
        private int totalTime;
        private String state;
        private List<Perform> performs;
    }

    @Getter
    @Setter
    @RequiredArgsConstructor
    public static class Perform {
        private String performName;
        private int performNum;
        private int performTime;

        @Builder
        public Perform (String performName, int performNum, int performTime) {
            this.performName = performName;
            this.performNum = performNum;
            this.performTime = performTime;
        }
    }
}
