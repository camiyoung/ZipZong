package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zipzong.zipzong.domain.Routine;
import zipzong.zipzong.domain.Team;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Long> {

    Optional<Routine> findById(Long routineId);

    List<Routine> findRoutineByTeam(Team team);


}
