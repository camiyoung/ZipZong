package jibjoong.jibjoong.db.repository.memberteam;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import jibjoong.jibjoong.db.domain.Registration;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    // @author 황승주

    @EntityGraph(attributePaths = {"team", "member"})
    @Query("select r from Registration r where r.team.id =:teamId and r.isResign is null")
    List<Registration> findTeamDetail(@Param("teamId") Long teamId);

    @EntityGraph(attributePaths = {"team"})
    @Query("select r from Registration r where r.member.id =:memberId and r.isResign is null")
    List<Registration> findJoinedTeamNoResigned(@Param("memberId") Long memberId);

    @EntityGraph(attributePaths = {"team", "member"})
    @Query("select r from Registration r where r.member.id = :memberId" +
            " and r.team.id = :teamId and r.isResign is null")
    Optional<Registration> findMemberIdAndTeamIdNoResigned(@Param("memberId") Long memberId, @Param("teamId") Long teamId);

    @EntityGraph(attributePaths = {"member"})
    @Query("select r from Registration r where r.team.id = :teamId" +
            " and r.isResign is null")
    List<Registration> findAllInTeamNoResigned(@Param("teamId") Long teamId);

    @EntityGraph(attributePaths = {"team"})
    @Query("select r from Registration r where r.member.id =:memberId")
    List<Registration> findJoinedTeam (@Param("memberId") Long memberId);

    Optional<Registration> findByMemberIdAndTeamId(Long memberId, Long teamId);
    List<Registration> findAllByTeamId(Long teamId);
}
