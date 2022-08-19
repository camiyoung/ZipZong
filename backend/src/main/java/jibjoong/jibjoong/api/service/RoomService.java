package jibjoong.jibjoong.api.service;

import jibjoong.jibjoong.api.dto.room.RoomResponse;
import jibjoong.jibjoong.db.repository.room.RoomParticipantRepository;
import jibjoong.jibjoong.db.repository.room.RoomRepository;
import jibjoong.jibjoong.enums.Status;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import jibjoong.jibjoong.api.dto.room.RoomRequest;
import jibjoong.jibjoong.db.domain.Room;
import jibjoong.jibjoong.db.domain.RoomParticipant;
import jibjoong.jibjoong.db.domain.Routine;
import jibjoong.jibjoong.db.domain.Team;
import jibjoong.jibjoong.db.repository.memberteam.TeamRepository;
import jibjoong.jibjoong.db.repository.routine.RoutineRepository;
import jibjoong.jibjoong.enums.Mode;
import jibjoong.jibjoong.exception.CustomException;
import jibjoong.jibjoong.exception.CustomExceptionList;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class RoomService {

    private final RoutineRepository routineRepository;
    private final TeamRepository teamRepository;
    private final RoomRepository roomRepository;
    private final RoomParticipantRepository roomParticipantRepository;

    /*
    운동방 생성
     */
    public Long createRoom(Long teamId, RoomRequest roomRequest) {
        //운동방이 없는 경우에만 운동방 생성
        if (getTeamInfo(teamId).getRoom() == null) {
            Routine routine = getRoutine(roomRequest.getRoutineId());
            Team team = getTeamInfo(teamId);
            Room room = Room.createRoom(roomRequest, routine, Status.READY);
            team.setRoom(room);
            roomRepository.save(room);
            teamRepository.save(team);
            roomParticipantRepository.save(RoomParticipant.createRoomParticipant(room, roomRequest.getCreator()));
        }
        return teamId;
    }

    /*
    생성된 운동방에 회원 입장
     */
    public String enterRoom(Long teamId, String nickname) {
        Long roomId = getTeamInfo(teamId).getRoom().getId();
        Room room = getStatusRoom(roomId);
        if (roomParticipantRepository.findRoomParticipantByMemberNickname(nickname) != null) {
            throw new CustomException(CustomExceptionList.MEMBER_ALREADY_ENTER_ROOM);
        }
        roomParticipantRepository.save(RoomParticipant.createRoomParticipant(room, nickname));
        return nickname;
    }

    /*
    운동방 정보 조회
     */
    public RoomResponse checkRoom(Long teamId) {
        Team team = getTeamInfo(teamId);
        if (team.getRoom() == null) {
            return RoomResponse.createRoomResponse(setRoomEmpty(), null);
        }
        Room room = getStatusRoom(team.getRoom().getId());
        List<RoomParticipant> roomParticipants = roomParticipantRepository.findRoomParticipantByRoom(room);
        List<String> participant = new ArrayList<>();
        for (RoomParticipant roomParticipant : roomParticipants) {
            participant.add(roomParticipant.getMemberNickname());
        }
        return RoomResponse.createRoomResponse(room, participant);
    }

    /*
    방장과 참여자가 방을 퇴장
     */
    public String leaveRoom(Long teamId, String nickname) {
        Team team = getTeamInfo(teamId);
        Room room = team.getRoom();
        if (room == null) {
            throw new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR);
        }
        if (roomParticipantRepository.findRoomParticipantByMemberNickname(nickname) == null) {
            return nickname; //프론트 요청으로 수정
        }
        RoomParticipant roomParticipant = roomParticipantRepository.findIdByMemberNickname(nickname);
        roomParticipantRepository.delete(roomParticipant);

        //모두가 방을 나갔을 경우에만 방을 삭제
        if (roomParticipantRepository.findRoomParticipantByRoom(room).size() == 0) {
            team.setRoom(null);
            teamRepository.save(team);
            roomRepository.delete(room);
        }

        return nickname;

    }

    /*
    방장이 방을 퇴장 또는 방을 종료
    */
    public Long deleteRoom(Long teamId) {
        Team team = getTeamInfo(teamId);
        if (team.getRoom() == null) {
            throw new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR);
        }
        Long roomId = team.getRoom().getId();
        team.setRoom(null);
        teamRepository.save(team);
        Room room = getRoom(roomId);
        roomRepository.delete(room);
        return teamId;
    }

    /*
    방 상태 운동중으로 변경
     */
    public Long startRoom(Long teamId) {
        Team team = getTeamInfo(teamId);
        if (team.getRoom() == null) {
            throw new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR);
        }
        Long roomId = team.getRoom().getId();
        Room room = getRoom(roomId);
        room.setStatus(Status.EXERCISING);
        return teamId;
    }

    public Room setRoomEmpty() {
        Room room = Room.builder()
                .routine(null)
                .name("no room")
                .creator("no creator")
                .mode(Mode.NONE)
                .status(Status.EMPTY)
                .build();
        return room;
    }

    private Team getTeamInfo(Long teamId) {
        return teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR));
    }

    private Routine getRoutine(Long routineId) {
        return routineRepository.findById(routineId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROUTINE_NOT_FOUND));
    }

    private Room getRoom(Long roomId) {
        Room room = roomRepository.findRoomById(roomId)
                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));
        return room;
    }

    private Room getStatusRoom(Long roomId) {
        Room room = roomRepository.findRoomById(roomId)
                .orElseGet(() -> setRoomEmpty());
        return room;
    }

}
