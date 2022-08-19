package jibjoong.jibjoong.db.repository.history;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import jibjoong.jibjoong.db.domain.TeamHistory;

import java.util.Optional;

public interface TeamHistoryRepository extends JpaRepository<TeamHistory, Long> {
    // @author 황승주
    @EntityGraph(attributePaths = {"team"})
    @Query("select h from TeamHistory h where h.team.id = :teamId")
    Optional<TeamHistory> findByTeamId(@Param("teamId") Long teamId);
}
