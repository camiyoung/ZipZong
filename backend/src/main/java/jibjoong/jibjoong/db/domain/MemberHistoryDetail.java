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
@Table(name = "member_history_detail")
public class MemberHistoryDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_history_detail_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memeber_history_id")
    private MemberHistory memberHistory;

    @Column(name = "exercise_name")
    private String exerciseName;

    @Column(name = "exercise_time")
    private int exerciseTime;

    @Column(name = "exercise_num")
    private int exerciseNum;

    @Builder
    MemberHistoryDetail(Long id, MemberHistory memberHistory, String exerciseName, int exerciseNum, int exerciseTime) {
        this.id = id;
        this.memberHistory = memberHistory;
        this.exerciseName = exerciseName;
        this.exerciseNum = exerciseNum;
        this.exerciseTime = exerciseTime;
    }
}
