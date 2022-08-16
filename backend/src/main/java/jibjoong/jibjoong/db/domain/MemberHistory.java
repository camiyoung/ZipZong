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
@Table(name = "member_history")
public class MemberHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_history_id")
    private Long id;

    @Column(name = "maximum_strick")
    private int maximumStrick;

    @Column(name = "current_strick")
    private int currentStrick;

    @OneToOne(mappedBy = "memberHistory", fetch = FetchType.LAZY)
    private Member member;

    public void setMember(Member member) {
        this.member = member;
    }

    public void setMaximumStrick(int maximumStrick) {
        this.maximumStrick = maximumStrick;
    }

    public void setCurrentStrick(int currentStrick) {
        this.currentStrick = currentStrick;
    }
    @Builder
    public MemberHistory(Long id, int maximumStrick, int currentStrick) {
        this.id = id;
        this.maximumStrick = maximumStrick;
        this.currentStrick = currentStrick;
    }
}
