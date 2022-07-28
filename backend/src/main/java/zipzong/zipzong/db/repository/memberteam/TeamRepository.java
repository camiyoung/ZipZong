package zipzong.zipzong.db.repository.memberteam;

import org.springframework.data.jpa.repository.JpaRepository;
import zipzong.zipzong.db.domain.Team;

import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByInviteLink(String inviteLink);
}
