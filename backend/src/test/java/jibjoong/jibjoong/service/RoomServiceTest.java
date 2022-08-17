//package jibjoong.jibjoong.service;
//
//import jibjoong.jibjoong.enums.Status;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import jibjoong.jibjoong.api.dto.room.RoomRequest;
//import jibjoong.jibjoong.api.dto.room.RoomResponse;
//import jibjoong.jibjoong.api.service.RoomService;
//import jibjoong.jibjoong.db.domain.Room;
//import jibjoong.jibjoong.db.domain.RoomParticipant;
//import jibjoong.jibjoong.db.domain.Routine;
//import jibjoong.jibjoong.db.domain.Team;
//import jibjoong.jibjoong.db.repository.memberteam.TeamRepository;
//import jibjoong.jibjoong.db.repository.room.RoomParticipantRepository;
//import jibjoong.jibjoong.db.repository.room.RoomRepository;
//import jibjoong.jibjoong.db.repository.routine.RoutineRepository;
//import jibjoong.jibjoong.enums.Mode;
//import jibjoong.jibjoong.exception.CustomException;
//import jibjoong.jibjoong.exception.CustomExceptionList;
//
//import java.util.List;
//
//@DataJpaTest
//public class RoomServiceTest {
//    @Autowired
//    RoutineRepository routineRepository;
//
//    @Autowired
//    TeamRepository teamRepository;
//
//    @Autowired
//    RoomRepository roomRepository;
//
//    @Autowired
//    RoomParticipantRepository roomParticipantRepository;
//
//    RoomService roomService;
//
//    static long teamId, routineId;
//
//    @BeforeEach
//    void init() {
//        Team team = Team.builder()
//                .id(10L)
//                .name("test team")
//                .inviteLink("inviteLink")
//                .shieldCount(0)
//                .repIcon("repIcon")
//                .build();
//        teamId = teamRepository.save(team).getId();
//
//        Routine routine = Routine.builder()
//                .id(1L)
//                .name("routine1")
//                .team(getTeamInfo(teamId))
//                .totalTime(180)
//                .breakTime(60)
//                .build();
//        routineId = routineRepository.save(routine).getId();
//        roomService = new RoomService(routineRepository, teamRepository, roomRepository, roomParticipantRepository);
//    }
//
//    @Test
//    @DisplayName("방 생성")
//    void createRoom() {
//        //given
//        RoomRequest request = createRequest();
//
//        //when
//        roomService.createRoom(teamId, request);
//
//        //then
//        Room room = getRoom(getTeamInfo(teamId).getRoom().getId());
//        Assertions.assertEquals(room.getName(), "test 운동방");
//
//    }
//
//    @Test
//    @DisplayName("생성된 방 입장")
//    void enterRoom() {
//        //given
//        roomService.createRoom(teamId, createRequest());
//
//        //when
//        roomService.enterRoom(teamId, "newSeulgi");
//
//        //then
//        RoomParticipant roomParticipant = roomParticipantRepository.findRoomParticipantByMemberNickname("newSeulgi");
//        Assertions.assertEquals(roomParticipant.getRoom().getId(), getTeamInfo(teamId).getRoom().getId());
//    }
//
//    @Test
//    @DisplayName("방 정보 확인")
//    void checkRoom() {
//        //given
//        roomService.createRoom(teamId, createRequest());
//        roomService.enterRoom(teamId, "newSeulgi");
//
//        //when
//        RoomResponse roomResponse = roomService.checkRoom(teamId);
//
//        //then
//        Assertions.assertEquals(roomResponse.getName(), "test 운동방");
//        Assertions.assertEquals(roomResponse.getStatus(), Status.READY);
//    }
//
//    @Test
//    @DisplayName("방 상태를 운동 시작으로 변경")
//    void startRoom() {
//        //given
//        RoomRequest request = createRequest();
//        roomService.createRoom(teamId, request);
//
//        //when
//        roomService.startRoom(teamId);
//
//        //then
//        Room room = getRoom(getTeamInfo(teamId).getRoom().getId());
//        Assertions.assertEquals(room.getStatus(), Status.EXERCISING);
//    }
//
//    @Test
//    @DisplayName("방장과 참여자가 운동방 퇴장")
//    void leaveRoom() {
//        //given
//        String nickname = "newSeulgi";
//        roomService.createRoom(teamId, createRequest());
//        roomService.enterRoom(teamId, nickname);
//
//        //when
//        roomService.leaveRoom(teamId, nickname);
//
//        //then
//        Room room = getRoom(getTeamInfo(teamId).getRoom().getId());
//        List<RoomParticipant> roomParticipants = roomParticipantRepository.findRoomParticipantByRoom(room);
//        Assertions.assertEquals(roomParticipants.size(), 1);
//    }
//
//    static RoomRequest createRequest() {
//        RoomRequest roomRequest = new RoomRequest();
//        roomRequest.setRoomName("test 운동방");
//        roomRequest.setMode(Mode.EXERCISE);
//        roomRequest.setRoutineId(routineId);
//        roomRequest.setCreator("Seulgi");
//        return roomRequest;
//    }
//
//    private Team getTeamInfo(Long teamId) {
//        return teamRepository.findById(teamId)
//                .orElseThrow(() -> new CustomException(CustomExceptionList.TEAM_NOT_FOUND_ERROR));
//    }
//
//    private Room getRoom(Long roomId) {
//        Room room = roomRepository.findRoomById(roomId)
//                .orElseThrow(() -> new CustomException(CustomExceptionList.ROOM_NOT_FOUND_ERROR));
//        return room;
//    }
//
//}
