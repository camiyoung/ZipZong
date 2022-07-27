package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zipzong.zipzong.domain.ExerciseDetail;

public interface ExerciseDetailRepository extends JpaRepository<ExerciseDetail, Long> {
}
