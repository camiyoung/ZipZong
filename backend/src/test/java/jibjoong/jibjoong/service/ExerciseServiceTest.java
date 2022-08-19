//package jibjoong.jibjoong.service;
//
//import jibjoong.jibjoong.api.dto.exercise.request.ExerciseResultRequest;
//import jibjoong.jibjoong.api.dto.exercise.response.*;
//import jibjoong.jibjoong.api.service.ExerciseService;
//import jibjoong.jibjoong.api.service.RegistrationService;
//import jibjoong.jibjoong.db.domain.*;
//import jibjoong.jibjoong.db.repository.exercise.ExerciseDetailRepository;
//import jibjoong.jibjoong.db.repository.exercise.ExerciseRepository;
//import jibjoong.jibjoong.db.repository.exercise.MemberCalendarRepository;
//import jibjoong.jibjoong.db.repository.exercise.TeamCalendarRepository;
//import jibjoong.jibjoong.db.repository.history.MemberHistoryDetailRepository;
//import jibjoong.jibjoong.db.repository.history.MemberHistoryRepository;
//import jibjoong.jibjoong.db.repository.history.TeamHistoryDetailRepository;
//import jibjoong.jibjoong.db.repository.history.TeamHistoryRepository;
//import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
//import jibjoong.jibjoong.db.repository.memberteam.RegistrationRepository;
//import jibjoong.jibjoong.db.repository.memberteam.TeamIconRepository;
//import jibjoong.jibjoong.db.repository.memberteam.TeamRepository;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@DataJpaTest
//public class ExerciseServiceTest {
//
//    @Autowired
//    MemberRepository memberRepository;
//    @Autowired
//    TeamRepository teamRepository;
//    @Autowired
//    RegistrationRepository registrationRepository;
//    @Autowired
//    ExerciseRepository exerciseRepository;
//    @Autowired
//    ExerciseDetailRepository exerciseDetailRepository;
//    @Autowired
//    MemberHistoryRepository memberHistoryRepository;
//    @Autowired
//    TeamHistoryRepository teamHistoryRepository;
//    @Autowired
//    TeamHistoryDetailRepository teamHistoryDetailRepository;
//    @Autowired
//    MemberHistoryDetailRepository memberHistoryDetailRepository;
//    @Autowired
//    TeamIconRepository teamIconRepository;
//    @Autowired
//    TeamCalendarRepository teamCalendarRepository;
//    @Autowired
//    MemberCalendarRepository memberCalendarRepository;
//
//    ExerciseService exerciseService;
//    RegistrationService registrationService;
//
//    @BeforeEach
//    void setup() {
//        exerciseService = new ExerciseService(memberRepository, teamRepository, registrationRepository, exerciseRepository, exerciseDetailRepository, teamHistoryRepository, teamHistoryDetailRepository, teamCalendarRepository, teamIconRepository, memberHistoryRepository, memberHistoryDetailRepository, memberCalendarRepository);
//        registrationService = new RegistrationService(teamRepository, memberRepository, registrationRepository, teamIconRepository);
//    }
//
//    @Test
//    @DisplayName("운동 결과 저장")
//    void saveExerciseResult() throws Exception {
//        // given
//        Member member1Temp = makeMember("황승주", "las1260@naver.com", "황승주").orElseThrow();
//        Member member2Temp = makeMember("츄츄", "platinadark@gmail.com", "츄츄").orElseThrow();
//        Team team = makeTeam().orElseThrow();
//        memberRepository.save(member1Temp);
//        memberRepository.save(member2Temp);
//
//        Member member1 = memberRepository.findByNickname("황승주").orElseThrow();
//        Member member2 = memberRepository.findByNickname("츄츄").orElseThrow();
//        registrationService.createTeam(team, member1.getId());
//        registrationService.joinTeam(team.getId(), member2.getId());
//
//        // when
//        exerciseService.saveMemberExerciseInfo(team.getId(), makePersonalResultList(member1.getId(), member2.getId()));
//
//        // then
//        Registration registration = registrationRepository.findMemberIdAndTeamIdNoResigned(member1.getId(), team.getId()).orElseThrow();
//        Exercise exercise = exerciseRepository.findByRegistrationIdAndExerciseDate(registration.getId(), LocalDate.now()).orElseThrow();
//        Registration registration2 = registrationRepository.findMemberIdAndTeamIdNoResigned(member2.getId(),team.getId()).orElseThrow();
//        Exercise exercise2 = exerciseRepository.findByRegistrationIdAndExerciseDate(registration2.getId(), LocalDate.now()).orElseThrow();
//
//        ExerciseDetail exerciseDetail = exerciseDetailRepository.findByExerciseId(exercise.getId()).get(0);
//        ExerciseDetail exerciseDetail2 = exerciseDetailRepository.findByExerciseId(exercise2.getId()).get(0);
//
//        Assertions.assertThat(exerciseDetail.getExerciseName().equals("PUSHUP")).isTrue();
//        Assertions.assertThat(exerciseDetail.getExerciseNum() == 5).isTrue();
//
//        Assertions.assertThat(exerciseDetail2.getExerciseName().equals("PUSHUP")).isTrue();
//        Assertions.assertThat(exerciseDetail2.getExerciseNum() == 8).isTrue();
//    }
//
//    @Test
//    @DisplayName("멤버 누적 기록 저장")
//    void saveMemberExerciseHistory() throws Exception {
//        // given
//        Member member1Temp = makeMember("황승주", "las1260@naver.com", "황승주").orElseThrow();
//        Member member2Temp = makeMember("츄츄", "platinadark@gmail.com", "츄츄").orElseThrow();
//        Team team = makeTeam().orElseThrow();
//        memberRepository.save(member1Temp);
//        memberRepository.save(member2Temp);
//
//        Member member1 = memberRepository.findByNickname("황승주").orElseThrow();
//        Member member2 = memberRepository.findByNickname("츄츄").orElseThrow();
//        registrationService.createTeam(team, member1.getId());
//        registrationService.joinTeam(team.getId(), member2.getId());
//
//        // when
//        exerciseService.updateMemberExerciseHistory(makePersonalResultList(member1.getId(), member2.getId()));
//
//        // then
//        MemberHistory memberHistory = memberHistoryRepository.findByMemberId(member1.getId()).orElseThrow();
//        MemberHistory memberHistory2 = memberHistoryRepository.findByMemberId(member2.getId()).orElseThrow();
//        MemberHistoryDetail memberHistoryDetail = memberHistoryDetailRepository.findByMemberHistoryId(memberHistory.getId()).get(0);
//        MemberHistoryDetail memberHistoryDetail2 = memberHistoryDetailRepository.findByMemberHistoryId(memberHistory2.getId()).get(0);
//
//        Assertions.assertThat(memberHistory.getCurrentStrick() == 1).isTrue();
//        Assertions.assertThat(memberHistory2.getMaximumStrick() == 1).isTrue();
//        Assertions.assertThat(memberHistoryDetail.getExerciseName().equals("PUSHUP")).isTrue();
//        Assertions.assertThat(memberHistoryDetail2.getExerciseNum() == 8).isTrue();
//    }
//
//    @Test
//    @DisplayName("팀 누적 기록 저장")
//    void saveTeamExerciseHistory() throws Exception {
//        // given
//        Member member1Temp = makeMember("황승주", "las1260@naver.com", "황승주").orElseThrow();
//        Member member2Temp = makeMember("츄츄", "platinadark@gmail.com", "츄츄").orElseThrow();
//        Team team = makeTeam().orElseThrow();
//        memberRepository.save(member1Temp);
//        memberRepository.save(member2Temp);
//
//        Member member1 = memberRepository.findByNickname("황승주").orElseThrow();
//        Member member2 = memberRepository.findByNickname("츄츄").orElseThrow();
//        registrationService.createTeam(team, member1.getId());
//        registrationService.joinTeam(team.getId(), member2.getId());
//
//        // when
//        exerciseService.updateTeamExerciseHistory(team.getId(),makePersonalResultList(member1.getId(), member2.getId()));
//
//        // then
//        TeamHistory teamHistory = teamHistoryRepository.findByTeamId(team.getId()).orElseThrow();
//        TeamHistoryDetail teamHistoryDetail = teamHistoryDetailRepository.findByTeamHistoryId(teamHistory.getId()).get(0);
//
//        Assertions.assertThat(teamHistory.getCurrentStrick() == 0).isTrue();
//        Assertions.assertThat(teamHistoryDetail.getExerciseName().equals("PUSHUP")).isTrue();
//    }
//
//    @Test
//    @DisplayName("팀 평균 달성률 계산")
//    void calculateAvg() throws Exception {
//        // given
//        Member member1Temp = makeMember("황승주", "las1260@naver.com", "황승주").orElseThrow();
//        Member member2Temp = makeMember("츄츄", "platinadark@gmail.com", "츄츄").orElseThrow();
//        Team team = makeTeam().orElseThrow();
//        memberRepository.save(member1Temp);
//        memberRepository.save(member2Temp);
//
//        Member member1 = memberRepository.findByNickname("황승주").orElseThrow();
//        Member member2 = memberRepository.findByNickname("츄츄").orElseThrow();
//        registrationService.createTeam(team, member1.getId());
//        registrationService.joinTeam(team.getId(), member2.getId());
//
//        // when
//        ExerciseResultResponse response = exerciseService.calculatePercentageAvg(makePersonalResultList(member1.getId(), member2.getId()));
//
//        // then
//        Assertions.assertThat(response.getAvgPercentage() == 65).isTrue();
//    }
//
//    @Test
//    @DisplayName("팀 월 단위 세부 기록 조회")
//    void teamMonthlyExerciseHistory() throws Exception {
//        // given
//        Member member1Temp = makeMember("황승주", "las1260@naver.com", "황승주").orElseThrow();
//        Member member2Temp = makeMember("츄츄", "platinadark@gmail.com", "츄츄").orElseThrow();
//        Team team = makeTeam().orElseThrow();
//        memberRepository.save(member1Temp);
//        memberRepository.save(member2Temp);
//
//        Member member1 = memberRepository.findByNickname("황승주").orElseThrow();
//        Member member2 = memberRepository.findByNickname("츄츄").orElseThrow();
//        registrationService.createTeam(team, member1.getId());
//        registrationService.joinTeam(team.getId(), member2.getId());
//
//        // when
//        exerciseService.saveMemberExerciseInfo(team.getId(), makePersonalResultList(member1.getId(), member2.getId()));
//        ExerciseTeamHistoryResponse response = exerciseService.teamHistoryByYearAndMonth(team.getId(), LocalDate.now().getYear(), LocalDate.now().getMonthValue());
//
//        // then
//        System.out.println();
//        Assertions.assertThat(response.getDailyHistories().size() == 31).isTrue();
//        Assertions.assertThat(response.getDailyHistories().get(LocalDate.now().getDayOfMonth() - 1).getPerforms().get(0).getPerformName().equals("PUSHUP")).isTrue();
//        Assertions.assertThat(response.getDailyHistories().get(LocalDate.now().getDayOfMonth() - 1).getState().equals("FAIL")).isTrue();
//    }
//
//    @Test
//    @DisplayName("개인 월 단위 세부 기록 조회")
//    void memberMonthlyExerciseHistory() throws Exception {
//        // given
//        Member member1Temp = makeMember("황승주", "las1260@naver.com", "황승주").orElseThrow();
//        Member member2Temp = makeMember("츄츄", "platinadark@gmail.com", "츄츄").orElseThrow();
//        Team team = makeTeam().orElseThrow();
//        memberRepository.save(member1Temp);
//        memberRepository.save(member2Temp);
//
//        Member member1 = memberRepository.findByNickname("황승주").orElseThrow();
//        Member member2 = memberRepository.findByNickname("츄츄").orElseThrow();
//        registrationService.createTeam(team, member1.getId());
//        registrationService.joinTeam(team.getId(), member2.getId());
//
//        // when
//        exerciseService.saveMemberExerciseInfo(team.getId(), makePersonalResultList(member1.getId(), member2.getId()));
//        exerciseService.updateMemberExerciseHistory(makePersonalResultList(member1.getId(), member2.getId()));
//        ExerciseMemberHistoryResponse response = exerciseService.memberHistoryByYearAndMonth(member1.getId(), LocalDate.now().getYear(), LocalDate.now().getMonthValue());
//
//        // then
//        Assertions.assertThat(response.getDailyHistories().size() == 31).isTrue();
//        Assertions.assertThat(response.getDailyHistories().get(LocalDate.now().getDayOfMonth() - 1).getPerforms().get(0).getPerformName().equals("PUSHUP")).isTrue();
//        Assertions.assertThat(response.getDailyHistories().get(LocalDate.now().getDayOfMonth() - 1).getState().equals("SUCCESS")).isTrue();
//    }
//
//    @Test
//    @DisplayName("팀 누적 기록 조회")
//    void teamTotalHistory() throws Exception {
//        // given
//        Member member1Temp = makeMember("황승주", "las1260@naver.com", "황승주").orElseThrow();
//        Member member2Temp = makeMember("츄츄", "platinadark@gmail.com", "츄츄").orElseThrow();
//        Team team = makeTeam().orElseThrow();
//        memberRepository.save(member1Temp);
//        memberRepository.save(member2Temp);
//
//        Member member1 = memberRepository.findByNickname("황승주").orElseThrow();
//        Member member2 = memberRepository.findByNickname("츄츄").orElseThrow();
//        registrationService.createTeam(team, member1.getId());
//        registrationService.joinTeam(team.getId(), member2.getId());
//
//        // when
//        exerciseService.updateTeamExerciseHistory(team.getId(), makePersonalResultList(member1.getId(), member2.getId()));
//        ExerciseTeamTotalResponse response = exerciseService.totalTeamHistory(team.getId());
//
//        // then
//        Assertions.assertThat(response.getCurrentStrick() == 0).isTrue();
//        Assertions.assertThat(response.getPerformTeamTotals().get(0).getPerformName().equals("PUSHUP")).isTrue();
//    }
//
//    @Test
//    @DisplayName("개인 누적 기록 조회")
//    void memberTotalHistory() throws Exception {
//        // given
//        Member member1Temp = makeMember("황승주", "las1260@naver.com", "황승주").orElseThrow();
//        Member member2Temp = makeMember("츄츄", "platinadark@gmail.com", "츄츄").orElseThrow();
//        Team team = makeTeam().orElseThrow();
//        memberRepository.save(member1Temp);
//        memberRepository.save(member2Temp);
//
//        Member member1 = memberRepository.findByNickname("황승주").orElseThrow();
//        Member member2 = memberRepository.findByNickname("츄츄").orElseThrow();
//        registrationService.createTeam(team, member1.getId());
//        registrationService.joinTeam(team.getId(), member2.getId());
//
//        // when
//        exerciseService.updateMemberExerciseHistory(makePersonalResultList(member1.getId(), member2.getId()));
//        ExerciseMemberTotalResponse response = exerciseService.totalMemberHistory(member1.getId());
//
//        // then
//        Assertions.assertThat(response.getCurrentStrick() == 1).isTrue();
//        Assertions.assertThat(response.getPerformMemberTotals().get(0).getPerformName().equals("PUSHUP")).isTrue();
//    }
//
//    @Test
//    @DisplayName("오늘 운동한 팀원 목록 조회")
//    void exerciseMemberToday() throws Exception {
//        // given
//        Member member1Temp = makeMember("황승주", "las1260@naver.com", "황승주").orElseThrow();
//        Member member2Temp = makeMember("츄츄", "platinadark@gmail.com", "츄츄").orElseThrow();
//        Team team = makeTeam().orElseThrow();
//        memberRepository.save(member1Temp);
//        memberRepository.save(member2Temp);
//
//        Member member1 = memberRepository.findByNickname("황승주").orElseThrow();
//        Member member2 = memberRepository.findByNickname("츄츄").orElseThrow();
//        registrationService.createTeam(team, member1.getId());
//        registrationService.joinTeam(team.getId(), member2.getId());
//
//        // when
//        exerciseService.saveMemberExerciseInfo(team.getId(),makePersonalResultList(member1.getId(), member2.getId()));
//        ExerciseTeamTodayResponse exerciseTeamTodayResponse = exerciseService.exerciseMemberToday(team.getId());
//
//        // then
//        System.out.println(exerciseRepository.findAll().get(0).getExerciseDate());
//        Assertions.assertThat(exerciseTeamTodayResponse.getNiceMembers().size() == 2).isTrue();
//    }
//
//    private Optional<Member> makeMember(String name, String email, String nickname) {
//        Member member = Member
//                .builder()
//                .name(name)
//                .email(email)
//                .nickname(nickname)
//                .provider("naver")
//                .repIcon("repIcon")
//                .build();
//
//        return Optional.of(member);
//    }
//
//    private Optional<Team> makeTeam() {
//        Team team = Team
//                .builder()
//                .name("승주팀")
//                .repIcon("repIcon")
//                .inviteLink("aaa")
//                .createDate(LocalDateTime.now())
//                .shieldCount(0)
//                .build();
//
//        return Optional.of(team);
//    }
//
//    private List<ExerciseResultRequest.PersonalResult> makePersonalResultList(Long member1Id, Long member2Id) {
//        // 첫 번째 사람 데이터
//        ExerciseResultRequest.PersonalResultDetail personalResultDetail = new ExerciseResultRequest.PersonalResultDetail();
//        personalResultDetail.setExerciseName("PUSHUP");
//        personalResultDetail.setTargetNum(10);
//        personalResultDetail.setPerformNum(5);
//
//        List<ExerciseResultRequest.PersonalResultDetail> personalResultDetails = new ArrayList<>();
//        personalResultDetails.add(personalResultDetail);
//
//        ExerciseResultRequest.PersonalResult personalResult = new ExerciseResultRequest.PersonalResult();
//        personalResult.setMemberId(member1Id);
//        personalResult.setPersonalResultDetails(personalResultDetails);
//
//        // 두번째 사람 데이터
//        ExerciseResultRequest.PersonalResultDetail personalResultDetail2 = new ExerciseResultRequest.PersonalResultDetail();
//        personalResultDetail2.setExerciseName("PUSHUP");
//        personalResultDetail2.setTargetNum(10);
//        personalResultDetail2.setPerformNum(8);
//
//        List<ExerciseResultRequest.PersonalResultDetail> personalResultDetails2 = new ArrayList<>();
//        personalResultDetails2.add(personalResultDetail2);
//
//        ExerciseResultRequest.PersonalResult personalResult2 = new ExerciseResultRequest.PersonalResult();
//        personalResult2.setMemberId(member2Id);
//        personalResult2.setPersonalResultDetails(personalResultDetails2);
//
//        // 데이터 담기
//        List<ExerciseResultRequest.PersonalResult> personalResults = new ArrayList<>();
//        personalResults.add(personalResult);
//        personalResults.add(personalResult2);
//
//        return personalResults;
//    }
//}