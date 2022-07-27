package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zipzong.zipzong.domain.MemberHistoryDetail;

public interface MemberHistoryDetailRepository extends JpaRepository<MemberHistoryDetail, Long> {
}
