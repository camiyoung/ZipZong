package zipzong.zipzong.db.repository.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zipzong.zipzong.db.domain.Room;
import zipzong.zipzong.db.domain.RoomParticipant;

import java.util.List;

@Repository
public interface RoomParticipantRepository extends JpaRepository<RoomParticipant, Long> {
    RoomParticipant findIdByMemberNickname(String memberNickname);

    RoomParticipant findRoomParticipantByMemberNickname(String memberNickname);

    List<RoomParticipant> findRoomParticipantByRoom(Room room);
}
