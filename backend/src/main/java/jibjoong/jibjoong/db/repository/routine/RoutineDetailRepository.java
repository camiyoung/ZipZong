package jibjoong.jibjoong.db.repository.routine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jibjoong.jibjoong.db.domain.RoutineDetail;

import java.util.List;

@Repository
public interface RoutineDetailRepository extends JpaRepository<RoutineDetail, Long> {
    List<RoutineDetail> findRoutineDetailByRoutineId(Long routineId);
}
