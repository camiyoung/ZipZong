package zipzong.zipzong.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zipzong.zipzong.domain.Member;
import zipzong.zipzong.domain.Registration;
import zipzong.zipzong.domain.Team;
import zipzong.zipzong.repository.MemberRepository;
import zipzong.zipzong.repository.RegistrationRepository;
import zipzong.zipzong.repository.TeamRepository;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    final TeamRepository teamRepository;
    final MemberRepository memberRepository;
    final RegistrationRepository registrationRepository;

    /*
    초기에 만든사람은 그룹장이 되며 팀을 생성함
     */
    public Registration createTeam(Team team, Long memberId) {
        //Team, Member, Registration
        teamRepository.save(team);
        Member member = memberRepository.findById(memberId)
                                        .orElseThrow();
        Registration registration = Registration.createRegistration(member, team);
        return registrationRepository.save(registration);

    }
    /*
    초대링크를 통해 그룹에 가입하는 회원
    */
    public Registration joinTeam(String inviteLink, Long memberId) {
        Team team = teamRepository.findByInviteLink(inviteLink)
                                  .orElseThrow();
        Member member = memberRepository.findById(memberId)
                                        .orElseThrow();
        Registration registration = Registration.joinRegistration(member, team);
        return registrationRepository.save(registration);
    }

    /*
    회원이 그룹 탈퇴하는 경우, 그룹장이 회원을 탈퇴시키는 경우
     */
    public void resignTeam(Long registrationId) {
        Registration registration = registrationRepository.findById(registrationId)
                                                          .orElseThrow();
        registrationRepository.delete(registration);
    }

    /*
    그룹장이 그룹을 제거하는 경우
     */

    void deleteTeam() {

    }


}
