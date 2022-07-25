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
import zipzong.zipzong.repository.TeamRepository;

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

    RegistrationService registrationService;

    @BeforeEach
    void setup() {
        registrationService = new RegistrationService(teamRepository, memberRepository, registrationRepository);
    }

    @Test
    @DisplayName("초기에 그룹 생성")
    void createTeam() {
        //given
        Team team = makeTeam();
        Member member = makeMember();
        Member savedMember = memberRepository.save(member);

        //when
        Registration savedRegistration = registrationService.createTeam(team, savedMember.getId());

        //then
        Assertions.assertEquals("link", savedRegistration.getTeam()
                                                         .getInviteLink());
        Assertions.assertEquals("nickName", savedRegistration.getMember()
                                                             .getNickname());
        Assertions.assertEquals(Role.LEADER, savedRegistration.getRole());
    }


    @Test
    @DisplayName("존재하는 링크로 회원가입")
    void joinTeam() {
        //given
        Team team = makeTeam();
        Member member = makeMember();

        Member savedMember = memberRepository.save(member);
        Team savedTeam = teamRepository.save(team);

        //when
        Registration savedRegistration = registrationService.joinTeam(team.getInviteLink(), savedMember.getId());

        //then
        Assertions.assertEquals("link", savedRegistration.getTeam()
                                                         .getInviteLink());
        Assertions.assertEquals("nickName", savedRegistration.getMember()
                                                             .getNickname());
        Assertions.assertEquals(Role.FOLLOWER, savedRegistration.getRole());
    }

    @Test
    @DisplayName("존재하지않는 링크로 회원가입")
    void joinUndefinedLink() {
        //given
        Member member = makeMember();

        //then
        Assertions.assertThrows(NoSuchElementException.class, ()->{
            //when
            registrationService.joinTeam("undefinedLink", member.getId());
        });


    }

    @Test
    void resignTeam() {
        //given
        Member member = makeMember();
        Team team = makeTeam();
        Member savedMember = memberRepository.save(member);
        teamRepository.save(team);
        Registration savedRegistration = registrationService.createTeam(team, savedMember.getId());

        //when
        registrationService.resignTeam(savedRegistration.getId());

        //then
        Assertions.assertEquals(0,registrationRepository.findAll().size());
    }

    @Test
    void deleteTeam() {

    }

    private Member makeMember() {
        return Member.builder()
                     .nickname("nickName")
                     .provider("google")
                     .email("bababrll@naver.com")
                     .name("김준우")
                     .build();
    }

    private Team makeTeam() {
        return Team.builder()
                   .inviteLink("link")
                   .name("groupName")
                   .build();
    }

}