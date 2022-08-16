package jibjoong.jibjoong.db.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Table(name = "team_icon"
        , indexes = {
        @Index(name = "unique_idx_team_icon", columnList = "team_id, icon_name", unique = true)
}
)
public class TeamIcon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_icon_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "icon_name")
    String iconName;

    @Builder
    public TeamIcon(Long id, Team team, String iconName) {
        this.id = id;
        this.team = team;
        this.iconName = iconName;
    }

    public static TeamIcon addTeamIcon(Team team, String icon) {
        return TeamIcon.builder()
                       .team(team)
                       .iconName(icon)
                       .build();

    }
}
