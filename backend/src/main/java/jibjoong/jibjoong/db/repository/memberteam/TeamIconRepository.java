package jibjoong.jibjoong.db.repository.memberteam;

import org.springframework.data.jpa.repository.JpaRepository;
import jibjoong.jibjoong.db.domain.TeamIcon;

import java.util.List;
import java.util.Optional;

public interface TeamIconRepository extends JpaRepository<TeamIcon,Long> {
    List<TeamIcon> findByTeamId(Long teamId);
    Optional<TeamIcon> findByTeamIdAndIconName(Long teamId, String iconName);
}
