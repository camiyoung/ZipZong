package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import zipzong.zipzong.domain.MemberHistoryDetail;
import zipzong.zipzong.domain.TeamHistoryDetail;

import java.util.List;

public interface MemberHistoryDetailRepository extends JpaRepository<MemberHistoryDetail, Long> {
    @EntityGraph(attributePaths = {"member_history"})
    @Query("select d from MemberHistoryDetail d where d.memberHistory.id =: memberHistoryId")
    List<MemberHistoryDetail> findByMemberHistoryId(@Param("memberHistoryId") Long memberHistoryId);
}
