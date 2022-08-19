package jibjoong.jibjoong.api.service;


import jibjoong.jibjoong.api.dto.team.response.ChangeTeamInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jibjoong.jibjoong.db.domain.Team;
import jibjoong.jibjoong.db.domain.TeamIcon;
import jibjoong.jibjoong.db.repository.memberteam.TeamIconRepository;
import jibjoong.jibjoong.db.repository.memberteam.TeamRepository;
import jibjoong.jibjoong.exception.CustomException;
import jibjoong.jibjoong.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TeamService {
    private final TeamRepository teamRepository;
    private final TeamIconRepository teamIconRepository;

    /*
        팀 대표아이콘 설정
     */
    public String setRepIcon(Long teamId, String repIcon) {
        teamRepository.findById(teamId)
                      .orElseThrow(
                              () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
                      )
                      .setRepIcon(repIcon);
        return repIcon;
    }

    /*
        팀 아이콘 추가
     */
    public String addIcon(Long teamId, String icon) {
        Team team = teamRepository.findById(teamId)
                                  .orElseThrow(
                                          () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
                                  );
        TeamIcon teamIcon = TeamIcon.addTeamIcon(team, icon);
        TeamIcon savedTeamIcon = teamIconRepository.save(teamIcon);

        return savedTeamIcon.getIconName();
    }

    /*
        팀 아이콘 모두 조회
     */
    public List<String> getAllIcon(Long teamId) {
        return teamIconRepository.findByTeamId(teamId)
                                 .stream()
                                 .map(icon -> icon.getIconName())
                                 .collect(Collectors.toList());
    }

    /*
        팀 생성
     */

    public Team create(Team team) {
        Team savedTeam = teamRepository.save(team);
        String inviteLink = savedTeam.makeInviteLink();
        savedTeam.setInviteLink(inviteLink);
        return savedTeam;
    }

    /*
        팀 소개 변경
     */

    public ChangeTeamInfoResponse changeProfileInfo(Long teamId, String name, String content) {
        if(teamRepository.teamNameDuplicatedNoDeleted(name).isPresent() && !teamRepository.findById(teamId).orElseThrow(
                () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR))
                .getName().equals(name)
        ) {
            throw new CustomException(CustomExceptionList.TEAM_NAME_DUPLICATED);
        }

        Team team = teamRepository.findById(teamId)
                                  .orElseThrow(
                                          () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
                                  );
        team.changeTeamName(name);
        team.setContent(content);

        ChangeTeamInfoResponse changeTeamInfoResponse = new ChangeTeamInfoResponse();
        changeTeamInfoResponse.setName(name);
        changeTeamInfoResponse.setContent(content);

        return changeTeamInfoResponse;
    }

    /*
        팀 쉴드 추가
     */

    public int addShield(Long teamId, int value) {
        Team team = teamRepository.findById(teamId)
                                  .orElseThrow(
                                          () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
                                  );
        team.addShieldCount(value);

        return team.getShieldCount();
    }

    /*
        팀 쉴드 사용
     */
    public String useShield(Long teamId) {
        Team team = teamRepository.findById(teamId)
                                  .orElseThrow(
                                          () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
                                  );
        team.useShield();

        return String.valueOf(team.getShieldCount());
    }

    /*
        초대링크 조회
     */
    public String getInviteLink(Long teamId) {
        Team team = teamRepository.findById(teamId)
                                  .orElseThrow(
                                          () -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR)
                                  );
        return team.getInviteLink();
    }

    public Long getTeamIdByInviteLink(String inviteLink) {
        Team team = teamRepository.findByInviteLink(inviteLink)
                                  .orElseThrow(() -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR));
        return team.getId();
    }

    // @author 황승주
    public boolean isNameDuplicate(String name) {
        if (teamRepository.teamNameDuplicatedNoDeleted(name).isPresent()){
            return true;
        }
        return false;
    }
}
