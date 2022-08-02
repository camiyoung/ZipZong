package zipzong.zipzong.api.dto.ranking;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TeamRankingResponse {
    List<StrickRank> strickRanks;
    List<TimeRank> timeRanks;

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
