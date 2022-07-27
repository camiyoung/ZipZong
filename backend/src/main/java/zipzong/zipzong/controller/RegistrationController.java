package zipzong.zipzong.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import zipzong.zipzong.domain.Registration;
import zipzong.zipzong.dto.common.BasicResponse;
import zipzong.zipzong.dto.team.TeamResponse;
import zipzong.zipzong.service.RegistrationService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/registration")
public class RegistrationController {
    final RegistrationService registrationService;

      /*
        회원이 가입한 그룹 조회
     */

    @GetMapping("/team/{member-id}")
    public ResponseEntity<BasicResponse<List<TeamResponse>>> getMemberJoinedTeam(@PathVariable("member-id") Long memberId) {
        List<Registration> result = registrationService.findJoinedTeam(memberId);
        for (Registration registration : result) {
            System.out.println(registration.getTeam());
        }

        return null;
    }
}
