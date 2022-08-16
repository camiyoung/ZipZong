package jibjoong.jibjoong.db.domain;

import jibjoong.jibjoong.api.dto.room.RoomRequest;
import jibjoong.jibjoong.enums.Mode;
import jibjoong.jibjoong.enums.Status;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @Column(name="creator", nullable = false)
    private String creator;

    @Enumerated(EnumType.STRING)
    private Mode mode;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<RoomParticipant> roomParticipants = new ArrayList<>();

    @Builder
    public Room(Long id, Routine routine, String name, String creator, Mode mode, Status status){
        this.id = id;
        this.routine = routine;
        this.name = name;
        this.creator =creator;
        this.mode = mode;
        this.status = status;
    }

    public static Room createRoom(RoomRequest roomRequest, Routine routine, Status status){
        Room room = Room.builder()
                .routine(routine)
                .name(roomRequest.getRoomName())
                .creator(roomRequest.getCreator())
                .mode(roomRequest.getMode())
                .status(status)
                .build();
         return room;
    }

    public void setStatus(Status status){this.status = status;}


}
