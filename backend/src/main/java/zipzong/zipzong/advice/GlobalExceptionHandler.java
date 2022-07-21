package zipzong.zipzong.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import zipzong.zipzong.exception.CustomException;
import zipzong.zipzong.exception.CustomExceptionList;
import zipzong.zipzong.exception.ExceptionResponse;

@RestControllerAdvice
public class GlobalExceptionHandler  {

    @ExceptionHandler(value = CustomException.class)
    public ResponseEntity<ExceptionResponse> exceptionHandler(CustomException e) {
        return ResponseEntity
                .status(e.getException().getStatus())
                .body(ExceptionResponse.builder()
                        .code(e.getException().getCode())
                        .message(e.getException().getMessage())
                        .build());
    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<ExceptionResponse> exceptionHandler(RuntimeException e) {
        return ResponseEntity
                .status(CustomExceptionList.RUNTIME_EXCEPTION.getStatus())
                .body(ExceptionResponse.builder()
                        .code(CustomExceptionList.RUNTIME_EXCEPTION.getCode())
                        .message(CustomExceptionList.RUNTIME_EXCEPTION.getMessage())
                        .build());
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ExceptionResponse> exceptionHandler(Exception e) {
        return ResponseEntity
                .status(CustomExceptionList.INTERNAL_SERVER_ERROR.getStatus())
                .body(ExceptionResponse.builder()
                        .code(CustomExceptionList.INTERNAL_SERVER_ERROR.getCode())
                        .message(CustomExceptionList.INTERNAL_SERVER_ERROR.getMessage())
                        .build());
    }
}
