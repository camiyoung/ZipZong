package jibjoong.jibjoong.db.repository.exercise;

import org.springframework.data.jpa.repository.JpaRepository;
import jibjoong.jibjoong.db.domain.Exercise;

import java.time.LocalDate;
import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    // @author 황승주
    Optional<Exercise> findByRegistrationIdAndExerciseDate(Long id, LocalDate today);

    Optional<Exercise> findTop1ByRegistrationIdOrderByExerciseDateDesc(Long id);
}
