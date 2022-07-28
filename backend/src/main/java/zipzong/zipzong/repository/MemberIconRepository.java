package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zipzong.zipzong.domain.MemberIcon;

import java.util.List;

public interface MemberIconRepository extends JpaRepository<MemberIcon,Long> {
    List<MemberIcon> findByMemberId(Long memberId);
}
