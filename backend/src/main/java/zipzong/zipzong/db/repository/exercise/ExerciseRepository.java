package zipzong.zipzong.db.repository.exercise;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import zipzong.zipzong.db.domain.Exercise;

import java.time.LocalDate;
import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Optional<Exercise> findByRegistrationIdAndExerciseDate(Long id, LocalDate today);

    Optional<Exercise> findTop1ByRegistrationIdOrderByExerciseDateDesc(Long id);
}
