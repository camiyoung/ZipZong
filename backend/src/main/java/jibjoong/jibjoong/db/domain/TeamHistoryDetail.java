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
@Table(name = "team_history_detail")
public class TeamHistoryDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_history_detail_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_history_id")
    private TeamHistory teamHistory;

    @Column(name = "exercise_name")
    private String exerciseName;

    @Column(name = "exercise_num")
    private int exerciseNum;

    @Column(name = "exercise_time")
    private int exerciseTime;


    @Builder
    TeamHistoryDetail(Long id, TeamHistory teamHistory, String exerciseName, int exerciseNum, int exerciseTime) {
        this.id = id;
        this.teamHistory = teamHistory;
        this.exerciseName = exerciseName;
        this.exerciseNum = exerciseNum;
        this.exerciseTime = exerciseTime;
    }
}
