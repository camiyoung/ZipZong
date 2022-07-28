package zipzong.zipzong.db.domain;

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

    @OneToOne(mappedBy = "teamHistory", fetch = FetchType.LAZY)
    private Team team;

    @Builder
    public TeamHistory(Long id, int maximumStrick, int currentStrick) {
        this.id = id;
        this.maximumStrick = maximumStrick;
        this.currentStrick = currentStrick;
    }
}
