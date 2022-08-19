package jibjoong.jibjoong.db.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Table(
        name = "member_icon"
        , indexes = {
        @Index(name = "unique_idx_member_icon", columnList = "member_id, icon_name", unique = true)
}
)
public class MemberIcon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_icon_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "icon_name")
    private String iconName;

    @Builder
    public MemberIcon(Long id, Member member, String iconName) {
        this.id = id;
        this.member = member;
        this.iconName = iconName;
    }

    static public MemberIcon addMemberIcon(Member member, String iconName) {
        return MemberIcon.builder()
                         .member(member)
                         .iconName(iconName)
                         .build();

    }

}
