package zipzong.zipzong.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import zipzong.zipzong.api.dto.ranking.HallOfFameResponse;
import zipzong.zipzong.api.dto.ranking.TeamRankingResponse;
import zipzong.zipzong.db.domain.Team;
import zipzong.zipzong.db.repository.memberteam.TeamRepository;
import zipzong.zipzong.exception.CustomException;
import zipzong.zipzong.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class RankingService {

    private final TeamRepository teamRepository;

    private final RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();

    final ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

    public List<HallOfFameResponse.HallOfFame> getHallOfFames() {
        String rankingBoard = "halloffame";
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, 9);

        if(rankSet == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        List<HallOfFameResponse.HallOfFame> hallOfFames = new ArrayList<>();

        int rank = 0;
        for(ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long teamId = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int satisfiedTime = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            HallOfFameResponse.HallOfFame hallOfFame = new HallOfFameResponse.HallOfFame();

            hallOfFame.setRank(rank);
            hallOfFame.setTeamIcon(team.getRepIcon());
            hallOfFame.setTeamName(team.getName());
            hallOfFame.setSatisfiedTime(satisfiedTime);

            hallOfFames.add(hallOfFame);
        }

        return hallOfFames;
    }

    public List<HallOfFameResponse.StrickRank> getStrickRanks() {
        String rankingBoard = "strickrank";
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, 9);

        if(rankSet == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        List<HallOfFameResponse.StrickRank> strickRanks = new ArrayList<>();

        int rank = 0;
        for(ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long teamId = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int maxStrick = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            HallOfFameResponse.StrickRank strickRank = new HallOfFameResponse.StrickRank();

            strickRank.setRank(rank);
            strickRank.setTeamIcon(team.getRepIcon());
            strickRank.setTeamName(team.getName());
            strickRank.setMaxStrick(maxStrick);

            strickRanks.add(strickRank);
        }

        return strickRanks;
    }

    public List<HallOfFameResponse.TimeRank> getTimeRanks() {
        String rankingBoard = "timerank";
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, 9);

        if(rankSet == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        List<HallOfFameResponse.TimeRank> timeRanks = new ArrayList<>();

        int rank = 0;
        for(ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long teamId = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int totalTime = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            HallOfFameResponse.TimeRank timeRank = new HallOfFameResponse.TimeRank();

            timeRank.setRank(rank);
            timeRank.setTeamIcon(team.getRepIcon());
            timeRank.setTeamName(team.getName());
            timeRank.setTotalTime(totalTime);

            timeRanks.add(timeRank);
        }

        return timeRanks;
    }

    public List<TeamRankingResponse.StrickRank> getStrickRanks(Long teamId) {
        String rankingBoard = "strickrank";

        Long ranking = zSetOperations.reverseRank(rankingBoard, teamId);
        if(ranking == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        long start = ranking - 5L;
        long end = ranking + 5L;
        if(ranking - 5 < 0) start = 0L;
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, start, end);

        if(rankSet == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        List<TeamRankingResponse.StrickRank> strickRanks = new ArrayList<>();

        int rank = (int)start;
        for(ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long id = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int maxStrick = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            TeamRankingResponse.StrickRank strickRank = new TeamRankingResponse.StrickRank();

            strickRank.setRank(rank);
            strickRank.setTeamIcon(team.getRepIcon());
            strickRank.setTeamName(team.getName());
            strickRank.setMaxStrick(maxStrick);

            strickRanks.add(strickRank);
        }

        return strickRanks;
    }

    public List<TeamRankingResponse.TimeRank> getTimeRanks(Long teamId) {
        String rankingBoard = "timerank";

        Long ranking = zSetOperations.reverseRank(rankingBoard, teamId);
        if(ranking == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        long start = ranking - 5L;
        long end = ranking + 5L;
        if(ranking - 5 < 0) start = 0L;
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, start, end);

        if(rankSet == null) throw new CustomException(CustomExceptionList.RANK_NOT_FOUND_ERROR);

        List<TeamRankingResponse.TimeRank> timeRanks = new ArrayList<>();

        int rank = (int)start;
        for(ZSetOperations.TypedTuple<String> tuple : rankSet) {
            ++rank;
            Long id = Long.parseLong(Objects.requireNonNull(tuple.getValue()));
            int totalTime = Objects.requireNonNull(tuple.getScore()).intValue();

            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
            );

            TeamRankingResponse.TimeRank timeRank = new TeamRankingResponse.TimeRank();

            timeRank.setRank(rank);
            timeRank.setTeamIcon(team.getRepIcon());
            timeRank.setTeamName(team.getName());
            timeRank.setTotalTime(totalTime);

            timeRanks.add(timeRank);
        }

        return timeRanks;
    }
}