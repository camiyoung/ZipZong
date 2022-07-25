package zipzong.zipzong.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zipzong.zipzong.domain.Member;
import zipzong.zipzong.dto.common.BasicResponse;
import zipzong.zipzong.dto.member.MemberResponse;
import zipzong.zipzong.repository.MemberRepository;
import zipzong.zipzong.service.MemberService;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/member")
public class MemberController {
    MemberService memberService;
    static final String SUCCESS = "success";

    /*
        닉네임으로 회원 정보 조회
     */
    @GetMapping("/info/{nickname}")
    public ResponseEntity<BasicResponse<MemberResponse>> memberInfo(@PathVariable String nickname) {

        Member member = memberService.getUserInfo(nickname);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, member.toMemberResponse()), HttpStatus.OK);
    }

    /*
        회원 닉네임 설정/ 변경 전 중복 확인
     */

    @GetMapping("/duplicate/{nickname}")
    public ResponseEntity checkNickname(@PathVariable String nickname) {
        boolean result = memberService.isNicknameDuplicate(nickname);
        String responseMessage = result ? "DUPLICATE" : "NON-DUPLICATE";
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, responseMessage), HttpStatus.OK);
    }


    /*
        가입시 회원 닉네임 입력
     */
    @PostMapping("/nickname")
    public ResponseEntity<BasicResponse<MemberResponse>> setNickName(@RequestBody Long memberId, @RequestBody String nickname) {
        //헤더에서 토큰값 꺼내와서 id 조회
        Member member = memberService.setNickName(memberId, nickname);

        return new ResponseEntity<>(makeBasicResponse(SUCCESS, member.toMemberResponse()), HttpStatus.OK);
    }


    private BasicResponse<String> makeBasicResponse(String message, String responseMessage) {
        return BasicResponse.<String>builder().build();
    }

    private BasicResponse<MemberResponse> makeBasicResponse(String message, MemberResponse data) {
        return BasicResponse
                .<MemberResponse>builder()
                .message(message)
                .data(data)
                .build();
    }
}
