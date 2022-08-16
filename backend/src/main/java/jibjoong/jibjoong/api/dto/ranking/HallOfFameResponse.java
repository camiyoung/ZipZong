package jibjoong.jibjoong.api.dto.ranking;

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
    List<PersonalStrickRank> personalStrickRanks;
    List<PersonalTimeRank> personalTimeRanks;

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

    @Getter
    @Setter
    public static class PersonalStrickRank {
        int rank;
        String memberIcon;
        String nickName;
        int maxStrick;
    }

    @Getter
    @Setter
    public static class PersonalTimeRank {
        int rank;
        String memberIcon;
        String nickName;
        int totalTime;
    }
}
