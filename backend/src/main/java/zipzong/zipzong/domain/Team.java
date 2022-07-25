package zipzong.zipzong.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Table(name = "team")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "invite_link", unique = true)
    private String inviteLink;

    @CreatedDate
    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "shield_count")
    private int shieldCount;

    @Builder
    public Team(Long id, String name, String inviteLink, LocalDateTime createDate, int shieldCount) {
        this.id = id;
        this.name = name;
        this.inviteLink = inviteLink;
        this.createDate = createDate;
        this.shieldCount = shieldCount;
    }

    public void changeTeamName(String name) {
        this.name = name;
    }

    public void addShieldCount(int value) {
        shieldCount += value;
    }

    public void useShield() {
        this.shieldCount--;

        if (shieldCount < 0) {
            throw new IllegalStateException();
        }
    }

    public void makeInviteLink() {
        /*
        jwt 토큰 사용해서 TeamID를 넣어서 암호화하는 방법,
        base64 인코딩

            초대링크 만드는 로직
         */
    }

}
