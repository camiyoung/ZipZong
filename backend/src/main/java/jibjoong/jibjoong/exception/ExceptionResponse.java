package jibjoong.jibjoong.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public class ExceptionResponse {
    // @author 황승주
    private final String code;
    private final String message;

    @Builder
    public ExceptionResponse(HttpStatus status, String code, String message) {
        this.code = code;
        this.message = message;
    }
}
