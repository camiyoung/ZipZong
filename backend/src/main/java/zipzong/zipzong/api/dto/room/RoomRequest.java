package zipzong.zipzong.api.dto.room;

import lombok.Data;
import zipzong.zipzong.enums.Mode;

@Data
public class RoomRequest {

    private String roomName;
    private Mode mode;
    private Long routineId;
    private String creator;


}
