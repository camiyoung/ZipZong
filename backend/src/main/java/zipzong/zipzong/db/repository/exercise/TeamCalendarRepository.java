package zipzong.zipzong.db.repository.exercise;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import zipzong.zipzong.db.domain.TeamCalendar;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TeamCalendarRepository extends JpaRepository<TeamCalendar, Long> {
    Optional<TeamCalendar> findByTeamIdAndCheckDate(Long teamId, LocalDate checkDate);

    @Query("select c from TeamCalendar c where c.team.id = :teamId " +
            "and YEAR(c.checkDate) = :year " +
            "and MONTH(c.checkDate) = :month")
    List<TeamCalendar> isMonthExercised(@Param("teamId")Long teamId, @Param("year") int year, @Param("month") int month);
}
