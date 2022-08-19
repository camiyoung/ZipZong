//package jibjoong.jibjoong.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jibjoong.jibjoong.enums.Status;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.RequestBuilder;
//import org.springframework.test.web.servlet.ResultActions;
//import jibjoong.jibjoong.api.controller.RoomController;
//import jibjoong.jibjoong.api.dto.room.RoomRequest;
//import jibjoong.jibjoong.api.dto.room.RoomResponse;
//import jibjoong.jibjoong.api.service.RoomService;
//import jibjoong.jibjoong.config.auth.OAuthService;
//import jibjoong.jibjoong.config.jwt.JwtService;
//import jibjoong.jibjoong.db.repository.room.RoomParticipantRepository;
//import jibjoong.jibjoong.db.repository.room.RoomRepository;
//import jibjoong.jibjoong.enums.Mode;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(RoomController.class)
//@AutoConfigureRestDocs
//@MockBean(JpaMetamodelMappingContext.class)
//public class RoomControllerTest {
//    @Autowired
//    MockMvc mockMvc;
//
//    @MockBean
//    private OAuthService oAuthService;
//
//    @MockBean
//    private JwtService jwtService;
//
//    @MockBean
//    private RoomService roomService;
//
//    @MockBean
//    private RoomRepository roomRepository;
//
//    @MockBean
//    private RoomParticipantRepository roomParticipantRepository;
//
//    @Test
//    @DisplayName("방 생성")
//    void createRoom() throws Exception {
//        //given
//        Long teamId = 1L;
//        RoomRequest roomRequest = makeRoomRequest();
//        String body = (new ObjectMapper()).writeValueAsString(roomRequest);
//        given(roomService.createRoom(anyLong(), any())).willReturn(teamId);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/room/{teamId}", teamId)
//                .content(body)
//                .contentType(MediaType.APPLICATION_JSON);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data").value("1"))
//                .andDo(document("create-room-by-team",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("teamId").description("팀 아이디")
//                        ),
//                        requestFields(
//                                fieldWithPath("roomName").description("방 이름"),
//                                fieldWithPath("mode").description("방 모드"),
//                                fieldWithPath("routineId").description("루틴 아이디"),
//                                fieldWithPath("creator").description("방 생성자")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data").description("세션 아이디(팀 아이디)")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("방 입장")
//    void enterRoom() throws Exception {
//        //given
//        Long teamId = 1L;
//        String nickName = "seulgi";
//        given(roomService.enterRoom(anyLong(), anyString())).willReturn(nickName);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/room/{teamId}/enter/{nickName}", teamId, nickName);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data").value("seulgi"))
//                .andDo(document("enter-room-by-team",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("teamId").description("팀 아이디"),
//                                parameterWithName("nickName").description("닉네임")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data").description("닉네임")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("방 상태 조회")
//    void checkRoom() throws Exception {
//        //given
//        Long teamId = 1L;
//        RoomResponse roomResponse = makeRoomResponse();
//        given(roomService.checkRoom(anyLong())).willReturn(roomResponse);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.get("/room/{teamId}", teamId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.status").value("READY"))
//                .andDo(document("get-room-status",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("teamId").description("팀 아이디")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data.status").description("방 상태"),
//                                fieldWithPath("data.participant.[]").description("참여자"),
//                                fieldWithPath("data.name").description("방 이름"),
//                                fieldWithPath("data.creator").description("방장(생성자)"),
//                                fieldWithPath("data.mode").description("방 모드")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("방장과 참여자가 방을 퇴장")
//    void leaveRoom() throws Exception {
//        //given
//        Long teamId = 1L;
//        String nickName = "thintheul";
//        given(roomService.leaveRoom(anyLong(), anyString())).willReturn(nickName);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.delete("/room/{teamId}/leave/{nickName}", teamId, nickName);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data").value(nickName))
//                .andDo(document("leave-room",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("teamId").description("팀 아이디"),
//                                parameterWithName("nickName").description("닉네임")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data").description("닉네임")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("게임 종료시 방 삭제")
//    void deleteRoom() throws Exception {
//        //given
//        Long teamId = 1L;
//        given(roomService.deleteRoom(anyLong())).willReturn(teamId);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.delete("/room/{teamId}", teamId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data").value(teamId))
//                .andDo(document("delete-room-by-creator",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("teamId").description("팀 아이디")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data").description("세션 아이디(팀 아이디)")
//                        )
//                ));
//    }
//
//    @Test
//    @DisplayName("방 상태를 준비중에서 운동중으로 변경")
//    void startRoom() throws Exception {
//        //given
//        Long teamId = 1L;
//        given(roomService.startRoom(anyLong())).willReturn(teamId);
//
//        //when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.put("/room/start/{teamId}", teamId);
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        //then
//        resultActions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.data").value(teamId))
//                .andDo(document("start-room-by-teamId",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(
//                                parameterWithName("teamId").description("팀 아이디")
//                        ),
//                        responseFields(
//                                fieldWithPath("message").description("메시지"),
//                                fieldWithPath("data").description("세션 아이디(팀 아이디)")
//                        )
//                ));
//    }
//
//
//    private RoomRequest makeRoomRequest() {
//        RoomRequest roomRequest = new RoomRequest();
//        roomRequest.setRoomName("test room");
//        roomRequest.setMode(Mode.EXERCISE);
//        roomRequest.setCreator("tester");
//        roomRequest.setRoutineId(1L);
//        return roomRequest;
//    }
//
//    private RoomResponse makeRoomResponse() {
//        List<String> participant = new ArrayList<>();
//        participant.add("seulgi");
//        participant.add("thintheul");
//        RoomResponse roomResponse = RoomResponse.builder()
//                .status(Status.READY)
//                .participant(participant)
//                .name("test room")
//                .creator("seulgi")
//                .mode(Mode.EXERCISE)
//                .build();
//        return roomResponse;
//    }
//
//}
