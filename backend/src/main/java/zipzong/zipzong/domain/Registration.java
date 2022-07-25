package zipzong.zipzong.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import zipzong.zipzong.enums.Role;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Table(name = "registration")
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "registration_id")
    Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Enumerated(EnumType.STRING)
    private Role role;

    @CreatedDate
    private LocalDateTime joinDate;

    @Builder
    public Registration(Long id, Member member, Team team, Role role, LocalDateTime joinDate) {
        this.id = id;
        this.member = member;
        this.team = team;
        this.role = role;
        this.joinDate = joinDate;
    }

    public static Registration createRegistration(Member member, Team team) {
        Registration registration = Registration.builder()
                                                .team(team)
                                                .member(member)
                                                .role(Role.LEADER)
                                                .build();
        return registration;
    }

    public static Registration joinRegistration(Member member, Team team) {
        Registration registration = Registration.builder()
                                                .team(team)
                                                .member(member)
                                                .role(Role.FOLLOWER)
                                                .build();
        return registration;
    }

}
