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

    @Column(name = "session_id", nullable = false, unique = true)
    private String session_id;

    @Column(name="room_name", nullable = false)
    private String name;

    @Column(name="content")
    private String content;

    @Enumerated(EnumType.STRING)
    private Mode mode;


}
