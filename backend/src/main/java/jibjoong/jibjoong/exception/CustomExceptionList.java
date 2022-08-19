package jibjoong.jibjoong.exception;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.lang.reflect.Type;
import java.util.NoSuchElementException;

@Getter
@ToString
public enum CustomExceptionList {
    // @author 황승주

    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "E001", "잘못된 요청입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E002", "서버 오류 입니다."),
    ACCESS_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "E003", "엑세스 토큰 오류입니다."),
    REFRESH_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "E004", "리프레쉬 토큰 오류입니다."),
    MEMBER_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E005", "존재하지 않는 회원입니다."),
    TEAM_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "E006", "존재하지 않는 팀입니다."),
    EXERCISE_RECORD_NOT_EXIST(HttpStatus.INTERNAL_SERVER_ERROR, "E007", "운동기록이 서버에서 정상적으로 생성되지 않았습니다."),
    JOIN_INFO_NOT_EXIST(HttpStatus.NOT_FOUND, "E008", "가입정보가 유효하지 않습니다."),
    NO_AUTHENTICATION_ERROR(HttpStatus.FORBIDDEN, "E009", "접근 권한이 없습니다."),
    ROUTINE_NOT_FOUND(HttpStatus.NOT_FOUND, "E010", "존재하지 않는 루틴입니다."),
    SHIELD_COUNT_NO_NEGATIVE(HttpStatus.INTERNAL_SERVER_ERROR, "E011", "보유한 쉴드가 없습니다."),
    MEMBER_HISTORY_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "E012", "개인 운동 기록이 생성되지 않았습니다."),
    TEAM_HISTORY_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "E013", "팀 운동 기록이 생성되지 않았습니다."),
    MEMBER_NOT_FOUND_ROOM(HttpStatus.NOT_FOUND,"E014", "운동방에 존재하지 않는 회원입니다."),
    ROOM_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND,"E015","존재하지 않는 운동방 입니다."),
    MEMBER_ALREADY_ENTER_ROOM(HttpStatus.CONFLICT,"E016","회원이 이미 운동방에 있습니다."),
    MEMBER_NOT_JOIN_GROUP(HttpStatus.FORBIDDEN,"E017","그룹 가입 개수를 초과했습니다."),
    MAX_MEMBER_JOIN_GROUP(HttpStatus.FORBIDDEN,"E018","최대 가입 인원을 초과했습니다."),
    MEMBER_NAME_DUPLICATED(HttpStatus.FORBIDDEN, "E019", "중복된 닉네임입니다."),
    TEAM_NAME_DUPLICATED(HttpStatus.FORBIDDEN, "E020", "중복된 그룹명입니다.");

    private final HttpStatus status;
    private final String code;
    private String message;

    CustomExceptionList(HttpStatus status, String code) {
        this.status = status;
        this.code = code;
    }

    CustomExceptionList(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
