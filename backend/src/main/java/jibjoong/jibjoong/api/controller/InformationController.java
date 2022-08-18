package jibjoong.jibjoong.api.controller;

import jibjoong.jibjoong.api.dto.common.BasicResponse;
import jibjoong.jibjoong.api.dto.information.TeamDetailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jibjoong.jibjoong.api.dto.information.MemberDetailResponse;
import jibjoong.jibjoong.api.dto.information.TeamMemberDetailResponse;
import jibjoong.jibjoong.api.service.InformationService;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/information")
public class InformationController {
    // @author 황승주

    final InformationService informationService;
    static final String SUCCESS = "success";

    // 그룹 상세정보 조회
    @GetMapping("/team/{teamId}")
    public ResponseEntity<BasicResponse<TeamDetailResponse>> teamInfoDetail(@PathVariable Long teamId) {

        TeamDetailResponse response = informationService.getTeamInfoDetail(teamId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    // 멤버 상세정보 조회
    @GetMapping("/member/{memberId}")
    public ResponseEntity<BasicResponse<MemberDetailResponse>> memberInfoDetail(@PathVariable Long memberId) {

        MemberDetailResponse response = informationService.getMemberInfoDetail(memberId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    // 그룹원 상세정보 조회
    @GetMapping("/member/{teamId}/{memberId}")
    public ResponseEntity<BasicResponse<TeamMemberDetailResponse>> teamMemberInfoDetail(@PathVariable Long teamId, @PathVariable Long memberId) {

        TeamMemberDetailResponse response = informationService.getTeamMemberInfoDetail(teamId, memberId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, response), HttpStatus.OK);
    }

    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
