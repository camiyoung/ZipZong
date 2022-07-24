package zipzong.zipzong.domain;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TeamTest {

    Team team;

    @BeforeEach()
    public void initTeam() {
        team = new Team();
    }

    @Test
    @DisplayName("쉴드추가")
    void addShieldCount() {
        //given
        int value = 3;

        //when
        team.addShieldCount(3);

        //then
        Assertions.assertEquals(team.getShieldCount(), 3);
    }

    @Test
    @DisplayName("쉴드 사용")
    void useShield() {
        //given
        int value = 3;
        team.addShieldCount(value);

        //when
        team.useShield();

        //then
        Assertions.assertEquals(team.getShieldCount(), 2);
    }

    @Test
    @DisplayName("쉴드는0 이하가 될 수 없음")
    void hasNoShield() {
        //then
        Assertions.assertThrows(IllegalStateException.class,
                //when
                () -> team.useShield());
    }

    @Test
    void makeInviteLink() {
    }
}