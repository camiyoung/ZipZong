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
import zipzong.zipzong.repository.MemberRepository;

import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/member")
public class MemberController {
    MemberRepository memberRepository;

    // 유저 정보 조회
    @GetMapping("/info/{nickname}")
    public ResponseEntity<Member> memberInfo(@PathVariable String nickname) {
        return new ResponseEntity<Member>(memberRepository.findByNickname(nickname)
                .orElseThrow(), HttpStatus.OK);
    }
}
