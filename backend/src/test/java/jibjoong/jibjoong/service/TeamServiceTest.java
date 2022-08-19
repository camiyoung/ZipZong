//package jibjoong.jibjoong.service;
//
//import jibjoong.jibjoong.api.dto.team.response.ChangeTeamInfoResponse;
//import jibjoong.jibjoong.api.service.TeamService;
//import jibjoong.jibjoong.exception.CustomException;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import jibjoong.jibjoong.db.domain.Team;
//import jibjoong.jibjoong.db.domain.TeamIcon;
//import jibjoong.jibjoong.db.repository.memberteam.TeamIconRepository;
//import jibjoong.jibjoong.db.repository.memberteam.TeamRepository;
//
//import java.util.List;
//
//@DataJpaTest
//class TeamServiceTest {
//
//    @Autowired
//    TeamRepository teamRepository;
//    @Autowired
//    TeamIconRepository teamIconRepository;
//
//    TeamService teamService;
//
//    @BeforeEach
//    void setup() {
//        teamService = new TeamService(teamRepository, teamIconRepository);
//    }
//
//    @Test
//    @DisplayName("팀 초대 링크로 팀 아이디 조회")
//    void getTeamIdByInviteLink(){
//        //given
//        Team team = makeTeam("inviteLink");
//        Team savedTeam = teamRepository.save(team);
//
//        String inviteLink = savedTeam.getInviteLink();
//
//        //when
//        Long teamId = teamService.getTeamIdByInviteLink(inviteLink);
//
//        //then
//        Assertions.assertEquals(savedTeam.getId(), teamId);
//
//    }
//
//    @Test
//    @DisplayName(" 팀 대표 아이콘 설정")
//    void setRepIcon() {
//        //given
//        Team team = makeTeam("inviteLink");
//        Team savedTeam = teamRepository.save(team);
//
//        String newIcon = "newRepIcon";
//
//        //when
//        String changedIcon = teamService.setRepIcon(savedTeam.getId(), newIcon);
//
//        //then
//        Assertions.assertEquals(newIcon, changedIcon);
//    }
//
//    @Test
//    @DisplayName(" 팀 아이콘 추가")
//    void addIcon() {
//        //given
//        Team team = makeTeam("inviteLink");
//        Team savedTeam = teamRepository.save(team);
//        String newIcon = "newRepIcon";
//
//        //when
//        String addIcon = teamService.addIcon(savedTeam.getId(), newIcon);
//
//        //then
//        Assertions.assertEquals(newIcon, addIcon);
//    }
//
//    @Test
//    @DisplayName("팀 아이콘 모두 조회")
//    void getAllIcon() {
//        //given
//        Team team = makeTeam("inviteLink");
//        Team savedTeam = teamRepository.save(team);
//        String icon1 = "icon1";
//        String icon2 = "icon2";
//
//        TeamIcon teamIcon1 = TeamIcon.addTeamIcon(team, icon1);
//        TeamIcon teamIcon2 = TeamIcon.addTeamIcon(team, icon2);
//        teamIconRepository.save(teamIcon1);
//        teamIconRepository.save(teamIcon2);
//
//        //when
//        List<String> getAllIcon = teamService.getAllIcon(savedTeam.getId());
//
//        //then
//        Assertions.assertEquals(getAllIcon.get(0), icon1);
//        Assertions.assertEquals(getAllIcon.get(1), icon2);
//
//
//    }
//
//    @Test
//    @DisplayName("그룹 생성")
//    void create() {
//        //given
//        Team team = makeTeam("inviteLink");
//
//        //when
//        Team savedTeam = teamService.create(team);
//
//        //then
//        Assertions.assertEquals(teamRepository.findAll()
//                                              .size(), 1);
//        Assertions.assertEquals(savedTeam.getInviteLink(), savedTeam.makeInviteLink());
//
//    }
//
//    @Test
//    @DisplayName("그룹 내용 변경")
//    void changeContent() {
//        //given
//        Team team = makeTeam("inviteLink");
//        Team savedTeam = teamRepository.save(team);
//        String name = "changeName";
//        String content = "changeContent";
//
//        //when
//        ChangeTeamInfoResponse changeTeamInfoResponse = teamService.changeProfileInfo(savedTeam.getId(), name, content);
//
//        //then
//        Assertions.assertEquals(changeTeamInfoResponse.getContent(), content);
//        Assertions.assertEquals(changeTeamInfoResponse.getName(), name);
//    }
//
//    @Test
//    @DisplayName("쉴드 추가")
//    void addShield() {
//        //given
//        Team team = makeTeam("inviteLink");
//        Team savedTeam = teamRepository.save(team);
//        int value = 2;
//
//        int cur = teamService.addShield(savedTeam.getId(), value);
//
//        Assertions.assertEquals(2, value);
//    }
//
//    @Test
//    @DisplayName("쉴드가 0이면 사용 불가능")
//    void userShieldFail() {
//        //given
//        Team team = makeTeam("inviteLink");
//        Team savedTeam = teamRepository.save(team);
//
//        //then
//        Assertions.assertThrows(CustomException.class, () -> {
//            //when
//            teamService.useShield(savedTeam.getId());
//        });
//    }
//
//    @Test
//    @DisplayName("쉴드가 1이상이면 사용 가능")
//    void useShieldSuccess() {
//        //given
//        Team team = makeTeam("inviteLink");
//        Team savedTeam = teamRepository.save(team);
//
//        savedTeam.addShieldCount(2);
//
//        //when
//        teamService.useShield(savedTeam.getId());
//
//        //then
//        Assertions.assertEquals(1, savedTeam.getShieldCount());
//    }
//
//    @Test
//    @DisplayName("팀 초대링크 조회")
//    void getInviteLink() {
//        //given
//        Team team = makeTeam("inviteLink");
//        Team savedTeam = teamRepository.save(team);
//
//        //when
//        String inviteLink = teamService.getInviteLink(savedTeam.getId());
//
//        //then
//        Assertions.assertEquals(inviteLink, "inviteLink");
//
//    }
//
//
//    private Team makeTeam(String inviteLink) {
//        return Team.builder()
//                   .name("groupName")
//                   .inviteLink(inviteLink)
//                   .repIcon("repIcon")
//                   .build();
//    }
//}