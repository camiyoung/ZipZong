package zipzong.zipzong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zipzong.zipzong.domain.MemberIcon;
import zipzong.zipzong.domain.TeamIcon;

import java.util.List;

public interface TeamIconRepository extends JpaRepository<TeamIcon,Long> {
    List<TeamIcon> findByTeamId(Long teamId);
}
