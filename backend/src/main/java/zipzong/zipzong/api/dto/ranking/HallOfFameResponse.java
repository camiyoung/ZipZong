package zipzong.zipzong.api.dto.ranking;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class HallOfFameResponse {
    List<HallOfFame> hallOfFames;
    List<StrickRank> strickRanks;
    List<TimeRank> timeRanks;

    @Getter
    @Setter
    public static class HallOfFame {
        int rank;
        String teamIcon;
        String teamName;
        int satisfiedTime;
    }

    @Getter
    @Setter
    public static class StrickRank {
        int rank;
        String teamIcon;
        String teamName;
        int maxStrick;
    }

    @Getter
    @Setter
    public static class TimeRank {
        int rank;
        String teamIcon;
        String teamName;
        int totalTime;
    }
}
