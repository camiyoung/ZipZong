//package jibjoong.jibjoong.service;
//
//import jibjoong.jibjoong.api.dto.nickname.NicknameSetResponse;
//import jibjoong.jibjoong.api.dto.team.request.member.MemberResponse;
//import jibjoong.jibjoong.api.service.MemberService;
//import jibjoong.jibjoong.api.service.RegistrationService;
//import jibjoong.jibjoong.db.domain.Member;
//import jibjoong.jibjoong.db.domain.MemberIcon;
//import jibjoong.jibjoong.db.domain.Team;
//import jibjoong.jibjoong.db.repository.memberteam.*;
//import jibjoong.jibjoong.enums.CheckExist;
//import jibjoong.jibjoong.exception.CustomException;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.dao.DataIntegrityViolationException;
//
//import java.util.List;
//
//@DataJpaTest
//class MemberServiceTest {
//
//    @Autowired
//    MemberRepository memberRepository;
//    @Autowired
//    TeamRepository teamRepository;
//    @Autowired
//    RegistrationRepository registrationRepository;
//    @Autowired
//    MemberIconRepository memberIconRepository;
//
//    @Autowired
//    TeamIconRepository teamIconRepository;
//
//    RegistrationService registrationService;
//    MemberService memberService;
//
//    @BeforeEach
//    void setup() {
//        memberService = new MemberService(memberRepository, memberIconRepository, registrationRepository);
//    }
//
//    @Test
//    @DisplayName("회원 정보 조회")
//    void getMemberInfo() {
//        //given
//        Member member = makeMember("nickname");
//        memberRepository.save(member);
//
//        //when
//        Member memberInfo = memberService.getUserInfo("nickname");
//        MemberResponse memberResponse = memberInfo.toMemberResponse();
//
//        //then
//        Assertions.assertEquals("nickname", memberResponse.getNickname());
//    }
//
//    @Test
//    @DisplayName("초기 닉네임 설정 성공")
//    void setNicknameSuccess() {
//        //given
//        Member member = makeMember(null);
//        Member savedMember = memberRepository.save(member);
//
//        //when
//        memberService.setNickName(new NicknameSetResponse(savedMember.getId(), "nickname"));
//        String nickname = memberRepository.findById(savedMember.getId()).orElseThrow().getNickname();
//
//        //then
//        Assertions.assertEquals("nickname",nickname);
//
//
//    }
//
//    @Test
//    @DisplayName("초기 닉네임 설정 실패 - 동시성 이슈로 중복 발생")
//    void setNicknameFail() {
//        //given
//        Member beforeSavedMember = makeMember("nickname");
//        Member temp = memberRepository.save(beforeSavedMember);
//        Member member = makeMember(null);
//        Member savedMember = memberRepository.save(member);
//
//        //then
//        Assertions.assertThrows(DataIntegrityViolationException.class, ()->{
//            //when
//            memberService.setNickName(new NicknameSetResponse(savedMember.getId(), "nickname"));
//            memberRepository.flush();
//        });
//    }
//
//    @Test
//    @DisplayName("닉네임 변경 성공")
//    void updateNicknameSuccess() {
//        //given
//        Member member = makeMember("nickname1");
//        memberRepository.save(member);
//
//        //when
//        memberService.updateNickName("nickname1", "nickname2");
//        Member updatedMember = memberRepository.findById(member.getId()).orElseThrow();
//
//        //then
//        Assertions.assertEquals("nickname2", updatedMember.getNickname());
//    }
//
//    @Test
//    @DisplayName("닉네임 중복으로 변경 실패")
//    void nicknameDuplicateOccur() {
//        //given
//        Member member = makeMember("nickname1");
//        memberRepository.save(member);
//
//        //then
//        Assertions.assertThrows(CustomException.class, () -> {
//            //when
//            memberService.updateNickName("nickname1", "nickname1");
//
//        });
//    }
//
//    @Test
//    @DisplayName("닉네임 중복시 true 반환")
//    void nicknameDuplicateReturnTrue() {
//        //given
//        Member member = makeMember("nickname1");
//        memberRepository.save(member);
//
//        //when
//        boolean result = memberService.isNicknameDuplicate("nickname1");
//        System.out.println(result);
//        //then
//        Assertions.assertEquals(true, result);
//    }
//
//    @Test
//    @DisplayName("닉네임 중복발생 안하면 false 반환")
//    void nicknameNonDuplicateReturnFalse() {
//        //given
//        Member member = makeMember("nickname1");
//        memberRepository.save(member);
//
//        //when
//        boolean result = memberService.isNicknameDuplicate("nickname2");
//
//        //then
//        Assertions.assertEquals(false, result);
//    }
//
//
//
//    @Test
//    @DisplayName("대표 아이콘 설정하기")
//    void setRepIcon(){
//        //given
//        String nickname = "nickname";
//        String repIcon = "newRepIcon";
//        Member member = makeMember(nickname);
//        memberRepository.save(member);
//
//        //when
//        String savedRepIcon = memberService.setRepIcon(nickname, repIcon);
//
//        //then
//        Assertions.assertEquals(savedRepIcon,repIcon);
//    }
//
//    @Test
//    @DisplayName("아이콘 추가하기")
//    void addIcon(){
//        //given
//        String nickname = "nickname";
//        String icon = "newRepIcon";
//        Member member = makeMember(nickname);
//        memberRepository.saveAndFlush(member);
//
//        //when
//        String newIcon = memberService.addIcon(nickname, icon);
//
//        //then
//        Assertions.assertEquals(newIcon,icon);
//    }
//
//
//    @Test
//    @DisplayName("이미 있는 아이콘 추가하면 실패")
//    void addIconDuplicate(){
//        //given
//        String nickname = "nickname";
//        String icon = "newRepIcon";
//        Member member = makeMember(nickname);
//        memberRepository.saveAndFlush(member);
//
//        //when
//        memberService.addIcon(nickname, icon);
//
//        //then
//        Assertions.assertThrows(DataIntegrityViolationException.class,()->{
//            memberService.addIcon(nickname, icon);
//        });
//    }
//
//    @Test
//    @DisplayName("아이콘 리스트 조회")
//    void getAllIcon(){
//        //given
//        Member member = makeMember("nickname");
//        Member member1 = makeMember("nickname1");
//        Member savedMember = memberRepository.save(member);
//        Member savedMember1 = memberRepository.save(member1);
//
//        String icon1 = "icon1";
//        String icon2 = "icon2";
//
//        MemberIcon memberIcon1 = MemberIcon.addMemberIcon(savedMember,icon1);
//        MemberIcon memberIcon2 = MemberIcon.addMemberIcon(savedMember,icon2);
//        MemberIcon memberIcon3 = MemberIcon.addMemberIcon(savedMember1,icon1);
//        memberIconRepository.save(memberIcon1);
//        memberIconRepository.save(memberIcon2);
//        memberIconRepository.save(memberIcon3);
//
//
//        //when
//        List<String> memberIcons = memberService.getAllIcon(savedMember.getId());
//        System.out.println(memberIcons.size());
//
//        //then
//        Assertions.assertEquals(memberIcons.get(0),icon1);
//        Assertions.assertEquals(memberIcons.get(1),icon2);
//    }
//
//    @Test
//    @DisplayName("회원 탈퇴")
//    void removeMember() {
//        // given
//        Member member = makeMember("nickname");
//        Member savedMember = memberRepository.save(member);
//
//        // when
//        memberService.removeUser(savedMember.getId());
//
//        // then
//        Assertions.assertTrue(memberRepository.findByEmailAndProvider(savedMember.getEmail(), savedMember.getProvider()).orElseThrow().getIsDeleted().equals(CheckExist.Y));
//    }
//
//
//
//    private Member makeMember(String nickname) {
//        return Member.builder()
//                .nickname(nickname)
//                .provider("google")
//                .email("bababrll@naver.com")
//                .name("김준우")
//                .repIcon("repIcon")
//                .build();
//    }
//
//    private Team makeTeam(String inviteLink) {
//        return Team.builder()
//                .inviteLink(inviteLink)
//                .name("groupName")
//                .build();
//    }
//}