package jibjoong.jibjoong.db.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Table(name="room_participant")
public class RoomParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="room_participant_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(name="member_nickname", nullable = false)
    private String memberNickname;

    @Builder
    public RoomParticipant(Long id, Room room, String memberNickname){
        this.id = id;
        this.room = room;
        this.memberNickname = memberNickname;
    }

    public static RoomParticipant createRoomParticipant(Room room, String memberNickname){
        RoomParticipant roomParticipant = RoomParticipant.builder()
                .room(room)
                .memberNickname(memberNickname)
                .build();
        return roomParticipant;
    }

}
