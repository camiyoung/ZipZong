package jibjoong.jibjoong.db.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
public class TeamCalendar {

    @Id
    @GeneratedValue
    @Column(name = "team_calendar_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "check_date")
    private LocalDate checkDate;

    @Column(name = "state")
    private String state;

    @Builder
    public TeamCalendar(Team team, LocalDate checkDate, String state) {
        this.team = team;
        this.checkDate = checkDate;
        this.state = state;
    }
}
