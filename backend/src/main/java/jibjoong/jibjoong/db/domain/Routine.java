package jibjoong.jibjoong.db.domain;

import jibjoong.jibjoong.api.dto.routine.RoutineRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Table(name = "routine")
public class Routine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "routine_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "routine_name", nullable = false)
    private String name;

    @LastModifiedDate
    @Column(name = "update_date")
    private LocalDateTime updateDate;

    @Column(name = "break_time", nullable = false)
    private int breakTime;

    @Column(name = "total_time", nullable = false)
    private int totalTime;

    @OneToMany(mappedBy = "routine", cascade = CascadeType.ALL)
    private List<RoutineDetail> routineDetails = new ArrayList<>();

    @Builder
    public Routine(Long id, Team team, String name, int breakTime, int totalTime) {
        this.id = id;
        this.team = team;
        this.name = name;
        this.breakTime = breakTime;
        this.totalTime = totalTime;
    }

    public static Routine createRoutine(RoutineRequest routineRequest, Team team) {
        Routine routine = Routine.builder()
                .team(team)
                .name(routineRequest.getRoutineName())
                .breakTime(routineRequest.getBreakTime())
                .totalTime(routineRequest.getTotalTime())
                .build();
        return routine;
    }

    public static Routine updateRoutine(RoutineRequest routineRequest, Long routineId, Team team) {
        Routine routine = Routine.builder()
                .id(routineId)
                .team(team)
                .name(routineRequest.getRoutineName())
                .breakTime(routineRequest.getBreakTime())
                .totalTime(routineRequest.getTotalTime())
                .build();
        return routine;
    }

}
