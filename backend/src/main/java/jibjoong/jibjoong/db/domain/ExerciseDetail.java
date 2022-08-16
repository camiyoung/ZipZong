package jibjoong.jibjoong.db.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Table(name = "exercise_detail") //테이블 관련 설정 어노테이션
public class ExerciseDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_detail_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @Column(name = "exercise_name")
    private String exerciseName;

    @Column(name = "exercise_num")
    private int exerciseNum;

    @Builder
    public ExerciseDetail (Long id, Exercise exercise, String exerciseName, int exerciseNum) {
        this.id = id;
        this.exercise = exercise;
        this.exerciseName = exerciseName;
        this.exerciseNum = exerciseNum;
    }
}
