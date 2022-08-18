package jibjoong.jibjoong.exception.advice;

import jibjoong.jibjoong.exception.CustomException;
import jibjoong.jibjoong.exception.CustomExceptionList;
import jibjoong.jibjoong.exception.ExceptionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionAdvice {
    // @author 황승주
    @ExceptionHandler(value = CustomException.class)
    public ResponseEntity<ExceptionResponse> customExceptionHandler(CustomException e) {
        return makeResponseEntity(e.getException());
    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<ExceptionResponse> runtimeExceptionHandler(RuntimeException e) {
        System.out.println(e.getMessage());
        return makeResponseEntity(CustomExceptionList.RUNTIME_EXCEPTION);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ExceptionResponse> exceptionHandler(Exception e) {
        System.out.println(e.getMessage());
        return makeResponseEntity(CustomExceptionList.INTERNAL_SERVER_ERROR);

    }

    private ResponseEntity makeResponseEntity(CustomExceptionList exceptionType) {
        return ResponseEntity
                .status(exceptionType.getStatus())
                .body(ExceptionResponse.builder()
                        .code(exceptionType.getCode())
                        .message(exceptionType.getMessage())
                        .build());
    }

}
