package jibjoong.jibjoong.db.repository.memberteam;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import jibjoong.jibjoong.db.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmailAndProvider(String email, String provider);

    Optional<Member> findByNickname(String nickname);

    boolean existsByNickname(String nickName);

    @Query("select m from Member m where m.isDeleted is null")
    List<Member> AllMembersNoDeleted();

}
