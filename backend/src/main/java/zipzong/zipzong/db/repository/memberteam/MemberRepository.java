package zipzong.zipzong.db.repository.memberteam;

import org.springframework.data.jpa.repository.JpaRepository;
import zipzong.zipzong.db.domain.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmailAndProvider(String email, String provider);

    Optional<Member> findByNickname(String nickname);

    boolean existsByNickname(String nickName);

}
