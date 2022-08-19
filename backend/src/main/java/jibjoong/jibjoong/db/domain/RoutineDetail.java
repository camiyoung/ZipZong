package jibjoong.jibjoong.db.domain;

import jibjoong.jibjoong.api.dto.routine.RoutineRequest;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Setter //지우기
@Table(name = "routine_detail")
public class RoutineDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "routine_detail_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id")
    private Routine routine;

    @Column(name = "routine_detail_name", nullable = false)
    private String name;

    @Column(name = "exercise_count", nullable = false)
    private int exerciseCount;

    @Column(name = "exercise_order", nullable = false)
    private int exerciseOrder;

    @Builder
    public RoutineDetail(Routine routine, String name, int exerciseCount, int exerciseOrder) {
        this.routine = routine;
        this.name = name;
        this.exerciseCount = exerciseCount;
        this.exerciseOrder = exerciseOrder;
    }

    public static RoutineDetail createRoutineDetail(Routine routine, int exerciseOrder, RoutineRequest.RoutineExercise routineExercise) {
        RoutineDetail routineDetail = RoutineDetail.builder()
                .routine(routine)
                .name(routineExercise.getName())
                .exerciseCount(routineExercise.getCount())
                .exerciseOrder(exerciseOrder)
                .build();
        return routineDetail;
    }
}
