package zipzong.zipzong.api.dto.ranking;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberRankingResponse {
    StrickRank strickRank;
    TimeRank timeRank;

    @Getter
    @Setter
    public static class StrickRank {
        List<StrickRankDetail> over;
        StrickRankDetail me;
        List<StrickRankDetail> under;
    }

    @Getter
    @Setter
    public static class StrickRankDetail {
        int rank;
        String memberIcon;
        String nickName;
        int maxStrick;
    }

    @Getter
    @Setter
    public static class TimeRank {
        List<TimeRankDetail> over;
        TimeRankDetail me;
        List<TimeRankDetail> under;
    }

    @Getter
    @Setter
    public static class TimeRankDetail {
        int rank;
        String memberIcon;
        String nickName;
        int totalTime;
    }
}
