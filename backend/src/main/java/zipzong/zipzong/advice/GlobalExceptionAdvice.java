package zipzong.zipzong.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import zipzong.zipzong.exception.CustomException;
import zipzong.zipzong.exception.CustomExceptionList;
import zipzong.zipzong.exception.ExceptionResponse;

@RestControllerAdvice
public class GlobalExceptionAdvice {
    @ExceptionHandler(value = CustomException.class)
    public ResponseEntity<ExceptionResponse> customExceptionHandler(CustomException e) {
        return makeResponseEntity(e.getException());
    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<ExceptionResponse> runtimeExceptionHandler(RuntimeException e) {
        return makeResponseEntity(CustomExceptionList.RUNTIME_EXCEPTION);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ExceptionResponse> exceptionHandler(Exception e) {
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
