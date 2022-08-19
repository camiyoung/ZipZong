package jibjoong.jibjoong.api.controller;

import jibjoong.jibjoong.api.dto.common.BasicResponse;
import jibjoong.jibjoong.api.dto.room.RoomRequest;
import jibjoong.jibjoong.api.dto.room.RoomResponse;
import jibjoong.jibjoong.api.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;
    static final String SUCCESS = "success";

    // 방 생성
    @PostMapping("/{teamId}")
    public ResponseEntity<BasicResponse<Long>> createRoom(@RequestBody RoomRequest roomRequest, @PathVariable Long teamId) {
        Long sessionId = roomService.createRoom(teamId, roomRequest);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, sessionId), HttpStatus.CREATED);
    }

    // 생성된 방에 입장
    @PostMapping("/{teamId}/enter/{nickName}")
    public ResponseEntity<BasicResponse<String>> enterRoom(@PathVariable Long teamId, @PathVariable String nickName) {
        String enterUser = roomService.enterRoom(teamId, nickName);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, enterUser), HttpStatus.CREATED);
    }

    // 방 상태 조회
    @GetMapping("/{teamId}")
    public ResponseEntity<BasicResponse<RoomResponse>> checkRoom(@PathVariable Long teamId) {
        RoomResponse roomResponse = roomService.checkRoom(teamId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, roomResponse), HttpStatus.OK);
    }

    // 방장이 아닌 회원이 방울 퇴장
    @DeleteMapping("/{teamId}/leave/{nickName}")
    public ResponseEntity<BasicResponse<String>> leaveRoom(@PathVariable Long teamId, @PathVariable String nickName) {
        String leaveUser = roomService.leaveRoom(teamId, nickName);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, leaveUser), HttpStatus.OK);
    }

    // 방 상태 준비중에서 운동중으로 변경
    @PutMapping("/start/{teamId}")
    public ResponseEntity<BasicResponse<Long>> startRoom(@PathVariable Long teamId) {
        Long sessionId = roomService.startRoom(teamId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, sessionId), HttpStatus.OK);
    }

    // 운동 종료 후 방 삭제
    @DeleteMapping("/{teamId}")
    public ResponseEntity<BasicResponse<Long>> deleteRoom(@PathVariable Long teamId) {
        Long sessionId = roomService.deleteRoom(teamId);
        return new ResponseEntity<>(makeBasicResponse(SUCCESS, sessionId), HttpStatus.OK);
    }

    private <T> BasicResponse<T> makeBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
