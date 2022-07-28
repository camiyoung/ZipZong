package zipzong.zipzong.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zipzong.zipzong.domain.Member;
import zipzong.zipzong.domain.MemberIcon;
import zipzong.zipzong.domain.Registration;
import zipzong.zipzong.dto.common.BasicResponse;
import zipzong.zipzong.dto.icon.IconResponse;
import zipzong.zipzong.dto.member.MemberResponse;
import zipzong.zipzong.dto.nickname.NicknameChangeResponse;
import zipzong.zipzong.dto.nickname.NicknameSetResponse;
import zipzong.zipzong.dto.team.TeamResponse;
import zipzong.zipzong.service.MemberService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/member")
public class MemberController {
    final MemberService memberService;
    static final String SUCCESS = "success";

    /*
        닉네임으로 회원 정보 조회
     */
    @GetMapping("/info/{nickname}")
    public ResponseEntity<BasicResponse<MemberResponse>> memberInfo(@PathVariable(value = "nickname") String nickname) {

        Member member = memberService.getUserInfo(nickname);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, member.toMemberResponse()), HttpStatus.OK);
    }

    /*
        회원 닉네임 설정/ 변경 전 중복 확인
     */

    @GetMapping("/duplicate/{nickname}")
    public ResponseEntity<BasicResponse<String>> CheckNicknameDuplicated(@PathVariable String nickname) {
        boolean result = memberService.isNicknameDuplicate(nickname);
        String responseMessage = result ? "DUPLICATE" : "NON-DUPLICATE";
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseMessage), HttpStatus.OK);
    }


    /*
        회원 아이콘 리스트 조회
     */
    @GetMapping("/icon/{member-id}")
    public ResponseEntity<BasicResponse<List<String>>> getAllIconList(@PathVariable("member-id") Long memberId) {
        List<String> icons = memberService.getAllIcon(memberId);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, icons), HttpStatus.OK);
    }

    /*
        대표 아이콘 수정
    */
    @PutMapping("/rep-icon")
    public ResponseEntity<BasicResponse<String>> changeRepIcon(@RequestBody IconResponse repIconResponse) {

        String repIcon = memberService.setRepIcon(repIconResponse.getNickname(), repIconResponse.getIcon());

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, repIcon), HttpStatus.CREATED);
    }

    /*
        회원 아이콘 추가
     */
    @PostMapping("/icon")
    public ResponseEntity<BasicResponse<String>> addIcon(@RequestBody IconResponse iconResponse) {
        String icon = memberService.addIcon(iconResponse.getNickname(), iconResponse.getIcon());
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, icon), HttpStatus.CREATED);
    }

    /*
        가입시 회원 닉네임 입력
        input : 회원id, 설정할 nickname
        return : 회원정보
     */
    @PostMapping("/nickname")
    public ResponseEntity<BasicResponse<MemberResponse>> setNickname(@RequestBody NicknameSetResponse nicknameSetResponse) {

        Member member = memberService.setNickName(nicknameSetResponse);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, member.toMemberResponse()), HttpStatus.CREATED);
    }

    /*
        회원 닉네임 변경
        input : 기존 nickname, 변경할 nickname
        return : 변경된 회원 닉네임
     */
    @PutMapping("/nickname")
    public ResponseEntity<BasicResponse<String>> changeNickname(@RequestBody NicknameChangeResponse nicknameChangeResponse) {

        memberService.updateNickName(nicknameChangeResponse.getOrigin(), nicknameChangeResponse.getNickname());
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, nicknameChangeResponse.getNickname()), HttpStatus.CREATED);
    }

    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
