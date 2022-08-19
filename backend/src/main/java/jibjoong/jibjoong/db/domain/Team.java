package jibjoong.jibjoong.db.domain;

import jibjoong.jibjoong.enums.CheckExist;
import jibjoong.jibjoong.exception.CustomException;
import jibjoong.jibjoong.exception.CustomExceptionList;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Table(name = "team",
        indexes = {
                @Index(name = "link_idx", columnList = "invite_link")
        })
@EntityListeners(AuditingEntityListener.class)
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "content")
    private String content;

    @OneToMany(mappedBy = "team",fetch = FetchType.LAZY)
    Collection<Registration> registrationList = new ArrayList<>();

    @Column(name = "invite_link", unique = true)
    private String inviteLink;

    @CreatedDate
    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "shield_count")
    private int shieldCount;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "team_history_id")
    private TeamHistory teamHistory;

    @Column(name = "rep_icon", nullable = false)
    private String repIcon;
    @Enumerated(EnumType.STRING)
    @Column(name = "is_deleted")
    private CheckExist isDeleted;


    @Builder
    public Team(Long id, String name, String inviteLink, LocalDateTime createDate, int shieldCount, String repIcon) {
        this.id = id;
        this.name = name;
        this.inviteLink = inviteLink;
        this.createDate = createDate;
        this.shieldCount = shieldCount;
        this.repIcon = repIcon;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setRepIcon(String repIcon) {
        this.repIcon = repIcon;
    }

    public void setIsDeleted(CheckExist value) {
        this.isDeleted = value;
    }

    public void setTeamHistory(TeamHistory teamHistory) {
        this.teamHistory = teamHistory;
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
            throw new CustomException(CustomExceptionList.SHIELD_COUNT_NO_NEGATIVE);
        }
    }

    /*
        base62 인코딩
        초대링크 만드는 로직
     */
    static final char[] BASE62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".toCharArray();

    public String makeInviteLink() {
        final StringBuilder sb = new StringBuilder();
        int value = this.id.intValue() + 100_000;
        do{
            int i = value % 62;
            sb.append(BASE62[i]);
            value /= 62;
        } while( value > 0);
        return sb.toString();
    }

    public void setInviteLink(String inviteLink){
        this.inviteLink =inviteLink;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

}
