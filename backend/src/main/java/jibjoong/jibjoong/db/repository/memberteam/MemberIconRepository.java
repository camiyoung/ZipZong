package jibjoong.jibjoong.db.repository.memberteam;

import org.springframework.data.jpa.repository.JpaRepository;
import jibjoong.jibjoong.db.domain.MemberIcon;

import java.util.List;

public interface MemberIconRepository extends JpaRepository<MemberIcon,Long> {
    List<MemberIcon> findByMemberId(Long memberId);
}
