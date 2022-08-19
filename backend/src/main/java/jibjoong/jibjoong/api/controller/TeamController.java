package jibjoong.jibjoong.api.controller;

import jibjoong.jibjoong.api.dto.common.BasicResponse;
import jibjoong.jibjoong.api.dto.team.request.TeamProfileRequest;
import jibjoong.jibjoong.api.dto.team.response.ChangeTeamInfoResponse;
import jibjoong.jibjoong.api.dto.team.response.TeamIconResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jibjoong.jibjoong.api.service.TeamService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
public class TeamController {
    final TeamService teamService;
    static final String SUCCESS = "success";


    /*
        팀 프로필 수정
     */
    @PutMapping("/info")
    public ResponseEntity<BasicResponse<ChangeTeamInfoResponse>> changeTeamProfile(@RequestBody TeamProfileRequest teamProfileRequest) {
        ChangeTeamInfoResponse changeTeamInfoResponse = teamService.changeProfileInfo(teamProfileRequest.getTeamId(), teamProfileRequest.getName(), teamProfileRequest.getContent());
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, changeTeamInfoResponse), HttpStatus.CREATED);
    }

    /*
        팀 대표 아이콘 변경
     */
    @PutMapping("/rep-icon")
    public ResponseEntity<BasicResponse<String>> changeTeamRepIcon(@RequestBody TeamIconResponse teamIconResponse) {
        String changedIcon = teamService.setRepIcon(teamIconResponse.getTeamId(), teamIconResponse.getIconName());
        return new ResponseEntity<>(makeBasicResponse(SUCCESS,changedIcon), HttpStatus.CREATED);

    }

    /*
        팀 아이콘 추가
     */
    @PostMapping("/icon")
    public  ResponseEntity<BasicResponse<String>> addTeamIcon(@RequestBody TeamIconResponse teamIconResponse) {
        String addedIcon = teamService.addIcon(teamIconResponse.getTeamId(),teamIconResponse.getIconName());
        return new ResponseEntity<>(makeBasicResponse(SUCCESS,addedIcon), HttpStatus.CREATED);
    }

    /*
        팀 아이디의 모든 아이콘 조회
     */
    @GetMapping("/icons/{team-id}")
    public ResponseEntity<BasicResponse<List<String>>> getAllIcon(@PathVariable("team-id") Long teamId) {
        List<String> allIcon = teamService.getAllIcon(teamId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS,allIcon), HttpStatus.OK);
    }

    /*
        팀 아이디로 쉴드 하나 사용
     */
    @PutMapping("/shield/{team-id}")
    public ResponseEntity<BasicResponse<String>> useShield(@PathVariable("team-id") Long teamId) {
        String remainShieldCount = teamService.useShield(teamId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS,remainShieldCount), HttpStatus.CREATED);
    }
    /*
        팀 아이디로 초대 링크 조회
     */
    @GetMapping("/invite-link/{team-id}")
    public ResponseEntity<BasicResponse<String>> getInviteLink(@PathVariable("team-id") Long teamId) {
        String inviteLink = teamService.getInviteLink(teamId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS,inviteLink), HttpStatus.OK);
    }

    /*
        초대 링크로 팀 아이디 조회
     */
    @GetMapping("/{invite-link}")
    public ResponseEntity<BasicResponse<Long>> getTeamIdByInviteLink(@PathVariable("invite-link") String inviteLink) {
        Long teamId = teamService.getTeamIdByInviteLink(inviteLink);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS,teamId), HttpStatus.OK);
    }

    // @author 황승주
    // 그룹명 중복체크
    @GetMapping("/duplicate/{name}")
    public ResponseEntity<BasicResponse<String>> CheckNameDuplicated(@PathVariable String name) {
        boolean result = teamService.isNameDuplicate(name);
        String responseMessage = result ? "DUPLICATE" : "NON-DUPLICATE";
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseMessage), HttpStatus.OK);
    }

    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }


}
