package jibjoong.jibjoong.api.service;

import jibjoong.jibjoong.api.dto.team.TeamMemberId;
import jibjoong.jibjoong.api.dto.team.request.TeamInfoRequest;
import jibjoong.jibjoong.api.dto.team.response.TeamResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jibjoong.jibjoong.db.domain.Member;
import jibjoong.jibjoong.db.domain.Registration;
import jibjoong.jibjoong.db.domain.Team;
import jibjoong.jibjoong.api.dto.team.request.member.MemberInfoRequest;
import jibjoong.jibjoong.enums.CheckExist;
import jibjoong.jibjoong.enums.Role;
import jibjoong.jibjoong.db.repository.memberteam.MemberRepository;
import jibjoong.jibjoong.db.repository.memberteam.RegistrationRepository;
import jibjoong.jibjoong.db.repository.memberteam.TeamIconRepository;
import jibjoong.jibjoong.db.repository.memberteam.TeamRepository;
import jibjoong.jibjoong.exception.CustomException;
import jibjoong.jibjoong.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
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

        // 그룹명이 중복되면 Exception
        if(teamRepository.existsByName(team.getName())){
            throw new CustomException(CustomExceptionList.TEAM_NAME_DUPLICATED);
        }

        //가입한 팀이 5개 이상인 경우 Exception
        //프론트에서 추가 요청이 들어와서 수정함 (22/08/13, 신슬기)
        List<Registration> registrations = registrationRepository.findJoinedTeamNoResigned(memberId);
        if(registrations.size()>=5) {
            throw new CustomException(CustomExceptionList.MEMBER_NOT_JOIN_GROUP);
        }

        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));

        teamRepository.save(team);
        team.setInviteLink(team.makeInviteLink());

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
        Team team = teamRepository.findById(teamId).orElseThrow(
                () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
        );
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
        );

        //가입한 팀이 5개 이상인 경우 Exception
        //프론트에서 추가 요청이 들어와서 수정함 (22/08/13, 신슬기)
        List<Registration> joinRegistrations = registrationRepository.findJoinedTeamNoResigned(memberId);
        if(joinRegistrations.size()>=5) {
            throw new CustomException(CustomExceptionList.MEMBER_NOT_JOIN_GROUP);
        }

        //가입한 팀원이 10명 이상인 경우 Exception
        //프론트에서 추가 요청이 들어와서 수정함 (22/08/15, 신슬기)
        List<Registration> teamRegistration = registrationRepository.findTeamDetail(teamId);
        if(teamRegistration.size()>=10) {
            throw new CustomException(CustomExceptionList. MAX_MEMBER_JOIN_GROUP);
        }

        if ((team.getIsDeleted() == null || team.getIsDeleted().equals(CheckExist.N))
                && registrationRepository.findMemberIdAndTeamIdNoResigned(member.getId(), team.getId()).isEmpty()) {
                Registration registration = Registration.joinRegistration(member, team);
                return registrationRepository.save(registration);
        }
        return Registration.builder().build();
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
            teamResponse.setCount(registrationRepository.findAllInTeamNoResigned(team.getId()).size());
            teamResponses.add(teamResponse);
        }
        return teamResponses;
    }

    /*
        회원이 그룹 탈퇴하는 경우
     */
    public Long resignTeam(Long memberId, Long teamId) {
        Registration registration = registrationRepository.findMemberIdAndTeamIdNoResigned(memberId, teamId).orElseThrow(
                () -> new CustomException(CustomExceptionList.JOIN_INFO_NOT_EXIST)
        );
        registration.changeIsResign(CheckExist.Y);
        return memberId;
    }

    /*
        그룹장이 회원을 탈퇴시키는 경우
     */
    public Long expelMember(Long leaderId, Long followerId, Long teamId) throws Exception{
        Registration followerRegistration = registrationRepository.findMemberIdAndTeamIdNoResigned(followerId,teamId).orElseThrow(
                () -> new CustomException(CustomExceptionList.JOIN_INFO_NOT_EXIST)
        );
        Registration leaderRegistration = registrationRepository.findMemberIdAndTeamIdNoResigned(leaderId,teamId).orElseThrow(
                () -> new CustomException(CustomExceptionList.JOIN_INFO_NOT_EXIST)
        );
        if(!leaderRegistration.getRole().equals(Role.LEADER)){
            throw new CustomException(CustomExceptionList.NO_AUTHENTICATION_ERROR);
        }
        followerRegistration.changeIsResign(CheckExist.Y);
        return followerId;
    }

    /*
        그룹장이 그룹원에게 그룹장을 위임하는 경우
     */
    public Long delegateLeader(Long leaderId, Long followerId, Long teamId) throws Exception{
        Registration followerRegistration = registrationRepository.findMemberIdAndTeamIdNoResigned(followerId,teamId).orElseThrow(
                () -> new CustomException(CustomExceptionList.JOIN_INFO_NOT_EXIST)
        );
        Registration leaderRegistration = registrationRepository.findMemberIdAndTeamIdNoResigned(leaderId,teamId).orElseThrow(
                () -> new CustomException(CustomExceptionList.JOIN_INFO_NOT_EXIST)
        );
        if(!leaderRegistration.getRole().equals(Role.LEADER)){
            throw new CustomException(CustomExceptionList.NO_AUTHENTICATION_ERROR);
        }
        followerRegistration.changeRole(Role.LEADER);
        leaderRegistration.changeRole(Role.FOLLOWER);

        return followerId;
    }



    /*
        팀 상세 정보 조회(멤버 정보 포함)
     */
    public TeamInfoRequest getTeamInfo(Long teamId) {
        Team team = teamRepository.findById(teamId).orElseThrow(
                () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
        );

        List<String> icons = teamIconRepository.findByTeamId(teamId)
                .stream()
                .map(icon -> icon.getIconName())
                .collect(Collectors.toList());

        //팀에 가입한 멤버 리스트 뽑아오기
        List<Registration> registrations = registrationRepository.findTeamDetail(teamId);

        List<MemberInfoRequest> memberInfos = new ArrayList<>();

        for (Registration registration : registrations) {
//            //탈퇴되었으면 continue -> repository에서 거르도록 바꿈(22/08/12, 황승주)
//            if(registration.getIsResign() != null && registration.getIsResign().equals(CheckExist.Y) ){
//                continue;
//            }
            Member member = registration.getMember();
            MemberInfoRequest memberInfoRequest = getMemberInfoRequest(registration, member);
            memberInfos.add(memberInfoRequest);
        }

        TeamInfoRequest teamInfoRequest = getTeamInfoRequest(team, icons, memberInfos);

        return teamInfoRequest;

    }

    private MemberInfoRequest getMemberInfoRequest(Registration registration, Member member) {
        MemberInfoRequest memberInfoRequest = new MemberInfoRequest();
        memberInfoRequest.setMemberId(member.getId());
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
        Team team = teamRepository.findById(teamId).orElseThrow(
                () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
        );

        /*
            그룹장인지 확인
         */
        Registration registration = registrationRepository.findMemberIdAndTeamIdNoResigned(memberId, teamId)
                .orElseThrow(
                        () -> new CustomException(CustomExceptionList.JOIN_INFO_NOT_EXIST)
                );

        if(registration.getRole().equals(Role.FOLLOWER)){
            throw new CustomException(CustomExceptionList.NO_AUTHENTICATION_ERROR);
        }

        team.setIsDeleted(CheckExist.Y);
        /*
            해당 그룹원들도 모두 탈퇴처리
         */

        List<Registration> registrations = registrationRepository.findAllInTeamNoResigned(teamId);
        registrations.stream().forEach(r -> r.changeIsResign(CheckExist.Y));

        return teamId;
    }


}
