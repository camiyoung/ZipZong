package jibjoong.jibjoong.api.dto.room;

import jibjoong.jibjoong.enums.Status;
import lombok.Builder;
import lombok.Getter;
import jibjoong.jibjoong.db.domain.Room;
import jibjoong.jibjoong.enums.Mode;

import java.util.List;

@Getter
public class RoomResponse {
    private Status status;
    private List<String> participant;
    private String name;
    private String creator;
    private Mode mode;

    @Builder
    public RoomResponse(Status status, List<String> participant, String name, String creator, Mode mode) {
        this.status = status;
        this.participant = participant;
        this.name = name;
        this.creator = creator;
        this.mode = mode;
    }

    public static RoomResponse createRoomResponse(Room room, List<String> participant) {
        RoomResponse roomResponse = RoomResponse.builder()
                .status(room.getStatus())
                .participant(participant)
                .name(room.getName())
                .creator(room.getCreator())
                .mode(room.getMode())
                .build();
        return roomResponse;
    }
}
