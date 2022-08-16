package zipzong.zipzong.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zipzong.zipzong.api.dto.information.MemberDetailResponse;
import zipzong.zipzong.api.dto.information.TeamDetailResponse;
import zipzong.zipzong.api.dto.information.TeamMemberDetailResponse;
import zipzong.zipzong.db.domain.*;
import zipzong.zipzong.db.repository.exercise.ExerciseRepository;
import zipzong.zipzong.db.repository.history.MemberHistoryDetailRepository;
import zipzong.zipzong.db.repository.history.MemberHistoryRepository;
import zipzong.zipzong.db.repository.history.TeamHistoryDetailRepository;
import zipzong.zipzong.db.repository.history.TeamHistoryRepository;
import zipzong.zipzong.db.repository.memberteam.MemberRepository;
import zipzong.zipzong.db.repository.memberteam.RegistrationRepository;
import zipzong.zipzong.db.repository.memberteam.TeamRepository;
import zipzong.zipzong.enums.Role;
import zipzong.zipzong.exception.CustomException;
import zipzong.zipzong.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class InformationService {

    final TeamRepository teamRepository;
    final TeamHistoryRepository teamHistoryRepository;
    final TeamHistoryDetailRepository teamHistoryDetailRepository;
    final RegistrationRepository registrationRepository;
    final MemberRepository memberRepository;
    final MemberHistoryRepository memberHistoryRepository;
    final MemberHistoryDetailRepository memberHistoryDetailRepository;
    final ExerciseRepository exerciseRepository;

    public TeamDetailResponse getTeamInfoDetail(Long teamId) {
        TeamDetailResponse response = new TeamDetailResponse();

        Team team = teamRepository.findById(teamId).orElseThrow(
                () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
        );

        TeamHistory teamHistory = teamHistoryRepository.findByTeamId(teamId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.TEAM_HISTORY_NOT_FOUND));

        List<TeamHistoryDetail> teamHistoryDetails = teamHistoryDetailRepository.findByTeamHistoryId(teamHistory.getId());

        int totalTime = 0;
        for(TeamHistoryDetail teamHistoryDetail : teamHistoryDetails) {
            totalTime += teamHistoryDetail.getExerciseTime();
        }

        List<Registration> registrations = registrationRepository.findAllInTeamNoResigned(teamId);

        String teamLeader = "";
        List<String> teamMembers = new ArrayList<>();

        for(Registration registration : registrations) {
            if(registration.getRole().equals(Role.LEADER)) {
                teamLeader = registration.getMember().getNickname();
                teamMembers.add(registration.getMember().getNickname());
            } else {
                teamMembers.add(registration.getMember().getNickname());
            }
        }

        response.setTeamName(team.getName());
        response.setTeamIcon(team.getRepIcon());
        response.setCreateDate(team.getCreateDate().toLocalDate());
        response.setCurrentStrick(teamHistory.getCurrentStrick());
        response.setMaximumStrick(teamHistory.getMaximumStrick());
        response.setTotalTime(totalTime);
        response.setTeamLeader(teamLeader);
        response.setTeamMembers(teamMembers);
        response.setContent(team.getContent());

        return response;
    }

    public MemberDetailResponse getMemberInfoDetail(Long memberId) {
        MemberDetailResponse response = new MemberDetailResponse();

        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
        );

        MemberHistory memberHistory = memberHistoryRepository.findByMemberId(memberId).orElseThrow(
                () -> new CustomException(CustomExceptionList.MEMBER_HISTORY_NOT_FOUND)
        );

        List<MemberHistoryDetail> memberHistoryDetails = memberHistoryDetailRepository.findByMemberHistoryId(memberHistory.getId());
        int totalTime = 0;

        for(MemberHistoryDetail memberHistoryDetail : memberHistoryDetails) {
            totalTime += memberHistoryDetail.getExerciseTime();
        }

        response.setNickname(member.getNickname());
        response.setMemberIcon(member.getRepIcon());
        response.setCurrentStrick(memberHistory.getCurrentStrick());
        response.setMaximumStrick(memberHistory.getMaximumStrick());
        response.setTotalTime(totalTime);

        return response;
    }

    public TeamMemberDetailResponse getTeamMemberInfoDetail(Long teamId, Long memberId) {
        TeamMemberDetailResponse response = new TeamMemberDetailResponse();

        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
        );

        Registration registration = registrationRepository.findMemberIdAndTeamIdNoResigned(memberId, teamId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));

        LocalDate lastExercised;

        if(exerciseRepository.findTop1ByRegistrationIdOrderByExerciseDateDesc(registration.getId()).isEmpty()) {
            lastExercised = null;
        } else {
            lastExercised = exerciseRepository.findTop1ByRegistrationIdOrderByExerciseDateDesc(registration.getId()).get().getExerciseDate();
        }

        int currentStrick;
        int maximumStrick;
        int totalTime;

        if(memberHistoryRepository.findByMemberId(memberId).isEmpty()) {
            currentStrick = 0;
            maximumStrick = 0;
            totalTime = 0;
        } else {
            MemberHistory memberHistory = memberHistoryRepository.findByMemberId(memberId).orElseThrow(
                    () -> new CustomException(CustomExceptionList.MEMBER_HISTORY_NOT_FOUND)
            );
            currentStrick = memberHistory.getCurrentStrick();
            maximumStrick = memberHistory.getMaximumStrick();

            List<MemberHistoryDetail> memberHistoryDetails = memberHistoryDetailRepository.findByMemberHistoryId(memberHistory.getId());

            totalTime = 0;
            if(memberHistoryDetails.size() != 0) {
                for(MemberHistoryDetail memberHistoryDetail : memberHistoryDetails) {
                    totalTime += memberHistoryDetail.getExerciseTime();
                }
            }
        }

        response.setNickname(member.getNickname());
        response.setMemberIcon(member.getRepIcon());
        response.setRegistrationDate(registration.getJoinDate().toLocalDate());
        response.setLastExercised(lastExercised);
        response.setCurrentStrick(currentStrick);
        response.setMaximumStrick(maximumStrick);
        response.setTotalTime(totalTime);

        return response;
    }
}
