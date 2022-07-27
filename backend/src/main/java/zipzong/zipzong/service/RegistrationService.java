package zipzong.zipzong.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zipzong.zipzong.domain.Member;
import zipzong.zipzong.domain.Registration;
import zipzong.zipzong.domain.Team;
import zipzong.zipzong.dto.member.MemberInfoRequest;
import zipzong.zipzong.dto.team.TeamInfoRequest;
import zipzong.zipzong.enums.CheckExist;
import zipzong.zipzong.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final RegistrationRepository registrationRepository;
    private final TeamIconRepository teamIconRepository;

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

    public List<Registration> findJoinedTeam(Long memberId) {
        return registrationRepository.findJoinedTeam(memberId);
    }

    /*
    회원이 그룹 탈퇴하는 경우, 그룹장이 회원을 탈퇴시키는 경우
     */
    public void resignTeam(Long memberId, Long teamId) {
        Registration registration = registrationRepository.findByMemberIdAndTeamId(memberId,teamId)
                                                          .orElseThrow();
        registration.changeIsResign(true);
    }

    /*
        팀 정보 조회
     */
    public TeamInfoRequest getTeamInfo(Long teamId) {
        Team team = teamRepository.findById(teamId)
                                  .orElseThrow();

        List<String> icons = teamIconRepository.findByTeamId(teamId)
                                               .stream()
                                               .map(icon -> icon.getIconName())
                                               .collect(Collectors.toList());

        //팀에 가입한 멤버 리스트 뽑아오기

        List<MemberInfoRequest> memberInfos = new ArrayList<>();

        TeamInfoRequest teamInfoRequest = new TeamInfoRequest();
        teamInfoRequest.setIcons(icons);
        teamInfoRequest.setContent(team.getContent());
        teamInfoRequest.setName(team.getName());
        teamInfoRequest.setRepIcons(team.getRepIcon());
        teamInfoRequest.setShieldCount(team.getShieldCount());
        teamInfoRequest.setMembers(memberInfos);

        return teamInfoRequest;

    }

    /*
    그룹장이 그룹을 제거하는 경우
     */

    public boolean deleteTeam(Long teamId, Long memberId) {
        Team team = teamRepository.findById(teamId)
                                  .orElseThrow();
        /*
            그룹장인지 확인
         */
        team.setIsDeleted(CheckExist.Y);
        /*
            해당 그룹원들도 모두 탈퇴처리
         */
        return true;
    }


}
