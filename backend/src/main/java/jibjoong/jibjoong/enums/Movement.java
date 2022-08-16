package jibjoong.jibjoong.enums;

import java.util.stream.Stream;

public enum Movement {
    PUSHUP, BURPEE, SQUAT, JUMPINGJACK, LUNGE, LATERALRAISE;

    public static String[] getNames() {
        return Stream.of(Movement.values()).map(Movement::name).toArray(String[]::new);
    }
}
