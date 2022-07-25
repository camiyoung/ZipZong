package zipzong.zipzong.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zipzong.zipzong.domain.Team;
import zipzong.zipzong.repository.TeamRepository;

@Service
@RequiredArgsConstructor
public class TeamService {
    final TeamRepository teamRepository;

    public Team create(Team team) {
        return teamRepository.save(team);
    }

    public void delete(Long teamId) {
        Team team = teamRepository.findById(teamId)
                                  .orElseThrow();
        teamRepository.delete(team);
    }

}
