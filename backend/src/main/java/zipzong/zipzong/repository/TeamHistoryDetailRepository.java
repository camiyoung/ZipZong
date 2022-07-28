package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import zipzong.zipzong.domain.TeamHistoryDetail;

import java.util.List;

public interface TeamHistoryDetailRepository extends JpaRepository<TeamHistoryDetail, Long> {
    @EntityGraph(attributePaths = {"team_history"})
    @Query("select d from TeamHistoryDetail d where d.teamHistory.id =: teamHistoryId")
    List<TeamHistoryDetail> findByTeamHistoryId(@Param("teamHistoryId") Long teamHistoryId);
}
