package zipzong.zipzong.db.domain;

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
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="routine_id")
    private Routine routine;

    @Column(name="room_name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private Mode mode;


}
