package zipzong.zipzong.db.repository.exercise;

import org.springframework.data.jpa.repository.JpaRepository;
import zipzong.zipzong.db.domain.TeamCalendar;

import java.util.List;

public interface TeamCalendarRepository extends JpaRepository<TeamCalendar, Long> {
    List<TeamCalendar> findByTeamId(Long teamId);
}
