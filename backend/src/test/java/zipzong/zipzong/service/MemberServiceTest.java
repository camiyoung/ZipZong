package zipzong.zipzong.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import zipzong.zipzong.domain.Member;
import zipzong.zipzong.domain.Registration;
import zipzong.zipzong.domain.Team;
import zipzong.zipzong.repository.MemberRepository;
import zipzong.zipzong.repository.RegistrationRepository;
import zipzong.zipzong.repository.TeamRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class MemberServiceTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    TeamRepository teamRepository;
    @Autowired
    RegistrationRepository registrationRepository;
    RegistrationService registrationService;
    MemberService memberService;

    @BeforeEach
    void setup() {
        registrationService = new RegistrationService(teamRepository, memberRepository, registrationRepository);
        memberService = new MemberService(memberRepository, registrationRepository);
    }

    @Test
    void updateNickName() {
    }

    @Test
    void findJoinedTeam() {
        //given
        Member member1 = makeMember("nickname1");
        Member member2 = makeMember("nickname2");

        Team team1 = makeTeam("link1");
        Team team2 = makeTeam("link2");
        Member savedMember1 = memberRepository.save(member1);
        Member savedMember2 = memberRepository.save(member2);
        registrationService.createTeam(team1,savedMember1.getId());
        registrationService.createTeam(team2,savedMember1.getId());
        registrationService.createTeam(team2,savedMember2.getId());

        //when
        List<Registration> joinedTeam = memberService.findJoinedTeam(savedMember1.getId());

        Assertions.assertEquals(2, joinedTeam.size());
        //System.out.println(joinedTeam.get(0).getInviteLink());
        //System.out.println(joinedTeam.get(1).getInviteLink());
        //System.out.println(joinedTeam.get(0).getMember().getNickname());
        //System.out.println(joinedTeam.get(1).getMember().getNickname());

    }

    private Member makeMember(String nickname) {
        return Member.builder()
                     .nickname(nickname)
                     .provider("google")
                     .email("bababrll@naver.com")
                     .name("김준우")
                     .build();
    }

    private Team makeTeam(String inviteLink) {
        return Team.builder()
                   .inviteLink(inviteLink)
                   .name("groupName")
                   .build();
    }
}