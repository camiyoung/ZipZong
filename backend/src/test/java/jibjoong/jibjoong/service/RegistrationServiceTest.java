//package jibjoong.jibjoong.service;
//
//import jibjoong.jibjoong.api.dto.team.TeamMemberId;
//import jibjoong.jibjoong.api.dto.team.request.TeamInfoRequest;
//import jibjoong.jibjoong.api.dto.team.response.TeamResponse;
//import jibjoong.jibjoong.api.service.RegistrationService;
//import jibjoong.jibjoong.exception.CustomExceptionList;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import jibjoong.jibjoong.db.domain.Member;
//import jibjoong.jibjoong.db.domain.Registration;
//import jibjoong.jibjoong.db.domain.Team;
//import jibjoong.jibjoong.enums.CheckExist;
//import jibjoong.jibjoong.enums.Role;
//import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
//import jibjoong.jibjoong.db.repository.memberteam.RegistrationRepository;
//import jibjoong.jibjoong.db.repository.memberteam.TeamIconRepository;
//import jibjoong.jibjoong.db.repository.memberteam.TeamRepository;
//import jibjoong.jibjoong.exception.CustomException;
//
//import java.util.ArrayList;
//import java.util.List;
//
//
//@DataJpaTest
//class RegistrationServiceTest {
//    @Autowired
//    MemberRepository memberRepository;
//    @Autowired
//    TeamRepository teamRepository;
//    @Autowired
//    RegistrationRepository registrationRepository;
//
//    @Autowired
//    TeamIconRepository teamIconRepository;
//
//    RegistrationService registrationService;
//
//    @BeforeEach
//    void setup() {
//        registrationService = new RegistrationService(teamRepository, memberRepository, registrationRepository, teamIconRepository);
//    }
//
//    @Test
//    @DisplayName("초기에 그룹 생성")
//    void createTeam() {
//        //given
//        Team team = makeTeam("link", "team1");
//        Member member = makeMember("nickname");
//        Member savedMember = memberRepository.save(member);
//
//        //when
//        TeamMemberId teamMemberId = registrationService.createTeam(team, savedMember.getId());
//
//        //then
//        Assertions.assertEquals(savedMember.getId(), teamMemberId.getMemberId());
//
//    }
//
//
//    @Test
//    @DisplayName("존재하는 링크로 회원가입")
//    void joinTeam() {
//        //given
//        Team team = makeTeam("link", "team1");
//        Member member = makeMember("nickname");
//
//        Member savedMember = memberRepository.save(member);
//        Team savedTeam = teamRepository.save(team);
//
//        //when
//        Registration savedRegistration = registrationService.joinTeam(savedTeam.getId(), savedMember.getId());
//
//        //then
//        Assertions.assertEquals("link", savedRegistration.getTeam()
//                                                         .getInviteLink());
//        Assertions.assertEquals("nickname", savedRegistration.getMember()
//                                                             .getNickname());
//        Assertions.assertEquals(Role.FOLLOWER, savedRegistration.getRole());
//    }
//
//    @Test
//    @DisplayName("가입한 팀 조회 성공")
//    void findJoinedTeam() {
//        //given
//        Member member1 = makeMember("nickname1");
//        Member member2 = makeMember("nickname2");
//
//        Team team1 = makeTeam("link1", "team1");
//        Team team2 = makeTeam("link2", "team2");
//        Member savedMember1 = memberRepository.save(member1);
//        Member savedMember2 = memberRepository.save(member2);
//        registrationService.createTeam(team1, savedMember1.getId());
//        registrationService.createTeam(team2, savedMember2.getId());
//
//
//        //when
//        List<TeamResponse> teamResponses = registrationService.findJoinedTeam(savedMember1.getId());
//
//
//        //then
//        Assertions.assertEquals(1, teamResponses.size());
//        Assertions.assertEquals(teamResponses.get(0).getCount(),1);
//
//    }
//
//    @Test
//    @DisplayName("팀 상세 정보 조회")
//    void getTeamInfo(){
//        //given
//        Member member1 = makeMember("member1");
//        Member member2 = makeMember("member2");
//        Member member3 = makeMember("member3");
//        Member member4 = makeMember("member4");
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//        memberRepository.save(member3);
//        memberRepository.save(member4);
//
//        Team team1 = makeTeam("link1", "team1");
//        Team team2 = makeTeam("link2", "team2");
//        Team savedTeam1 = teamRepository.save(team1);
//        teamRepository.save(team2);
//
//        List<Registration> registrations = new ArrayList<>();
//        Registration resignRegistration = Registration.createRegistration(member4,team1);
//        resignRegistration.changeIsResign(CheckExist.Y);
//
//        registrations.add(Registration.createRegistration(member1, team1));
//        registrations.add(Registration.createRegistration(member2, team1));
//        registrations.add(Registration.createRegistration(member3, team1));
//        registrations.add(resignRegistration);
//        registrations.add(Registration.createRegistration(member1, team2));
//        registrations.add(Registration.createRegistration(member2, team2));
//        registrations.add(Registration.createRegistration(member3, team2));
//
//        for(Registration registration : registrations){
//            registrationRepository.save(registration);
//        }
//
//        //when
//        TeamInfoRequest teamInfo = registrationService.getTeamInfo(savedTeam1.getId());
//
//        //then
//        Assertions.assertEquals(teamInfo.getName(),"team1");
//        Assertions.assertEquals(teamInfo.getMembers().get(0).getNickname(),"member1");
//        Assertions.assertEquals(teamInfo.getMembers().get(1).getNickname(),"member2");
//        Assertions.assertEquals(teamInfo.getMembers().get(2).getNickname(),"member3");
//        Assertions.assertEquals(teamInfo.getMembers().size(),3);
//    }
//
//    @Test
//    @DisplayName("존재하지 않는 링크로 회원가입")
//    void joinUndefinedLink() {
//        //given
//        Member member = makeMember("nickname");
//
//        //then
//        Assertions.assertThrows(CustomException.class, () -> {
//            //when
//            registrationService.joinTeam(100L, member.getId());
//        });
//    }
//
//    @Test
//    @DisplayName("팀원에게 팀장 위임")
//    void delegateLeader() throws Exception{
//        //given
//        Member member1 = makeMember("member1");
//        Member member2 = makeMember("member2");
//        Member savedMember1 = memberRepository.save(member1);
//        Member savedMember2 = memberRepository.save(member2);
//
//        Team team = makeTeam("link", "team1");
//        Team savedTeam = teamRepository.save(team);
//
//        Registration registration1 = Registration.createRegistration(member1, team);
//        Registration registration2 = Registration.joinRegistration(member2, team);
//        registrationRepository.save(registration1);
//        registrationRepository.save(registration2);
//
//        //when
//        registrationService.delegateLeader(savedMember1.getId(), savedMember2.getId(), savedTeam.getId());
//
//        //then
//        Assertions.assertEquals(registration1.getRole(),Role.FOLLOWER);
//        Assertions.assertEquals(registration2.getRole(),Role.LEADER);
//    }
//
//    @Test
//    @DisplayName("팀장이 아닌 사람이 팀장을 위임 하려고 함")
//    void delegateLeaderFail() throws Exception{
//        //given
//        Member member1 = makeMember("member1");
//        Member member2 = makeMember("member2");
//        Member savedMember1 = memberRepository.save(member1);
//        Member savedMember2 = memberRepository.save(member2);
//
//        Team team = makeTeam("link", "team1");
//        Team savedTeam = teamRepository.save(team);
//
//        Registration registration1 = Registration.createRegistration(member1, team);
//        Registration registration2 = Registration.joinRegistration(member2, team);
//        registrationRepository.save(registration1);
//        registrationRepository.save(registration2);
//
//        //then
//        Assertions.assertThrows(CustomException.class, ()->{
//            //when
//            registrationService.delegateLeader(savedMember2.getId(), savedMember1.getId(), savedTeam.getId());
//        });
//    }
//    @Test
//    @DisplayName("회원 탈퇴 처리")
//    void resignTeam() {
//        //given
//        Member member = makeMember("nickname");
//        Team team = makeTeam("link", "team1");
//        Member savedMember = memberRepository.save(member);
//        registrationService.createTeam(team, savedMember.getId());
//        Team savedTeam = teamRepository.findByName("team1").orElseThrow(
//                () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
//        );
//
//        //when
//        registrationService.resignTeam(savedMember.getId(), savedTeam.getId());
//
//        //then
//        Assertions.assertEquals(CheckExist.Y, registrationRepository.findAll()
//                                                            .get(0)
//                                                            .getIsResign());
//    }
//
//    @Test
//    @DisplayName("팀장이 팀 삭제")
//    void deleteTeamSuccess() throws Exception{
//        //given
//        Member member1 = makeMember("member1");
//        Member member2 = makeMember("member2");
//        Member savedMember1 = memberRepository.save(member1);
//        memberRepository.save(member2);
//
//        Team team1 = makeTeam("team1", "team1");
//        Team savedTeam1 = teamRepository.save(team1);
//
//        Registration registration1 = Registration.createRegistration(member1,team1);
//        Registration registration2 = Registration.joinRegistration(member2,team1);
//
//        registrationRepository.save(registration1);
//        registrationRepository.save(registration2);
//
//        //when
//        registrationService.deleteTeam(savedTeam1.getId(), savedMember1.getId());
//
//        //then
//        Team findTeam = teamRepository.findById(savedTeam1.getId()).orElseThrow();
//        Assertions.assertEquals(findTeam.getIsDeleted(), CheckExist.Y);
//    }
//
//    @Test
//    @DisplayName("팀장 아닌 사람이 팀 삭제")
//    void deleteTeamFail() throws Exception{
//        //given
//        Member member1 = makeMember("member1");
//        Member member2 = makeMember("member2");
//        memberRepository.save(member1);
//        Member savedMember1 = memberRepository.save(member2);
//
//        Team team1 = makeTeam("link", "team1");
//        Team savedTeam1 = teamRepository.save(team1);
//
//        Registration registration1 = Registration.createRegistration(member1,team1);
//        Registration registration2 = Registration.joinRegistration(member2,team1);
//
//        registrationRepository.save(registration1);
//        registrationRepository.save(registration2);
//
//        //then
//        Assertions.assertThrows(CustomException.class, () ->{
//            //when
//            registrationService.deleteTeam(savedTeam1.getId(), savedMember1.getId());
//        });
//    }
//
//    @Test
//    @DisplayName("팀장이 회원 퇴출")
//    void expelMemberSuccess() throws Exception{
//        //given
//        Member member1 = makeMember("member1");
//        Member member2 = makeMember("member2");
//        Member savedMember1 = memberRepository.save(member1);
//        Member savedMember2 = memberRepository.save(member2);
//
//        Team team1 = makeTeam("link", "team1");
//        Team savedTeam1 = teamRepository.save(team1);
//
//        Registration registration1 = Registration.createRegistration(member1,team1);
//        Registration registration2 = Registration.joinRegistration(member2,team1);
//
//        registrationRepository.save(registration1);
//        registrationRepository.save(registration2);
//
//        //when
//        Long followerId = registrationService.expelMember(savedMember1.getId(), savedMember2.getId(), savedTeam1.getId());
//
//        //then
//        Assertions.assertEquals(savedMember2.getId(),followerId);
//    }
//
//    @Test
//    @DisplayName("팀장이 아닌 사람이 회원 퇴출")
//    void expelMemberFail() throws Exception{
//        //given
//        Member member1 = makeMember("member1");
//        Member member2 = makeMember("member2");
//        Member savedMember1 = memberRepository.save(member1);
//        Member savedMember2 = memberRepository.save(member2);
//
//        Team team1 = makeTeam("link", "team1");
//        Team savedTeam1 = teamRepository.save(team1);
//
//        Registration registration1 = Registration.createRegistration(member1,team1);
//        Registration registration2 = Registration.joinRegistration(member2,team1);
//
//        registrationRepository.save(registration1);
//        registrationRepository.save(registration2);
//
//        //then
//        Assertions.assertThrows(CustomException.class, ()->{
//            //when
//            registrationService.expelMember(savedMember2.getId(), savedMember1.getId(), savedTeam1.getId());
//        });
//    }
//
//    private Member makeMember(String nickname) {
//        return Member.builder()
//                     .nickname(nickname)
//                     .provider("google")
//                     .email("bababrll@naver.com")
//                     .name("김준우")
//                     .repIcon("repIcon")
//                     .build();
//    }
//
//    private Team makeTeam(String link, String name) {
//        return Team.builder()
//                   .inviteLink(link)
//                   .name(name)
//                   .repIcon("repIcon")
//                   .build();
//    }
//
//}