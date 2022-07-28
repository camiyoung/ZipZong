package zipzong.zipzong.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zipzong.zipzong.dto.common.BasicResponse;
import zipzong.zipzong.dto.team.ChangeTeamInfoResponse;
import zipzong.zipzong.dto.team.TeamIconResponse;
import zipzong.zipzong.dto.team.TeamProfileRequest;
import zipzong.zipzong.service.TeamService;

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

    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }


}
