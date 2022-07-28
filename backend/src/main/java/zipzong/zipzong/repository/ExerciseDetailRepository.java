package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import zipzong.zipzong.domain.ExerciseDetail;

import java.util.List;

public interface ExerciseDetailRepository extends JpaRepository<ExerciseDetail, Long> {

    @EntityGraph(attributePaths = {"team", "registration", "exercise"})
    @Query("select d from ExerciseDetail d where d.exercise.id in" +
            "(select e.id from Exercise e where YEAR(e.exerciseDate) =: year" +
            " and MONTH(e.exerciseDate) =: month" +
            " and e.registration.id in" +
            "(select r.id from Registration r where r.team.id =: teamId))")
    List<ExerciseDetail> getTeamMonthlyHistory(@Param("teamId") Long teamId,
                                               @Param("year") int year,
                                               @Param("month") int month);

    @EntityGraph(attributePaths = {"member", "registration", "exercise"})
    @Query("select d from ExerciseDetail d where d.exercise.id in" +
            "(select e.id from Exercise e where YEAR(e.exerciseDate) =: year" +
            " and MONTH(e.exerciseDate) =: month" +
            " and e.registration.id in" +
            "(select r.id from Registration r where r.member.id =: memberId))")
    List<ExerciseDetail> getMemberMonthlyHistory(@Param("memberId") Long memberId,
                                                @Param("year") int year,
                                                @Param("month") int month);
}
