package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import zipzong.zipzong.domain.MemberHistory;

import java.util.Optional;

public interface MemberHistoryRepository extends JpaRepository<MemberHistory, Long> {
    @EntityGraph(attributePaths = {"member"})
    @Query("select h from MemberHistory h where h.member.id =: memberId")
    Optional<MemberHistory> findByMemberId(@Param("memberId") Long memberId);
}
