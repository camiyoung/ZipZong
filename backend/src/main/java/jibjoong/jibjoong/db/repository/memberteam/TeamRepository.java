package jibjoong.jibjoong.db.repository.memberteam;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import jibjoong.jibjoong.db.domain.Team;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByInviteLink(String inviteLink);

    @Query("select t from Team t where t.isDeleted is null")
    List<Team> getAllTeamNoDeleted();

    @Query("select t from Team t where t.isDeleted is null and t.name = :name")
    Optional<Team> teamNameDuplicatedNoDeleted(@Param("name") String name);

    boolean existsByName(String name);

    Optional<Team> findByName(String name);
}
