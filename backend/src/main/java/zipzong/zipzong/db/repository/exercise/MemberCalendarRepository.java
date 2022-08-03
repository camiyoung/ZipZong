package zipzong.zipzong.db.repository.exercise;

import org.springframework.data.jpa.repository.JpaRepository;
import zipzong.zipzong.db.domain.MemberCalendar;

import java.util.List;

public interface MemberCalendarRepository extends JpaRepository<MemberCalendar, Long> {
    List<MemberCalendar> findByMemberId(Long MemberId);
}
