package zipzong.zipzong.db.repository.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zipzong.zipzong.db.domain.Room;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findRoomById(Long id);
}
