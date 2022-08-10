package zipzong.zipzong.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import zipzong.zipzong.api.controller.RankingController;
import zipzong.zipzong.api.dto.ranking.HallOfFameResponse;
import zipzong.zipzong.api.dto.ranking.TeamRankingResponse;
import zipzong.zipzong.api.service.RankingService;
import zipzong.zipzong.config.auth.OAuthService;
import zipzong.zipzong.config.jwt.JwtService;
import zipzong.zipzong.db.repository.memberteam.MemberRepository;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RankingController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
public class RankingControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private OAuthService oAuthService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private MemberRepository memberRepository;

    @MockBean
    private RankingService rankingService;

    @Test
    @DisplayName("명예의 전당 페이지")
    void showRankingPage() throws Exception {
        // given
        List<HallOfFameResponse.HallOfFame> hallOfFames = makeHallOffames();
        List<HallOfFameResponse.StrickRank> strickRanks = makeStrickRanks();
        List<HallOfFameResponse.TimeRank> timeRanks = makeTimeRanks();

        given(rankingService.getHallOfFames()).willReturn(hallOfFames);
        given(rankingService.getStrickRanks()).willReturn(strickRanks);
        given(rankingService.getTimeRanks()).willReturn(timeRanks);

        // when
        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/ranking/info");
        ResultActions resultActions = mockMvc.perform(requestBuilder);

        // then
        resultActions.andExpect(status().isOk())
                .andDo(document("show-ranking-page",
                        preprocessResponse(prettyPrint()),
                            responseFields(
                                    fieldWithPath("message").description("메시지"),
                                    fieldWithPath("data.hallOfFames.[]").description("명예의 전당 랭킹"),
                                    fieldWithPath("data.hallOfFames.[].rank").description("순위"),
                                    fieldWithPath("data.hallOfFames.[].teamIcon").description("팀 아이콘"),
                                    fieldWithPath("data.hallOfFames.[].teamName").description("팀 이름"),
                                    fieldWithPath("data.hallOfFames.[].satisfiedTime").description("66일 달성 후 지난 분(min)"),
                                    fieldWithPath("data.strickRanks.[]").description("스트릭 랭킹"),
                                    fieldWithPath("data.strickRanks.[].rank").description("순위"),
                                    fieldWithPath("data.strickRanks.[].teamIcon").description("팀 아이콘"),
                                    fieldWithPath("data.strickRanks.[].teamName").description("팀 이름"),
                                    fieldWithPath("data.strickRanks.[].maxStrick").description("최대 스트릭 일수"),
                                    fieldWithPath("data.timeRanks.[]").description("누적시간 랭킹"),
                                    fieldWithPath("data.timeRanks.[].rank").description("순위"),
                                    fieldWithPath("data.timeRanks.[].teamIcon").description("팀 아이콘"),
                                    fieldWithPath("data.timeRanks.[].teamName").description("팀 이름"),
                                    fieldWithPath("data.timeRanks.[].totalTime").description("누적 운동시간")
                            )
                        ));
    }



    @Test
    @DisplayName("팀 랭킹 조회")
    void showTeamRanking() throws Exception {
        // given
        Long teamId = 1L;
        TeamRankingResponse.StrickRank strickRank = makeStrickRank();
        TeamRankingResponse.TimeRank timeRank = makeTimeRank();

        given(rankingService.getStrickRank(anyLong())).willReturn(strickRank);
        given(rankingService.getTimeRank(anyLong())).willReturn(timeRank);

        // when
        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/ranking/team/{teamId}", teamId);
        ResultActions resultActions = mockMvc.perform(requestBuilder);

        // then
        resultActions.andExpect(status().isOk())
                .andDo(document("show-team-ranking",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                            parameterWithName("teamId").description("팀 ID")
                        ),
                        responseFields(
                                fieldWithPath("message").description("메시지"),
                                fieldWithPath("data.strickRank").description("스트릭 랭킹"),
                                fieldWithPath("data.strickRank.over.[]").description("상위 팀"),
                                fieldWithPath("data.strickRank.over.[].rank").description("순위"),
                                fieldWithPath("data.strickRank.over.[].teamIcon").description("팀 아이콘"),
                                fieldWithPath("data.strickRank.over.[].teamName").description("팀 이름"),
                                fieldWithPath("data.strickRank.over.[].maxStrick").description("최대 스트릭"),
                                fieldWithPath("data.strickRank.me").description("내 팀"),
                                fieldWithPath("data.strickRank.me.rank").description("순위"),
                                fieldWithPath("data.strickRank.me.teamIcon").description("팀 아이콘"),
                                fieldWithPath("data.strickRank.me.teamName").description("팀 이름"),
                                fieldWithPath("data.strickRank.me.maxStrick").description("최대 스트릭"),
                                fieldWithPath("data.strickRank.under.[]").description("하위 팀"),
                                fieldWithPath("data.strickRank.under.[].rank").description("순위"),
                                fieldWithPath("data.strickRank.under.[].teamIcon").description("팀 아이콘"),
                                fieldWithPath("data.strickRank.under.[].teamName").description("팀 이름"),
                                fieldWithPath("data.strickRank.under.[].maxStrick").description("최대 스트릭"),
                                fieldWithPath("data.timeRank").description("누적 시간 랭킹"),
                                fieldWithPath("data.timeRank.over.[]").description("상위 팀"),
                                fieldWithPath("data.timeRank.over.[].rank").description("순위"),
                                fieldWithPath("data.timeRank.over.[].teamIcon").description("팀 아이콘"),
                                fieldWithPath("data.timeRank.over.[].teamName").description("팀 이름"),
                                fieldWithPath("data.timeRank.over.[].totalTime").description("누적 시간"),
                                fieldWithPath("data.timeRank.me").description("내 팀"),
                                fieldWithPath("data.timeRank.me.rank").description("순위"),
                                fieldWithPath("data.timeRank.me.teamIcon").description("팀 아이콘"),
                                fieldWithPath("data.timeRank.me.teamName").description("팀 이름"),
                                fieldWithPath("data.timeRank.me.totalTime").description("누적 시간"),
                                fieldWithPath("data.timeRank.under.[]").description("하위 팀"),
                                fieldWithPath("data.timeRank.under.[].rank").description("순위"),
                                fieldWithPath("data.timeRank.under.[].teamIcon").description("팀 아이콘"),
                                fieldWithPath("data.timeRank.under.[].teamName").description("팀 이름"),
                                fieldWithPath("data.timeRank.under.[].totalTime").description("누적 시간")
                        )
                        ));
    }

    private List<HallOfFameResponse.HallOfFame> makeHallOffames() {
        List<HallOfFameResponse.HallOfFame> hallOfFames = new ArrayList<>();

        // 명예의 전당
        HallOfFameResponse.HallOfFame hallOfFame1 = new HallOfFameResponse.HallOfFame();
        hallOfFame1.setRank(1);
        hallOfFame1.setTeamIcon("basic");
        hallOfFame1.setTeamName("명예의전당 1등팀");
        hallOfFame1.setSatisfiedTime(500);
        HallOfFameResponse.HallOfFame hallOfFame2 = new HallOfFameResponse.HallOfFame();
        hallOfFame2.setRank(2);
        hallOfFame2.setTeamIcon("basic");
        hallOfFame2.setTeamName("명예의전당 2등팀");
        hallOfFame2.setSatisfiedTime(300);

        hallOfFames.add(hallOfFame1);
        hallOfFames.add(hallOfFame2);

        return hallOfFames;
    }

    private List<HallOfFameResponse.StrickRank> makeStrickRanks() {
        List<HallOfFameResponse.StrickRank> strickRanks = new ArrayList<>();

        // 스트릭 랭킹
        HallOfFameResponse.StrickRank strickRank1 = new HallOfFameResponse.StrickRank();
        strickRank1.setRank(1);
        strickRank1.setTeamIcon("basic");
        strickRank1.setTeamName("스트릭 1등팀");
        strickRank1.setMaxStrick(70);
        HallOfFameResponse.StrickRank strickRank2 = new HallOfFameResponse.StrickRank();
        strickRank2.setRank(2);
        strickRank2.setTeamIcon("basic");
        strickRank2.setTeamName("스트릭 2등팀");
        strickRank2.setMaxStrick(50);

        strickRanks.add(strickRank1);
        strickRanks.add(strickRank2);

        return strickRanks;
    }

    private List<HallOfFameResponse.TimeRank> makeTimeRanks() {
        List<HallOfFameResponse.TimeRank> timeRanks = new ArrayList<>();

        // 시간 랭킹
        HallOfFameResponse.TimeRank timeRank1 = new HallOfFameResponse.TimeRank();
        timeRank1.setRank(1);
        timeRank1.setTeamIcon("basic");
        timeRank1.setTeamName("시간 1등팀");
        timeRank1.setTotalTime(3000);
        HallOfFameResponse.TimeRank timeRank2 = new HallOfFameResponse.TimeRank();
        timeRank2.setRank(2);
        timeRank2.setTeamIcon("basic");
        timeRank2.setTeamName("시간 2등팀");
        timeRank2.setTotalTime(1000);

        timeRanks.add(timeRank1);
        timeRanks.add(timeRank2);

        return timeRanks;
    }

    private TeamRankingResponse.StrickRank makeStrickRank() {
        TeamRankingResponse.StrickRank strickRank = new TeamRankingResponse.StrickRank();

        // over
        List<TeamRankingResponse.StrickRankDetail> over = new ArrayList<>();

        TeamRankingResponse.StrickRankDetail strickRankDetail1 = new TeamRankingResponse.StrickRankDetail();
        strickRankDetail1.setRank(1);
        strickRankDetail1.setTeamIcon("basic");
        strickRankDetail1.setTeamName("상위 팀1");
        strickRankDetail1.setMaxStrick(80);
        TeamRankingResponse.StrickRankDetail strickRankDetail2 = new TeamRankingResponse.StrickRankDetail();
        strickRankDetail2.setRank(2);
        strickRankDetail2.setTeamIcon("basic");
        strickRankDetail2.setTeamName("상위 팀2");
        strickRankDetail2.setMaxStrick(70);

        over.add(strickRankDetail1);
        over.add(strickRankDetail2);

        // me
        TeamRankingResponse.StrickRankDetail me = new TeamRankingResponse.StrickRankDetail();

        TeamRankingResponse.StrickRankDetail strickRankDetail3 = new TeamRankingResponse.StrickRankDetail();
        strickRankDetail3.setRank(3);
        strickRankDetail3.setTeamIcon("basic");
        strickRankDetail3.setTeamName("내 팀");
        strickRankDetail3.setMaxStrick(50);

        me = strickRankDetail3;

        // under
        List<TeamRankingResponse.StrickRankDetail> under = new ArrayList<>();

        TeamRankingResponse.StrickRankDetail strickRankDetail4 = new TeamRankingResponse.StrickRankDetail();
        strickRankDetail4.setRank(4);
        strickRankDetail4.setTeamIcon("basic");
        strickRankDetail4.setTeamName("하위 팀1");
        strickRankDetail4.setMaxStrick(40);
        TeamRankingResponse.StrickRankDetail strickRankDetail5 = new TeamRankingResponse.StrickRankDetail();
        strickRankDetail5.setRank(5);
        strickRankDetail5.setTeamIcon("basic");
        strickRankDetail5.setTeamName("하위 팀2");
        strickRankDetail5.setMaxStrick(20);

        under.add(strickRankDetail4);
        under.add(strickRankDetail5);

        strickRank.setOver(over);
        strickRank.setMe(me);
        strickRank.setUnder(under);

        return strickRank;
    }

    private TeamRankingResponse.TimeRank makeTimeRank() {
        TeamRankingResponse.TimeRank timeRank = new TeamRankingResponse.TimeRank();

        // over
        List<TeamRankingResponse.TimeRankDetail> over = new ArrayList<>();

        TeamRankingResponse.TimeRankDetail timeRankDetail1 = new TeamRankingResponse.TimeRankDetail();
        timeRankDetail1.setRank(1);
        timeRankDetail1.setTeamIcon("basic");
        timeRankDetail1.setTeamName("상위 팀1");
        timeRankDetail1.setTotalTime(2000);
        TeamRankingResponse.TimeRankDetail timeRankDetail2 = new TeamRankingResponse.TimeRankDetail();
        timeRankDetail2.setRank(2);
        timeRankDetail2.setTeamIcon("basic");
        timeRankDetail2.setTeamName("상위 팀2");
        timeRankDetail2.setTotalTime(1800);

        over.add(timeRankDetail1);
        over.add(timeRankDetail2);

        // me
        TeamRankingResponse.TimeRankDetail me = new TeamRankingResponse.TimeRankDetail();

        TeamRankingResponse.TimeRankDetail timeRankDetail3 = new TeamRankingResponse.TimeRankDetail();
        timeRankDetail3.setRank(3);
        timeRankDetail3.setTeamIcon("basic");
        timeRankDetail3.setTeamName("내 팀");
        timeRankDetail3.setTotalTime(1500);

        me = timeRankDetail3;

        // under
        List<TeamRankingResponse.TimeRankDetail> under = new ArrayList<>();

        TeamRankingResponse.TimeRankDetail timeRankDetail4 = new TeamRankingResponse.TimeRankDetail();
        timeRankDetail4.setRank(4);
        timeRankDetail4.setTeamIcon("basic");
        timeRankDetail4.setTeamName("하위 팀1");
        timeRankDetail4.setTotalTime(1300);
        TeamRankingResponse.TimeRankDetail timeRankDetail5 = new TeamRankingResponse.TimeRankDetail();
        timeRankDetail5.setRank(5);
        timeRankDetail5.setTeamIcon("basic");
        timeRankDetail5.setTeamName("하위 팀2");
        timeRankDetail5.setTotalTime(1000);

        under.add(timeRankDetail4);
        under.add(timeRankDetail5);

        timeRank.setOver(over);
        timeRank.setMe(me);
        timeRank.setUnder(under);

        return timeRank;
    }

}
