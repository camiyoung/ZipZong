package jibjoong.jibjoong.db.repository.routine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jibjoong.jibjoong.db.domain.Routine;
import jibjoong.jibjoong.db.domain.Team;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Long> {

    Optional<Routine> findById(Long routineId);

    List<Routine> findRoutineByTeam(Team team);


}
