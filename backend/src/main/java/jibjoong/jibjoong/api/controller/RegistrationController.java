package jibjoong.jibjoong.api.controller;

import jibjoong.jibjoong.api.dto.common.BasicResponse;
import jibjoong.jibjoong.api.dto.team.TeamMemberId;
import jibjoong.jibjoong.api.dto.team.request.CreateTeamRequest;
import jibjoong.jibjoong.api.dto.team.request.TeamInfoRequest;
import jibjoong.jibjoong.api.dto.team.request.TeamLeaderAssignRequest;
import jibjoong.jibjoong.api.dto.team.response.TeamResponse;
import jibjoong.jibjoong.api.service.RegistrationService;
import jibjoong.jibjoong.db.domain.Team;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/registration")
public class RegistrationController {
    final RegistrationService registrationService;
    static final String SUCCESS = "success";

    /*
        회원이 가입한 그룹 조회
     */
    @GetMapping("/member/{member-id}")
    public ResponseEntity<BasicResponse<List<TeamResponse>>> getMemberJoinedTeam(@PathVariable("member-id") Long memberId) {
        List<TeamResponse> result = registrationService.findJoinedTeam(memberId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, result), HttpStatus.OK);
    }

    /*
        팀의 디테일 정보 조회
     */
    @GetMapping("/team/{team-id}")
    public ResponseEntity<BasicResponse<TeamInfoRequest>> getTeamDetailInfo(@PathVariable("team-id") Long teamId) {
        TeamInfoRequest teamInfo = registrationService.getTeamInfo(teamId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, teamInfo), HttpStatus.OK);
    }

    /*
        초기 만든 사람은 그룹장이 되며 팀 생성
        팀아이디,멤버아이디 반환
     */
    @PostMapping("/create")
    public ResponseEntity<BasicResponse<TeamMemberId>> createTeam(@RequestBody CreateTeamRequest createTeamRequest) {
        Team team = getTeam(createTeamRequest);
        TeamMemberId teamMemberId = registrationService.createTeam(team, createTeamRequest.getMemberId());

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, teamMemberId), HttpStatus.CREATED);
    }

    private Team getTeam(CreateTeamRequest joinTeamRequest) {
        Team team = Team.builder()
                .name(joinTeamRequest.getName())
                .repIcon(joinTeamRequest.getRepIcon())
                .build();
        team.setContent(joinTeamRequest.getContent());
        return team;
    }

    /*
        초대 링크를 통해 그룹 가입 수락 시
     */
    @PostMapping("/join")
    public ResponseEntity joinTeam(@RequestBody TeamMemberId teamMemberId) {
        registrationService.joinTeam(teamMemberId.getTeamId(), teamMemberId.getMemberId());
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, null), HttpStatus.CREATED);
    }

    /*
        그룹원이 그룹을 탈퇴하는 경우
     */

    @PutMapping("/team/resign")
    public ResponseEntity resignTeam(@RequestBody TeamMemberId teamMemberId) {
        Long resignMemberId = registrationService.resignTeam(teamMemberId.getMemberId(), teamMemberId.getTeamId());
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, resignMemberId), HttpStatus.CREATED);

    }

    /*
        그룹장이 그룹원을 강퇴하는 경우
     */

    @PutMapping("/team/expel")
    public ResponseEntity expelMember(@RequestBody TeamLeaderAssignRequest teamLeaderAssignRequest) throws Exception {
        Long followerId = registrationService.expelMember(teamLeaderAssignRequest.getLeaderId(), teamLeaderAssignRequest.getFollowerId(), teamLeaderAssignRequest.getTeamId());
        return new ResponseEntity<>(makeBasicResponse(SUCCESS,followerId), HttpStatus.CREATED);
    }
    /*
       그룹장이 그룹원에게 그룹장을 위임하는 경우
       return 리더가 된 그룹원의 아이디
     */

    @PutMapping("/team/assign")
    public ResponseEntity delegateLeader(@RequestBody TeamLeaderAssignRequest teamLeaderAssignRequest) throws Exception{
        Long followerId = registrationService.delegateLeader(teamLeaderAssignRequest.getLeaderId(), teamLeaderAssignRequest.getFollowerId(), teamLeaderAssignRequest.getTeamId());
        return new ResponseEntity<>(makeBasicResponse(SUCCESS,followerId), HttpStatus.CREATED);
    }

    /*
        그룹장이 그룹을 제거하는 경우, 소속한 팀원들도 모두 탈퇴처리 됨
     */
    @PutMapping("/delete-team")
    public ResponseEntity deleteTeam(@RequestBody TeamMemberId teamMemberId) throws Exception{
        Long teamId = registrationService.deleteTeam(teamMemberId.getTeamId(), teamMemberId.getMemberId());
        return new ResponseEntity<>(makeBasicResponse(SUCCESS,teamId), HttpStatus.CREATED);
    }

    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
