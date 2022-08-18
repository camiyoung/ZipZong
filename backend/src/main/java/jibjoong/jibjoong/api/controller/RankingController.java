package jibjoong.jibjoong.api.controller;

import jibjoong.jibjoong.api.dto.common.BasicResponse;
import jibjoong.jibjoong.api.dto.ranking.MemberRankingResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jibjoong.jibjoong.api.dto.ranking.HallOfFameResponse;
import jibjoong.jibjoong.api.dto.ranking.TeamRankingResponse;
import jibjoong.jibjoong.api.service.RankingService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/ranking")
public class RankingController {
    // @author 황승주
    final RankingService rankingService;

    static final String SUCCESS = "success";

    @GetMapping("/info")
    public ResponseEntity<BasicResponse<HallOfFameResponse>> hallOfFameList() {
        HallOfFameResponse response = new HallOfFameResponse();

        List<HallOfFameResponse.HallOfFame> hallOfFames = rankingService.getHallOfFames();
        List<HallOfFameResponse.StrickRank> strickRanks = rankingService.getStrickRanks();
        List<HallOfFameResponse.TimeRank> timeRanks = rankingService.getTimeRanks();
        List<HallOfFameResponse.PersonalStrickRank> personalStrickRanks = rankingService.getPersonalStrickRanks();
        List<HallOfFameResponse.PersonalTimeRank> personalTimeRanks = rankingService.getPersonalTimeRanks();

        response.setHallOfFames(hallOfFames);
        response.setStrickRanks(strickRanks);
        response.setTimeRanks(timeRanks);
        response.setPersonalStrickRanks(personalStrickRanks);
        response.setPersonalTimeRanks(personalTimeRanks);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<BasicResponse<TeamRankingResponse>> teamRankingList(@PathVariable Long teamId) {

        TeamRankingResponse response = new TeamRankingResponse();

        TeamRankingResponse.StrickRank strickRank = rankingService.getStrickRank(teamId);
        TeamRankingResponse.TimeRank timeRank = rankingService.getTimeRank(teamId);

        response.setStrickRank(strickRank);
        response.setTimeRank(timeRank);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<BasicResponse<MemberRankingResponse>> memberRankingList(@PathVariable Long memberId) {

        MemberRankingResponse response = new MemberRankingResponse();

        MemberRankingResponse.StrickRank strickRank = rankingService.getPersonalStrickRank(memberId);
        MemberRankingResponse.TimeRank timeRank = rankingService.getPersonalTimeRank(memberId);

        response.setStrickRank(strickRank);
        response.setTimeRank(timeRank);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
