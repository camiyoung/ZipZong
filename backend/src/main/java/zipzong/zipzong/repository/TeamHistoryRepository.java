package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zipzong.zipzong.domain.TeamHistory;

import java.util.Optional;

public interface TeamHistoryRepository extends JpaRepository<TeamHistory, Long> {

    Optional<TeamHistory> findByTeamId(Long teamId);
}
