package zipzong.zipzong.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zipzong.zipzong.domain.Registration;
import zipzong.zipzong.domain.Team;
import zipzong.zipzong.repository.MemberRepository;
import zipzong.zipzong.repository.RegistrationRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    final MemberRepository memberRepository;
    final RegistrationRepository registrationRepository;

    public void updateNickName(String origin, String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            throw new IllegalStateException("닉네임 중복");
        }
        memberRepository.findByNickname(origin)
                        .orElseThrow()
                        .changeNickname(nickname);
    }

    public List<Registration> findJoinedTeam(Long memberId){
        return registrationRepository.findJoinedTeam(memberId);
    }

}
