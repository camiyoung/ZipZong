package zipzong.zipzong.db.repository.memberteam;

import org.springframework.data.jpa.repository.JpaRepository;
import zipzong.zipzong.db.domain.MemberIcon;

import java.util.List;

public interface MemberIconRepository extends JpaRepository<MemberIcon,Long> {
    List<MemberIcon> findByMemberId(Long memberId);
}
