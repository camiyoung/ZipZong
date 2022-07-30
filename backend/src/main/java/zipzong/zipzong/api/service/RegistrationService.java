package zipzong.zipzong.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zipzong.zipzong.api.dto.team.TeamMemberId;
import zipzong.zipzong.db.domain.Member;
import zipzong.zipzong.db.domain.Registration;
import zipzong.zipzong.db.domain.Team;
import zipzong.zipzong.api.dto.member.MemberInfoRequest;
import zipzong.zipzong.api.dto.team.request.TeamInfoRequest;
import zipzong.zipzong.api.dto.team.response.TeamResponse;
import zipzong.zipzong.enums.CheckExist;
import zipzong.zipzong.enums.Role;
import zipzong.zipzong.db.repository.memberteam.MemberRepository;
import zipzong.zipzong.db.repository.memberteam.RegistrationRepository;
import zipzong.zipzong.db.repository.memberteam.TeamIconRepository;
import zipzong.zipzong.db.repository.memberteam.TeamRepository;

import javax.security.sasl.AuthenticationException;
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
    public TeamMemberId createTeam(Team team, Long memberId) {
        //Team, Member, Registration
        teamRepository.save(team);
        Member member = memberRepository.findById(memberId).orElseThrow();
        Registration registration = Registration.createRegistration(member, team);
        team.getRegistrationList().add(registration);

        registrationRepository.save(registration);

        TeamMemberId teamMemberId = new TeamMemberId();
        teamMemberId.setTeamId(registration.getTeam().getId());
        teamMemberId.setMemberId(registration.getMember().getId());

        return teamMemberId;
    }

    /*
        초대링크를 통해 그룹에 가입하는 회원
    */
    public Registration joinTeam(Long teamId, Long memberId) {
        Team team = teamRepository.findById(teamId).orElseThrow();
        Member member = memberRepository.findById(memberId).orElseThrow();
        Registration registration = Registration.joinRegistration(member, team);
        return registrationRepository.save(registration);
    }

    /*
        회원이 가입한 팀 리스트 반환
     */
    public List<TeamResponse> findJoinedTeam(Long memberId) {
        List<Registration> registrations = registrationRepository.findJoinedTeam(memberId)
                .stream()
                .filter(r -> r.getIsResign() == null || r.getIsResign().equals(CheckExist.N))
                .collect(Collectors.toList());


        List<TeamResponse> teamResponses = new ArrayList<>();
        for(Registration registration : registrations){
            Team team = registration.getTeam();
            TeamResponse teamResponse = new TeamResponse();
            teamResponse.setTeamName(team.getName());
            teamResponse.setIcon(team.getRepIcon());
            teamResponse.setGroupId(team.getId());
            teamResponse.setCount(team.getRegistrationList().size());
            teamResponses.add(teamResponse);
        }
        return teamResponses;
    }

    /*
        회원이 그룹 탈퇴하는 경우
     */
    public Long resignTeam(Long memberId, Long teamId) {
        Registration registration = registrationRepository.findByMemberIdAndTeamId(memberId, teamId).orElseThrow();
        registration.changeIsResign(CheckExist.Y);
        return memberId;
    }

    /*
        그룹장이 회원을 탈퇴시키는 경우
     */
    public Long expelMember(Long leaderId, Long followerId, Long teamId) throws Exception{
        Registration followerRegistration = registrationRepository.findByMemberIdAndTeamId(followerId,teamId).orElseThrow();
        Registration leaderRegistration = registrationRepository.findByMemberIdAndTeamId(leaderId,teamId).orElseThrow();
        if(!leaderRegistration.getRole().equals(Role.LEADER)){
            throw new AuthenticationException();
        }
        followerRegistration.changeIsResign(CheckExist.Y);
        return followerId;
    }

    /*
        그룹장이 그룹원에게 그룹장을 위임하는 경우
     */
    public Long delegateLeader(Long leaderId, Long followerId, Long teamId) throws Exception{
        Registration followerRegistration = registrationRepository.findByMemberIdAndTeamId(followerId,teamId).orElseThrow();
        Registration leaderRegistration = registrationRepository.findByMemberIdAndTeamId(leaderId,teamId).orElseThrow();
        if(!leaderRegistration.getRole().equals(Role.LEADER)){
            throw new AuthenticationException();
        }
        followerRegistration.changeRole(Role.LEADER);
        leaderRegistration.changeRole(Role.FOLLOWER);

        return followerId;
    }



    /*
        팀 상세 정보 조회(멤버 정보 포함)
     */
    public TeamInfoRequest getTeamInfo(Long teamId) {
        Team team = teamRepository.findById(teamId).orElseThrow();

        List<String> icons = teamIconRepository.findByTeamId(teamId)
                .stream()
                .map(icon -> icon.getIconName())
                .collect(Collectors.toList());

        //팀에 가입한 멤버 리스트 뽑아오기
        List<Registration> registrations = registrationRepository.findTeamDetail(teamId);

        List<MemberInfoRequest> memberInfos = new ArrayList<>();

        for (Registration registration : registrations) {
            //탈퇴되었으면 continue
            if(registration.getIsResign() != null && registration.getIsResign().equals(CheckExist.Y) ){
                continue;
            }
            Member member = registration.getMember();
            MemberInfoRequest memberInfoRequest = getMemberInfoRequest(registration, member);
            memberInfos.add(memberInfoRequest);
        }

        TeamInfoRequest teamInfoRequest = getTeamInfoRequest(team, icons, memberInfos);

        return teamInfoRequest;

    }

    private MemberInfoRequest getMemberInfoRequest(Registration registration, Member member) {
        MemberInfoRequest memberInfoRequest = new MemberInfoRequest();
        memberInfoRequest.setRole(registration.getRole());
        memberInfoRequest.setCreatedAt(registration.getJoinDate());
        memberInfoRequest.setName(member.getName());
        memberInfoRequest.setRepIcon(member.getRepIcon());
        memberInfoRequest.setNickname(member.getNickname());
        return memberInfoRequest;
    }

    private TeamInfoRequest getTeamInfoRequest(Team team, List<String> icons, List<MemberInfoRequest> memberInfos) {
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

    public Long deleteTeam(Long teamId, Long memberId) throws Exception {
        Team team = teamRepository.findById(teamId).orElseThrow();

        /*
            그룹장인지 확인
         */
        Registration registration = registrationRepository.findByMemberIdAndTeamId(memberId, teamId)
                .orElseThrow();

        if(registration.getRole().equals(Role.FOLLOWER)){
            throw new AuthenticationException();
        }

        team.setIsDeleted(CheckExist.Y);
        /*
            해당 그룹원들도 모두 탈퇴처리
         */

        List<Registration> registrations = registrationRepository.findAllByTeamId(teamId);
        registrations.stream().forEach(r -> r.changeIsResign(CheckExist.Y));

        return teamId;
    }


}
