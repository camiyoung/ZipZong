package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import zipzong.zipzong.domain.Registration;
import zipzong.zipzong.domain.Team;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    //@Query(value = "select t from Registration r join fetch Team t join fetch Member m where m.id = :memberId")

    @Query("select r from Registration r join fetch r.team t join fetch r.member m where r.member.id =:memberId")
    List<Registration> findJoinedTeam(@Param("memberId") Long memberId);

    @EntityGraph(attributePaths = {"member","team"})
    @Query("select DISTINCT r.team from Registration r where r.member.id =:memberId")
    List<Team> findJoinedTeam1(@Param("memberId") Long memberId);

}
