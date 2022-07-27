package zipzong.zipzong.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import zipzong.zipzong.domain.Member;
import zipzong.zipzong.domain.Registration;
import zipzong.zipzong.domain.Team;
import zipzong.zipzong.enums.Role;
import zipzong.zipzong.repository.MemberRepository;
import zipzong.zipzong.repository.RegistrationRepository;
import zipzong.zipzong.repository.TeamIconRepository;
import zipzong.zipzong.repository.TeamRepository;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;


@DataJpaTest
class RegistrationServiceTest {
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    TeamRepository teamRepository;
    @Autowired
    RegistrationRepository registrationRepository;

    @Autowired
    TeamIconRepository teamIconRepository;

    RegistrationService registrationService;

    @BeforeEach
    void setup() {
        registrationService = new RegistrationService(teamRepository, memberRepository, registrationRepository, teamIconRepository);
    }

    @Test
    @DisplayName("초기에 그룹 생성")
    void createTeam() {
        //given
        Team team = makeTeam("link");
        Member member = makeMember("nickname");
        Member savedMember = memberRepository.save(member);

        //when
        Registration savedRegistration = registrationService.createTeam(team, savedMember.getId());

        //then
        Assertions.assertEquals("link", savedRegistration.getTeam()
                                                         .getInviteLink());
        Assertions.assertEquals("nickname", savedRegistration.getMember()
                                                             .getNickname());
        Assertions.assertEquals(Role.LEADER, savedRegistration.getRole());
    }


    @Test
    @DisplayName("존재하는 링크로 회원가입")
    void joinTeam() {
        //given
        Team team = makeTeam("link");
        Member member = makeMember("nickname");

        Member savedMember = memberRepository.save(member);
        Team savedTeam = teamRepository.save(team);

        //when
        Registration savedRegistration = registrationService.joinTeam(team.getInviteLink(), savedMember.getId());

        //then
        Assertions.assertEquals("link", savedRegistration.getTeam()
                                                         .getInviteLink());
        Assertions.assertEquals("nickname", savedRegistration.getMember()
                                                             .getNickname());
        Assertions.assertEquals(Role.FOLLOWER, savedRegistration.getRole());
    }

    @Test
    @DisplayName("가입한 팀 조회 성공")
    void findJoinedTeam() {
        //given
        Member member1 = makeMember("nickname1");
        Member member2 = makeMember("nickname2");

        Team team1 = makeTeam("link1");
        Team team2 = makeTeam("link2");
        Member savedMember1 = memberRepository.save(member1);
        Member savedMember2 = memberRepository.save(member2);
        registrationService.createTeam(team1, savedMember1.getId());
        registrationService.createTeam(team2, savedMember1.getId());
        registrationService.createTeam(team2, savedMember2.getId());

        //when
        List<Registration> registration = registrationService.findJoinedTeam(savedMember1.getId());

        Assertions.assertEquals(2, registration.size());
        Assertions.assertEquals("link1", registration.get(0)
                                                     .getTeam()
                                                     .getInviteLink());
        Assertions.assertEquals("link2", registration.get(1)
                                                     .getTeam()
                                                     .getInviteLink());

    }

    @Test
    @DisplayName("존재하지않는 링크로 회원가입")
    void joinUndefinedLink() {
        //given
        Member member = makeMember("nickname");

        //then
        Assertions.assertThrows(NoSuchElementException.class, () -> {
            //when
            registrationService.joinTeam("undefinedLink", member.getId());
        });
    }

    @Test
    @DisplayName("회원 탈퇴 처리")
    void resignTeam() {
        //given
        Member member = makeMember("nickname");
        Team team = makeTeam("link");
        Member savedMember = memberRepository.save(member);
        Team savedTeam = teamRepository.save(team);
        Registration savedRegistration = registrationService.createTeam(team, savedMember.getId());

        //when
        registrationService.resignTeam(savedMember.getId(), savedTeam.getId());

        //then
        Assertions.assertEquals(true, registrationRepository.findAll()
                                                            .get(0)
                                                            .getIsResign());
    }

    @Test
    void deleteTeam() {

    }

    private Member makeMember(String nickname) {
        return Member.builder()
                     .nickname(nickname)
                     .provider("google")
                     .email("bababrll@naver.com")
                     .name("김준우")
                     .repIcon("repIcon")
                     .build();
    }

    private Team makeTeam(String link) {
        return Team.builder()
                   .inviteLink(link)
                   .name("groupName")
                   .repIcon("repIcon")
                   .build();
    }

}