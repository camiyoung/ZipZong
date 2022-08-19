package jibjoong.jibjoong.api.dto.room;

import lombok.Data;
import jibjoong.jibjoong.enums.Mode;

@Data
public class RoomRequest {

    private String roomName;
    private Mode mode;
    private Long routineId;
    private String creator;


}
