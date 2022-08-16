package jibjoong.jibjoong.db.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;


@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Table(name = "exercise",
        indexes = {
        @Index(name = "date_idx", columnList = "exercise_date")
}) //테이블 관련 설정 어노테이션
@EntityListeners(AuditingEntityListener.class)
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registration_id")
    private Registration registration;

    @CreatedDate
    @Column(name = "exercise_date")
    private LocalDate exerciseDate;

    @Column(name = "exercise_time")
    private int exerciseTime;

    public void setExerciseTime(int exerciseTime) {
        this.exerciseTime = exerciseTime;
    }

    @Builder
    public Exercise(Long id, Registration registration, LocalDate exerciseDate, int exerciseTime) {
        this.id = id;
        this.registration = registration;
        this.exerciseDate = exerciseDate;
        this.exerciseTime = exerciseTime;
    }
}
