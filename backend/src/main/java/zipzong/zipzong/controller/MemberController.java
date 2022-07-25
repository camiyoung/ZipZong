package zipzong.zipzong.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zipzong.zipzong.domain.Member;
import zipzong.zipzong.dto.common.BasicResponse;
import zipzong.zipzong.dto.member.MemberResponse;
import zipzong.zipzong.repository.MemberRepository;
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/member")
public class MemberController {
    MemberRepository memberRepository;

    static final String SUCCESS = "success";

    // 유저 정보 조회
    @GetMapping("/info/{nickname}")
    public ResponseEntity<BasicResponse<MemberResponse>> memberInfo(@PathVariable String nickname) {
        Member member = memberRepository.findByNickname(nickname)
                .orElseThrow();


        return new ResponseEntity<>(makeBasicResponse(SUCCESS, member.toMemberResponse()), HttpStatus.OK);
    }


    private BasicResponse<MemberResponse> makeBasicResponse(String message, MemberResponse data) {
        return BasicResponse
                .<MemberResponse>builder()
                .message(message)
                .data(data)
                .build();
    }
}
