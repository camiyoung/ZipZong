package jibjoong.jibjoong.db.repository.exercise;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import jibjoong.jibjoong.db.domain.MemberCalendar;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MemberCalendarRepository extends JpaRepository<MemberCalendar, Long> {
    // @author 황승주
    Optional<MemberCalendar> findByMemberIdAndCheckDate(Long memberId, LocalDate checkDate);

    @Query("select c from MemberCalendar c where c.member.id = :memberId " +
            "and YEAR(c.checkDate) = :year " +
            "and MONTH(c.checkDate) = :month")
    List<MemberCalendar> isMonthExercised(@Param("memberId") Long memberId, @Param("year") int year, @Param("month") int month);
}
