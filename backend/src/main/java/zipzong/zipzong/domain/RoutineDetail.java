package zipzong.zipzong.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Table(name="routine_detail")
public class RoutineDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="routine_detail_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id")
    private Routine routine;

    @Column(name = "routine_detail_name", nullable = false)
    private String name;

    @Column(name = "exercise_count", nullable = false)
    private int count;

    @Column(name="exercise_order", nullable = false)
    private int exerciseOrder;
}
