package zipzong.zipzong.enums;

import java.util.stream.Stream;

public enum Movement {
    PUSHUP, BURPEE, MOUNTAINCLIMING, SQUAT, JUMPINGJACK, LUNGE;

    public static String[] getNames() {
        return Stream.of(Movement.values()).map(Movement::name).toArray(String[]::new);
    }
}
