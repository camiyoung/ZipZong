//package jibjoong.jibjoong.controller;
//
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.RequestBuilder;
//import org.springframework.test.web.servlet.ResultActions;
//import jibjoong.jibjoong.api.controller.RankingController;
//import jibjoong.jibjoong.api.dto.ranking.HallOfFameResponse;
//import jibjoong.jibjoong.api.dto.ranking.MemberRankingResponse;
//import jibjoong.jibjoong.api.dto.ranking.TeamRankingResponse;
//import jibjoong.jibjoong.api.service.RankingService;
//import jibjoong.jibjoong.config.auth.OAuthService;
//import jibjoong.jibjoong.config.jwt.JwtService;
//import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(RankingController.class)
//@AutoConfigureRestDocs
//@MockBean(JpaMetamodelMappingContext.class)
//public class RankingControllerTest {
//
//    @Autowired
//    MockMvc mockMvc;
//
//    @MockBean
//    private OAuthService oAuthService;
//
//    @MockBean
//    private JwtService jwtService;
//
//    @MockBean
//    private MemberRepository memberRepository;
//
//    @MockBean
//    private RankingService rankingService;
//
//    @Test
//    @DisplayName("명예의 전당 페이지")
//    void showRankingPage() throws Exception {
//        // given
//        List<HallOfFameResponse.HallOfFame> hallOfFames = makeHallOffames();
//        List<HallOfFameResponse.StrickRank> strickRanks = makeStrickRanks();
//        List<HallOfFameResponse.TimeRank> timeRanks = makeTimeRanks();
//        List<HallOfFameResponse.PersonalStrickRank> personalStrickRanks = makePersonalStrickRanks();
//        List<HallOfFameResponse.PersonalTimeRank> personalTimeRanks = makePersonalTimeRanks();
//
//        given(rankingService.getHallOfFames()).willReturn(hallOfFames);
//        given(rankingService.getStrickRanks()).willReturn(strickRanks);
//        given(rankingService.getTimeRanks()).willReturn(timeRanks);
//        given(rankingService.getPersonalStrickRanks()).willReturn(personalStrickRanks);
//        given(rankingService.getPersonalTimeRanks()).willReturn(personalTimeRanks);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/ranking/info");
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andDo(document("show-ranking-page",
//                        preprocessResponse(prettyPrint()),
//                            responseFields(
//                                    fieldWithPath("message").description("메시지"),
//                                    fieldWithPath("data.hallOfFames.[]").description("명예의 전당 랭킹"),
//                                    fieldWithPath("data.hallOfFames.[].rank").description("순위"),
//                                    fieldWithPath("data.hallOfFames.[].teamId").description("팀 ID"),
//                                    fieldWithPath("data.hallOfFames.[].teamIcon").description("팀 아이콘"),
//                                    fieldWithPath("data.hallOfFames.[].teamName").description("팀 이름"),
//                                    fieldWithPath("data.hallOfFames.[].satisfiedTime").description("66일 달성 후 지난 분(min)"),
//                                    fieldWithPath("data.strickRanks.[]").description("팀 스트릭 랭킹"),
//                                    fieldWithPath("data.strickRanks.[].rank").description("순위"),
//                                    fieldWithPath("data.strickRanks.[].teamId").description("팀 ID"),
//                                    fieldWithPath("data.strickRanks.[].teamIcon").description("팀 아이콘"),
//                                    fieldWithPath("data.strickRanks.[].teamName").description("팀 이름"),
//                                    fieldWithPath("data.strickRanks.[].maxStrick").description("최대 스트릭 일수"),
//                                    fieldWithPath("data.timeRanks.[]").description("팀 누적시간 랭킹"),
//                                    fieldWithPath("data.timeRanks.[].rank").description("순위"),
//                                    fieldWithPath("data.timeRanks.[].teamId").description("팀 ID"),
//                                    fieldWithPath("data.timeRanks.[].teamIcon").description("팀 아이콘"),
//                                    fieldWithPath("data.timeRanks.[].teamName").description("팀 이름"),
//                                    fieldWithPath("data.timeRanks.[].totalTime").description("누적 운동시간"),
//                                    fieldWithPath("data.personalStrickRanks.[]").description("멤버 스트릭 랭킹"),
//                                    fieldWithPath("data.personalStrickRanks.[].rank").description("순위"),
//                                    fieldWithPath("data.personalStrickRanks.[].memberId").description("멤버 ID"),
//                                    fieldWithPath("data.personalStrickRanks.[].memberIcon").description("멤버 아이콘"),
//                                    fieldWithPath("data.personalStrickRanks.[].nickName").description("닉네임"),
//                                    fieldWithPath("data.personalStrickRanks.[].maxStrick").description("최대 스트릭 일수"),
//                                    fieldWithPath("data.personalTimeRanks.[]").description("멤버 누적시간 랭킹"),
//                                    fieldWithPath("data.personalTimeRanks.[].rank").description("순위"),
//                                    fieldWithPath("data.personalTimeRanks.[].memberId").description("멤버 ID"),
//                                    fieldWithPath("data.personalTimeRanks.[].memberIcon").description("멤버 아이콘"),
//                                    fieldWithPath("data.personalTimeRanks.[].nickName").description("닉네임"),
//                                    fieldWithPath("data.personalTimeRanks.[].totalTime").description("누적 운동시간")
//                            )
//                        ));
//    }
//
//
//    @Test
//    @DisplayName("팀 랭킹 조회")
//    void showTeamRanking() throws Exception {
//        // given
//        Long teamId = 1L;
//        TeamRankingResponse.StrickRank strickRank = makeStrickRank();
//        TeamRankingResponse.TimeRank timeRank = makeTimeRank();
//
//        given(rankingService.getStrickRank(anyLong())).willReturn(strickRank);
//        given(rankingService.getTimeRank(anyLong())).willReturn(timeRank);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/ranking/team/{teamId}", teamId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andDo(document("show-team-ranking",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                            parameterWithName("teamId").description("팀 ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.strickRank").description("스트릭 랭킹"),
//                                fieldWithPath("data.strickRank.over.[]").description("상위 팀"),
//                                fieldWithPath("data.strickRank.over.[].rank").description("순위"),
//                                fieldWithPath("data.strickRank.over.[].teamId").description("팀 ID"),
//                                fieldWithPath("data.strickRank.over.[].teamIcon").description("팀 아이콘"),
//                                fieldWithPath("data.strickRank.over.[].teamName").description("팀 이름"),
//                                fieldWithPath("data.strickRank.over.[].maxStrick").description("최대 스트릭"),
//                                fieldWithPath("data.strickRank.me").description("내 팀"),
//                                fieldWithPath("data.strickRank.me.rank").description("순위"),
//                                fieldWithPath("data.strickRank.me.teamId").description("팀 ID"),
//                                fieldWithPath("data.strickRank.me.teamIcon").description("팀 아이콘"),
//                                fieldWithPath("data.strickRank.me.teamName").description("팀 이름"),
//                                fieldWithPath("data.strickRank.me.maxStrick").description("최대 스트릭"),
//                                fieldWithPath("data.strickRank.under.[]").description("하위 팀"),
//                                fieldWithPath("data.strickRank.under.[].rank").description("순위"),
//                                fieldWithPath("data.strickRank.under.[].teamId").description("팀 ID"),
//                                fieldWithPath("data.strickRank.under.[].teamIcon").description("팀 아이콘"),
//                                fieldWithPath("data.strickRank.under.[].teamName").description("팀 이름"),
//                                fieldWithPath("data.strickRank.under.[].maxStrick").description("최대 스트릭"),
//                                fieldWithPath("data.timeRank").description("누적 시간 랭킹"),
//                                fieldWithPath("data.timeRank.over.[]").description("상위 팀"),
//                                fieldWithPath("data.timeRank.over.[].rank").description("순위"),
//                                fieldWithPath("data.timeRank.over.[].teamId").description("팀 ID"),
//                                fieldWithPath("data.timeRank.over.[].teamIcon").description("팀 아이콘"),
//                                fieldWithPath("data.timeRank.over.[].teamName").description("팀 이름"),
//                                fieldWithPath("data.timeRank.over.[].totalTime").description("누적 시간"),
//                                fieldWithPath("data.timeRank.me").description("내 팀"),
//                                fieldWithPath("data.timeRank.me.rank").description("순위"),
//                                fieldWithPath("data.timeRank.me.teamId").description("팀 ID"),
//                                fieldWithPath("data.timeRank.me.teamIcon").description("팀 아이콘"),
//                                fieldWithPath("data.timeRank.me.teamName").description("팀 이름"),
//                                fieldWithPath("data.timeRank.me.totalTime").description("누적 시간"),
//                                fieldWithPath("data.timeRank.under.[]").description("하위 팀"),
//                                fieldWithPath("data.timeRank.under.[].rank").description("순위"),
//                                fieldWithPath("data.timeRank.under.[].teamId").description("팀 ID"),
//                                fieldWithPath("data.timeRank.under.[].teamIcon").description("팀 아이콘"),
//                                fieldWithPath("data.timeRank.under.[].teamName").description("팀 이름"),
//                                fieldWithPath("data.timeRank.under.[].totalTime").description("누적 시간")
//                        )
//                        ));
//    }
//
//    @Test
//    @DisplayName("멤버 랭킹 조회")
//    void showMemberRanking() throws Exception {
//        // given
//        Long memberId = 1L;
//        MemberRankingResponse.StrickRank strickRank = makePersonalStrickRank();
//        MemberRankingResponse.TimeRank timeRank = makePersonalTimeRank();
//
//        given(rankingService.getPersonalStrickRank(anyLong())).willReturn(strickRank);
//        given(rankingService.getPersonalTimeRank(anyLong())).willReturn(timeRank);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/ranking/member/{memberId}", memberId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isOk())
//                .andDo(document("show-member-ranking",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("memberId").description("멤버 ID")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.strickRank").description("스트릭 랭킹"),
//                                fieldWithPath("data.strickRank.over.[]").description("상위 멤버"),
//                                fieldWithPath("data.strickRank.over.[].rank").description("순위"),
//                                fieldWithPath("data.strickRank.over.[].memberId").description("멤버 ID"),
//                                fieldWithPath("data.strickRank.over.[].memberIcon").description("멤버 아이콘"),
//                                fieldWithPath("data.strickRank.over.[].nickName").description("닉네임"),
//                                fieldWithPath("data.strickRank.over.[].maxStrick").description("최대 스트릭"),
//                                fieldWithPath("data.strickRank.me").description("나"),
//                                fieldWithPath("data.strickRank.me.rank").description("순위"),
//                                fieldWithPath("data.strickRank.me.memberId").description("멤버 ID"),
//                                fieldWithPath("data.strickRank.me.memberIcon").description("멤버 아이콘"),
//                                fieldWithPath("data.strickRank.me.nickName").description("닉네임"),
//                                fieldWithPath("data.strickRank.me.maxStrick").description("최대 스트릭"),
//                                fieldWithPath("data.strickRank.under.[]").description("하위 멤버"),
//                                fieldWithPath("data.strickRank.under.[].rank").description("순위"),
//                                fieldWithPath("data.strickRank.under.[].memberId").description("멤버 ID"),
//                                fieldWithPath("data.strickRank.under.[].memberIcon").description("멤버 아이콘"),
//                                fieldWithPath("data.strickRank.under.[].nickName").description("닉네임"),
//                                fieldWithPath("data.strickRank.under.[].maxStrick").description("최대 스트릭"),
//                                fieldWithPath("data.timeRank").description("누적 시간 랭킹"),
//                                fieldWithPath("data.timeRank.over.[]").description("상위 멤버"),
//                                fieldWithPath("data.timeRank.over.[].rank").description("순위"),
//                                fieldWithPath("data.timeRank.over.[].memberId").description("멤버 ID"),
//                                fieldWithPath("data.timeRank.over.[].memberIcon").description("멤버 아이콘"),
//                                fieldWithPath("data.timeRank.over.[].nickName").description("닉네임"),
//                                fieldWithPath("data.timeRank.over.[].totalTime").description("누적 시간"),
//                                fieldWithPath("data.timeRank.me").description("나"),
//                                fieldWithPath("data.timeRank.me.rank").description("순위"),
//                                fieldWithPath("data.timeRank.me.memberId").description("멤버 ID"),
//                                fieldWithPath("data.timeRank.me.memberIcon").description("멤버 아이콘"),
//                                fieldWithPath("data.timeRank.me.nickName").description("닉네임"),
//                                fieldWithPath("data.timeRank.me.totalTime").description("누적 시간"),
//                                fieldWithPath("data.timeRank.under.[]").description("하위 멤바"),
//                                fieldWithPath("data.timeRank.under.[].rank").description("순위"),
//                                fieldWithPath("data.timeRank.under.[].memberId").description("멤버 ID"),
//                                fieldWithPath("data.timeRank.under.[].memberIcon").description("멤버 아이콘"),
//                                fieldWithPath("data.timeRank.under.[].nickName").description("닉네임"),
//                                fieldWithPath("data.timeRank.under.[].totalTime").description("누적 시간")
//                        )
//                ));
//    }
//
//    private List<HallOfFameResponse.HallOfFame> makeHallOffames() {
//        List<HallOfFameResponse.HallOfFame> hallOfFames = new ArrayList<>();
//
//        // 명예의 전당
//        HallOfFameResponse.HallOfFame hallOfFame1 = new HallOfFameResponse.HallOfFame();
//        hallOfFame1.setRank(1);
//        hallOfFame1.setTeamId(1L);
//        hallOfFame1.setTeamIcon("basic");
//        hallOfFame1.setTeamName("명예의전당 1등팀");
//        hallOfFame1.setSatisfiedTime(500);
//        HallOfFameResponse.HallOfFame hallOfFame2 = new HallOfFameResponse.HallOfFame();
//        hallOfFame2.setRank(2);
//        hallOfFame2.setTeamId(2L);
//        hallOfFame2.setTeamIcon("basic");
//        hallOfFame2.setTeamName("명예의전당 2등팀");
//        hallOfFame2.setSatisfiedTime(300);
//
//        hallOfFames.add(hallOfFame1);
//        hallOfFames.add(hallOfFame2);
//
//        return hallOfFames;
//    }
//
//    private List<HallOfFameResponse.StrickRank> makeStrickRanks() {
//        List<HallOfFameResponse.StrickRank> strickRanks = new ArrayList<>();
//
//        // 스트릭 랭킹
//        HallOfFameResponse.StrickRank strickRank1 = new HallOfFameResponse.StrickRank();
//        strickRank1.setRank(1);
//        strickRank1.setTeamId(1L);
//        strickRank1.setTeamIcon("basic");
//        strickRank1.setTeamName("스트릭 1등팀");
//        strickRank1.setMaxStrick(70);
//        HallOfFameResponse.StrickRank strickRank2 = new HallOfFameResponse.StrickRank();
//        strickRank2.setRank(2);
//        strickRank2.setTeamId(2L);
//        strickRank2.setTeamIcon("basic");
//        strickRank2.setTeamName("스트릭 2등팀");
//        strickRank2.setMaxStrick(50);
//
//        strickRanks.add(strickRank1);
//        strickRanks.add(strickRank2);
//
//        return strickRanks;
//    }
//
//    private List<HallOfFameResponse.TimeRank> makeTimeRanks() {
//        List<HallOfFameResponse.TimeRank> timeRanks = new ArrayList<>();
//
//        // 시간 랭킹
//        HallOfFameResponse.TimeRank timeRank1 = new HallOfFameResponse.TimeRank();
//        timeRank1.setRank(1);
//        timeRank1.setTeamId(1L);
//        timeRank1.setTeamIcon("basic");
//        timeRank1.setTeamName("시간 1등팀");
//        timeRank1.setTotalTime(3000);
//        HallOfFameResponse.TimeRank timeRank2 = new HallOfFameResponse.TimeRank();
//        timeRank2.setRank(2);
//        timeRank2.setTeamId(2L);
//        timeRank2.setTeamIcon("basic");
//        timeRank2.setTeamName("시간 2등팀");
//        timeRank2.setTotalTime(1000);
//
//        timeRanks.add(timeRank1);
//        timeRanks.add(timeRank2);
//
//        return timeRanks;
//    }
//
//    private List<HallOfFameResponse.PersonalStrickRank> makePersonalStrickRanks() {
//        List<HallOfFameResponse.PersonalStrickRank> strickRanks = new ArrayList<>();
//
//        // 스트릭 랭킹
//        HallOfFameResponse.PersonalStrickRank strickRank1 = new HallOfFameResponse.PersonalStrickRank();
//        strickRank1.setRank(1);
//        strickRank1.setMemberId(1L);
//        strickRank1.setMemberIcon("basic");
//        strickRank1.setNickName("스트릭 1등 멤버");
//        strickRank1.setMaxStrick(70);
//        HallOfFameResponse.PersonalStrickRank strickRank2 = new HallOfFameResponse.PersonalStrickRank();
//        strickRank2.setRank(2);
//        strickRank2.setMemberId(2L);
//        strickRank2.setMemberIcon("basic");
//        strickRank2.setNickName("스트릭 2등 멤버");
//        strickRank2.setMaxStrick(50);
//
//        strickRanks.add(strickRank1);
//        strickRanks.add(strickRank2);
//
//        return strickRanks;
//    }
//
//    private List<HallOfFameResponse.PersonalTimeRank> makePersonalTimeRanks() {
//        List<HallOfFameResponse.PersonalTimeRank> timeRanks = new ArrayList<>();
//
//        // 시간 랭킹
//        HallOfFameResponse.PersonalTimeRank timeRank1 = new HallOfFameResponse.PersonalTimeRank();
//        timeRank1.setRank(1);
//        timeRank1.setMemberId(1L);
//        timeRank1.setMemberIcon("basic");
//        timeRank1.setNickName("시간 1등 멤버");
//        timeRank1.setTotalTime(3000);
//        HallOfFameResponse.PersonalTimeRank timeRank2 = new HallOfFameResponse.PersonalTimeRank();
//        timeRank2.setRank(2);
//        timeRank2.setMemberId(2L);
//        timeRank2.setMemberIcon("basic");
//        timeRank2.setNickName("시간 2등 멤버");
//        timeRank2.setTotalTime(1000);
//
//        timeRanks.add(timeRank1);
//        timeRanks.add(timeRank2);
//
//        return timeRanks;
//    }
//
//    private TeamRankingResponse.StrickRank makeStrickRank() {
//        TeamRankingResponse.StrickRank strickRank = new TeamRankingResponse.StrickRank();
//
//        // over
//        List<TeamRankingResponse.StrickRankDetail> over = new ArrayList<>();
//
//        TeamRankingResponse.StrickRankDetail strickRankDetail1 = new TeamRankingResponse.StrickRankDetail();
//        strickRankDetail1.setRank(1);
//        strickRankDetail1.setTeamId(1L);
//        strickRankDetail1.setTeamIcon("basic");
//        strickRankDetail1.setTeamName("상위 팀1");
//        strickRankDetail1.setMaxStrick(80);
//        TeamRankingResponse.StrickRankDetail strickRankDetail2 = new TeamRankingResponse.StrickRankDetail();
//        strickRankDetail2.setRank(2);
//        strickRankDetail2.setTeamId(2L);
//        strickRankDetail2.setTeamIcon("basic");
//        strickRankDetail2.setTeamName("상위 팀2");
//        strickRankDetail2.setMaxStrick(70);
//
//        over.add(strickRankDetail1);
//        over.add(strickRankDetail2);
//
//        // me
//        TeamRankingResponse.StrickRankDetail me = new TeamRankingResponse.StrickRankDetail();
//
//        TeamRankingResponse.StrickRankDetail strickRankDetail3 = new TeamRankingResponse.StrickRankDetail();
//        strickRankDetail3.setRank(3);
//        strickRankDetail3.setTeamId(3L);
//        strickRankDetail3.setTeamIcon("basic");
//        strickRankDetail3.setTeamName("내 팀");
//        strickRankDetail3.setMaxStrick(50);
//
//        me = strickRankDetail3;
//
//        // under
//        List<TeamRankingResponse.StrickRankDetail> under = new ArrayList<>();
//
//        TeamRankingResponse.StrickRankDetail strickRankDetail4 = new TeamRankingResponse.StrickRankDetail();
//        strickRankDetail4.setRank(4);
//        strickRankDetail4.setTeamId(4L);
//        strickRankDetail4.setTeamIcon("basic");
//        strickRankDetail4.setTeamName("하위 팀1");
//        strickRankDetail4.setMaxStrick(40);
//        TeamRankingResponse.StrickRankDetail strickRankDetail5 = new TeamRankingResponse.StrickRankDetail();
//        strickRankDetail5.setRank(5);
//        strickRankDetail5.setTeamId(5L);
//        strickRankDetail5.setTeamIcon("basic");
//        strickRankDetail5.setTeamName("하위 팀2");
//        strickRankDetail5.setMaxStrick(20);
//
//        under.add(strickRankDetail4);
//        under.add(strickRankDetail5);
//
//        strickRank.setOver(over);
//        strickRank.setMe(me);
//        strickRank.setUnder(under);
//
//        return strickRank;
//    }
//
//    private TeamRankingResponse.TimeRank makeTimeRank() {
//        TeamRankingResponse.TimeRank timeRank = new TeamRankingResponse.TimeRank();
//
//        // over
//        List<TeamRankingResponse.TimeRankDetail> over = new ArrayList<>();
//
//        TeamRankingResponse.TimeRankDetail timeRankDetail1 = new TeamRankingResponse.TimeRankDetail();
//        timeRankDetail1.setRank(1);
//        timeRankDetail1.setTeamId(1L);
//        timeRankDetail1.setTeamIcon("basic");
//        timeRankDetail1.setTeamName("상위 팀1");
//        timeRankDetail1.setTotalTime(2000);
//        TeamRankingResponse.TimeRankDetail timeRankDetail2 = new TeamRankingResponse.TimeRankDetail();
//        timeRankDetail2.setRank(2);
//        timeRankDetail2.setTeamId(2L);
//        timeRankDetail2.setTeamIcon("basic");
//        timeRankDetail2.setTeamName("상위 팀2");
//        timeRankDetail2.setTotalTime(1800);
//
//        over.add(timeRankDetail1);
//        over.add(timeRankDetail2);
//
//        // me
//        TeamRankingResponse.TimeRankDetail me = new TeamRankingResponse.TimeRankDetail();
//
//        TeamRankingResponse.TimeRankDetail timeRankDetail3 = new TeamRankingResponse.TimeRankDetail();
//        timeRankDetail3.setRank(3);
//        timeRankDetail3.setTeamId(3L);
//        timeRankDetail3.setTeamIcon("basic");
//        timeRankDetail3.setTeamName("내 팀");
//        timeRankDetail3.setTotalTime(1500);
//
//        me = timeRankDetail3;
//
//        // under
//        List<TeamRankingResponse.TimeRankDetail> under = new ArrayList<>();
//
//        TeamRankingResponse.TimeRankDetail timeRankDetail4 = new TeamRankingResponse.TimeRankDetail();
//        timeRankDetail4.setRank(4);
//        timeRankDetail4.setTeamId(4L);
//        timeRankDetail4.setTeamIcon("basic");
//        timeRankDetail4.setTeamName("하위 팀1");
//        timeRankDetail4.setTotalTime(1300);
//        TeamRankingResponse.TimeRankDetail timeRankDetail5 = new TeamRankingResponse.TimeRankDetail();
//        timeRankDetail5.setRank(5);
//        timeRankDetail5.setTeamId(5L);
//        timeRankDetail5.setTeamIcon("basic");
//        timeRankDetail5.setTeamName("하위 팀2");
//        timeRankDetail5.setTotalTime(1000);
//
//        under.add(timeRankDetail4);
//        under.add(timeRankDetail5);
//
//        timeRank.setOver(over);
//        timeRank.setMe(me);
//        timeRank.setUnder(under);
//
//        return timeRank;
//    }
//
//    private MemberRankingResponse.StrickRank makePersonalStrickRank() {
//        MemberRankingResponse.StrickRank strickRank = new MemberRankingResponse.StrickRank();
//
//        // over
//        List<MemberRankingResponse.StrickRankDetail> over = new ArrayList<>();
//
//        MemberRankingResponse.StrickRankDetail strickRankDetail1 = new MemberRankingResponse.StrickRankDetail();
//        strickRankDetail1.setRank(1);
//        strickRankDetail1.setMemberId(1L);
//        strickRankDetail1.setMemberIcon("basic");
//        strickRankDetail1.setNickName("상위 멤버1");
//        strickRankDetail1.setMaxStrick(80);
//        MemberRankingResponse.StrickRankDetail strickRankDetail2 = new MemberRankingResponse.StrickRankDetail();
//        strickRankDetail2.setRank(2);
//        strickRankDetail2.setMemberId(2L);
//        strickRankDetail2.setMemberIcon("basic");
//        strickRankDetail2.setNickName("상위 멤버2");
//        strickRankDetail2.setMaxStrick(70);
//
//        over.add(strickRankDetail1);
//        over.add(strickRankDetail2);
//
//        // me
//        MemberRankingResponse.StrickRankDetail me = new MemberRankingResponse.StrickRankDetail();
//
//        MemberRankingResponse.StrickRankDetail strickRankDetail3 = new MemberRankingResponse.StrickRankDetail();
//        strickRankDetail3.setRank(3);
//        strickRankDetail3.setMemberId(3L);
//        strickRankDetail3.setMemberIcon("basic");
//        strickRankDetail3.setNickName("나");
//        strickRankDetail3.setMaxStrick(50);
//
//        me = strickRankDetail3;
//
//        // under
//        List<MemberRankingResponse.StrickRankDetail> under = new ArrayList<>();
//
//        MemberRankingResponse.StrickRankDetail strickRankDetail4 = new MemberRankingResponse.StrickRankDetail();
//        strickRankDetail4.setRank(4);
//        strickRankDetail4.setMemberId(4L);
//        strickRankDetail4.setMemberIcon("basic");
//        strickRankDetail4.setNickName("하위 멤버1");
//        strickRankDetail4.setMaxStrick(40);
//        MemberRankingResponse.StrickRankDetail strickRankDetail5 = new MemberRankingResponse.StrickRankDetail();
//        strickRankDetail5.setRank(5);
//        strickRankDetail5.setMemberId(5L);
//        strickRankDetail5.setMemberIcon("basic");
//        strickRankDetail5.setNickName("하위 멤버2");
//        strickRankDetail5.setMaxStrick(20);
//
//        under.add(strickRankDetail4);
//        under.add(strickRankDetail5);
//
//        strickRank.setOver(over);
//        strickRank.setMe(me);
//        strickRank.setUnder(under);
//
//        return strickRank;
//    }
//
//    private MemberRankingResponse.TimeRank makePersonalTimeRank() {
//        MemberRankingResponse.TimeRank timeRank = new MemberRankingResponse.TimeRank();
//
//        // over
//        List<MemberRankingResponse.TimeRankDetail> over = new ArrayList<>();
//
//        MemberRankingResponse.TimeRankDetail timeRankDetail1 = new MemberRankingResponse.TimeRankDetail();
//        timeRankDetail1.setRank(1);
//        timeRankDetail1.setMemberId(1L);
//        timeRankDetail1.setMemberIcon("basic");
//        timeRankDetail1.setNickName("상위 멤버1");
//        timeRankDetail1.setTotalTime(2000);
//        MemberRankingResponse.TimeRankDetail timeRankDetail2 = new MemberRankingResponse.TimeRankDetail();
//        timeRankDetail2.setRank(2);
//        timeRankDetail2.setMemberId(2L);
//        timeRankDetail2.setMemberIcon("basic");
//        timeRankDetail2.setNickName("상위 멤버2");
//        timeRankDetail2.setTotalTime(1800);
//
//        over.add(timeRankDetail1);
//        over.add(timeRankDetail2);
//
//        // me
//        MemberRankingResponse.TimeRankDetail me = new MemberRankingResponse.TimeRankDetail();
//
//        MemberRankingResponse.TimeRankDetail timeRankDetail3 = new MemberRankingResponse.TimeRankDetail();
//        timeRankDetail3.setRank(3);
//        timeRankDetail3.setMemberId(3L);
//        timeRankDetail3.setMemberIcon("basic");
//        timeRankDetail3.setNickName("나");
//        timeRankDetail3.setTotalTime(1500);
//
//        me = timeRankDetail3;
//
//        // under
//        List<MemberRankingResponse.TimeRankDetail> under = new ArrayList<>();
//
//        MemberRankingResponse.TimeRankDetail timeRankDetail4 = new MemberRankingResponse.TimeRankDetail();
//        timeRankDetail4.setRank(4);
//        timeRankDetail4.setMemberId(4L);
//        timeRankDetail4.setMemberIcon("basic");
//        timeRankDetail4.setNickName("하위 팀1");
//        timeRankDetail4.setTotalTime(1300);
//        MemberRankingResponse.TimeRankDetail timeRankDetail5 = new MemberRankingResponse.TimeRankDetail();
//        timeRankDetail5.setRank(5);
//        timeRankDetail5.setMemberId(5L);
//        timeRankDetail5.setMemberIcon("basic");
//        timeRankDetail5.setNickName("하위 팀2");
//        timeRankDetail5.setTotalTime(1000);
//
//        under.add(timeRankDetail4);
//        under.add(timeRankDetail5);
//
//        timeRank.setOver(over);
//        timeRank.setMe(me);
//        timeRank.setUnder(under);
//
//        return timeRank;
//    }
//
//}
