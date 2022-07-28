package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zipzong.zipzong.domain.Exercise;

import java.time.LocalDate;
import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Optional<Exercise> findByRegistrationIdAndExerciseDate(Long id, LocalDate today);
}
