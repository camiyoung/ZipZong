// package jibjoong.jibjoong.config.redis;

//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.core.ZSetOperations;
//
//import java.util.Set;
/*
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.AUTO_CONFIGURED) // 실제 DB 사용하고 싶을때 NONE 사용
public class RedisTest {
    @Autowired
    RedisTemplate<String, String> redisTemplate;

    @Test
    @DisplayName("Redis 튜토리얼 해보기")
    void redisConnectionTest() {

        //given
        final String key = "a";
        final String data = "1";

        final ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        final ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        valueOperations.set(key, data);
        final String s = valueOperations.get(key);
        Assertions.assertThat(s).isEqualTo(data);

        String rankingBoard = "test";

        zSetOperations.add(rankingBoard,"user1",10); //2등
        zSetOperations.add(rankingBoard,"user2",20); //1등
        zSetOperations.add(rankingBoard,"user3",1);  //3등
        //value가 곂치면 어떻게 될까? user3의 scores는 1->2로 업데이트 된다.
        zSetOperations.add(rankingBoard,"user3",2);

        //user1의 score를 찾는 방법
        Double score = zSetOperations.score(rankingBoard, "user1");
        System.out.println(score);

        //삭제하는법
        //zSetOperations.remove(rankingBoard, user3);

        //when (key,value) = "a",1
        // rankingBoard = "test" 에 등록된 user2 의 랭킹을 조회한다(올림차순). Redis 명령 중 ZREVRANK 에 해당한다.
        Long ranking = zSetOperations.reverseRank(rankingBoard, "user2");

        //then
        //랭킹은 0번부터 시작하고 user2는 점수가 가장높으니 0이다.
        Assertions.assertThat(ranking).isEqualTo(0);

        //현재 저장된 모든 랭킹 정보들을 추출할 수 있음
        //[DefaultTypedTuple [score=20.0, value=user2], DefaultTypedTuple [score=10.0, value=user1], DefaultTypedTuple [score=2.0, value=user3]]
        Set<ZSetOperations.TypedTuple<String>> rankSet = zSetOperations.reverseRangeWithScores(rankingBoard, 0, -1);
        System.out.println(rankSet);

        redisTemplate.delete("test");
    }
}
*/