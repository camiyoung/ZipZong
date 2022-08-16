package jibjoong.jibjoong.api.dto.nickname;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NicknameSetResponse {
    Long memberId;
    String nickname;

    public NicknameSetResponse(Long memberId, String nickname) {
        this.memberId = memberId;
        this.nickname = nickname;
    }
}
