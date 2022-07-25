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
import zipzong.zipzong.dto.member.MemberResponse;
import zipzong.zipzong.repository.MemberRepository;
import zipzong.zipzong.repository.RegistrationRepository;
import zipzong.zipzong.repository.TeamRepository;

import java.util.List;
import java.util.Optional;

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
    @DisplayName("회원 정보 조회")
    void getMemberInfo(){
        //given
        Member member = makeMember("nickname");
        memberRepository.save(member);

        //when
        Member memberInfo = memberService.getUserInfo("nickname");
        MemberResponse memberResponse = memberInfo.toMemberResponse();

        //then
        Assertions.assertEquals("nickname",memberResponse.getNickname());
    }
    @Test
    @DisplayName("초기 닉네임 설정 성공")
    void setNicknameSuccess(){

    }

    @Test
    @DisplayName("초기 닉네임 설정 실패 - 동시성 이슈로 중복 발생")
    void setNicknameFail(){

    }
    @Test
    @DisplayName("닉네임 변경 성공")
    void updateNicknameSuccess() {
        //given
        Member member = makeMember("nickname1");
        memberRepository.save(member);

        //when
        memberService.updateNickName("nickname1", "nickname2");
        Member updatedMember = memberRepository.findById(member.getId()).orElseThrow();

        //then
        Assertions.assertEquals("nickname2", updatedMember.getNickname());
    }
    @Test
    @DisplayName("닉네임 중복으로 변경 실패")
    void nicknameDuplicateOccur() {
        //given
        Member member = makeMember("nickname1");
        memberRepository.save(member);

        //then
        Assertions.assertThrows(IllegalStateException.class, () -> {
            //when
            memberService.updateNickName("nickname1", "nickname1");

        });
    }

    @Test
    @DisplayName("닉네임 중복시 true 반환")
    void nicknameDuplicateReturnTrue(){
        //given
        Member member = makeMember("nickname1");
        memberRepository.save(member);

        //when
        boolean result = memberService.isNicknameDuplicate("nickname1");
        System.out.println(result);
        //then
        Assertions.assertEquals(true, result);
    }

    @Test
    @DisplayName("닉네임 중복발생 안하면 false 반환")
    void nicknameNonDuplicateReturnFalse(){
        //given
        Member member = makeMember("nickname1");
        memberRepository.save(member);

        //when
        boolean result = memberService.isNicknameDuplicate("nickname2");

        //then
        Assertions.assertEquals(false, result);
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
        List<Registration> registration = memberService.findJoinedTeam(savedMember1.getId());

        Assertions.assertEquals(2, registration.size());
        Assertions.assertEquals("link1", registration.get(0).getTeam().getInviteLink());
        Assertions.assertEquals("link2", registration.get(1).getTeam().getInviteLink());

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