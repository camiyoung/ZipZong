package zipzong.zipzong.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import zipzong.zipzong.enums.Mode;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Table(name="room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="room_id")
    private Long id;

    @OneToOne
    @JoinColumn(name="routine_id")
    private Routine routine;

    @OneToOne
    @JoinColumn(name="team_id")
    private Team team;

    @Column(name="room_name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private Mode mode;


}
