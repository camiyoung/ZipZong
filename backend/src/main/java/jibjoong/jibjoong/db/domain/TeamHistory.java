package jibjoong.jibjoong.db.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Table(name = "team_history")
public class TeamHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_history_id")
    private Long id;

    @Column(name = "maximum_strick")
    private int maximumStrick;

    @Column(name = "current_strick")
    private int currentStrick;

    @Column(name = "hall_of_fame_date")
    private LocalDate hallOfFameDate;

    @OneToOne(mappedBy = "teamHistory", fetch = FetchType.LAZY)
    private Team team;

    public void setMaximumStrick(int maximumStrick) {
        this.maximumStrick = maximumStrick;
    }

    public void setCurrentStrick(int currentStrick) {
        this.currentStrick = currentStrick;
    }

    public void setHallOfFameDate(LocalDate hallOfFameDate) {
        this.hallOfFameDate = hallOfFameDate;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    @Builder
    public TeamHistory(Long id, int maximumStrick, int currentStrick) {
        this.id = id;
        this.maximumStrick = maximumStrick;
        this.currentStrick = currentStrick;
    }
}
