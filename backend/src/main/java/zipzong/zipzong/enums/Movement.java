package zipzong.zipzong.enums;

import java.util.stream.Stream;

public enum Movement {
    PUSHUP, BURPEE, LEGRAISE, MOUNTAINCLIMING, SQUAT;

    public static String[] getNames() {
        return Stream.of(Movement.values()).map(Movement::name).toArray(String[]::new);
    }
}
