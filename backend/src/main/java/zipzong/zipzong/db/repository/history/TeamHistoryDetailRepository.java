package zipzong.zipzong.db.repository.history;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import zipzong.zipzong.db.domain.TeamHistoryDetail;

import java.util.List;

public interface TeamHistoryDetailRepository extends JpaRepository<TeamHistoryDetail, Long> {
    @EntityGraph(attributePaths = {"teamHistory"})
    @Query("select d from TeamHistoryDetail d where d.teamHistory.id = :teamHistoryId")
    List<TeamHistoryDetail> findByTeamHistoryId(@Param("teamHistoryId") Long teamHistoryId);

    @EntityGraph(attributePaths = {"teamHistory"})
    @Query("select d from TeamHistoryDetail d where d.teamHistory.id in " +
            "(select h.id from TeamHistory h where h.team.id = :teamId)")
    List<TeamHistoryDetail> teamAllTime(@Param("teamId") Long teamId);

}
