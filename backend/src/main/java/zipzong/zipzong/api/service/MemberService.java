package zipzong.zipzong.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zipzong.zipzong.db.domain.Member;
import zipzong.zipzong.db.domain.MemberIcon;
import zipzong.zipzong.api.dto.nickname.NicknameSetResponse;
import zipzong.zipzong.db.repository.memberteam.MemberIconRepository;
import zipzong.zipzong.db.repository.memberteam.MemberRepository;
import zipzong.zipzong.exception.CustomException;
import zipzong.zipzong.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberIconRepository memberIconRepository;

    public boolean isNicknameDuplicate(String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            return true;
        }
        return false;
    }

    public String updateNickName(String origin, String nickname) {
        if (memberRepository.existsByNickname(nickname)) {
            throw new IllegalStateException("닉네임 중복");
        }
        memberRepository.findByNickname(origin)
                        .orElseThrow(
                                () -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR)
                        )
                        .changeNickname(nickname);
        return nickname;
    }


    public Member getUserInfo(String nickname) {
        return memberRepository.findByNickname(nickname)
                               .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));
    }

    public Member setNickName(NicknameSetResponse nicknameSetResponse) {

        Member member = memberRepository.findById(nicknameSetResponse.getMemberId())
                                        .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));
        member.changeNickname(nicknameSetResponse.getNickname());
        return member;
    }

    public String setRepIcon(String nickname, String repIcon) {
        memberRepository.findByNickname(nickname)
                        .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR))
                        .setRepIcon(repIcon);
        return repIcon;
    }

    public String addIcon(String nickname, String icon) {
        Member member = memberRepository.findByNickname(nickname)
                                        .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND_ERROR));
        MemberIcon memberIcon = MemberIcon.addMemberIcon(member, icon);
        MemberIcon savedMemberIcon = memberIconRepository.save(memberIcon);

        return savedMemberIcon.getIconName();
    }

    public List<String> getAllIcon(Long memberId) {
        return memberIconRepository.findByMemberId(memberId)
                                   .stream()
                                   .map(icon -> icon.getIconName())
                                   .collect(Collectors.toList());
    }

}
