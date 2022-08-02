package zipzong.zipzong.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zipzong.zipzong.api.dto.ranking.HallOfFameResponse;
import zipzong.zipzong.api.dto.ranking.TeamRankingResponse;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RankingService {

    public List<HallOfFameResponse.HallOfFame> getHallOfFames() {

    }

    public List<HallOfFameResponse.StrickRank> getStrickRanks() {
    }

    public List<HallOfFameResponse.TimeRank> getTimeRanks() {
    }

    public List<TeamRankingResponse.StrickRank> getStrickRanks(Long teamId) {
    }

    public List<TeamRankingResponse.TimeRank> getTimeRanks(Long teamId) {
    }
}
