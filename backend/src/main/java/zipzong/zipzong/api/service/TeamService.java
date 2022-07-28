package zipzong.zipzong.api.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zipzong.zipzong.db.domain.Team;
import zipzong.zipzong.db.domain.TeamIcon;
import zipzong.zipzong.api.dto.team.response.ChangeTeamInfoResponse;
import zipzong.zipzong.db.repository.memberteam.TeamIconRepository;
import zipzong.zipzong.db.repository.memberteam.TeamRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;
    private final TeamIconRepository teamIconRepository;

    /*
        팀 대표아이콘 설정
     */
    public String setRepIcon(Long teamId, String repIcon) {
        teamRepository.findById(teamId)
                      .orElseThrow()
                      .setRepIcon(repIcon);
        return repIcon;
    }

    /*
        팀 아이콘 추가
     */
    public String addIcon(Long teamId, String icon) {
        Team team = teamRepository.findById(teamId)
                                  .orElseThrow();
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
        Team team = teamRepository.findById(teamId)
                                  .orElseThrow();
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
                                  .orElseThrow();
        team.addShieldCount(value);

        return team.getShieldCount();
    }

    /*
        팀 쉴드 사용
     */
    public String useShield(Long teamId) {
        Team team = teamRepository.findById(teamId)
                                  .orElseThrow();
        team.useShield();

        return String.valueOf(team.getShieldCount());
    }

    /*
        초대링크 조회
     */
    public String getInviteLink(Long teamId) {
        Team team = teamRepository.findById(teamId)
                                  .orElseThrow();
        return team.getInviteLink();
    }

}
