package jibjoong.jibjoong.api.dto.common;


import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class BasicResponse<Type> {
    private String message;
    private Type data;

    @Builder
    public BasicResponse(String message, Type data) {
        this.message = message;
        this.data = data;
    }
}
