package jibjoong.jibjoong.db.domain;

import jibjoong.jibjoong.enums.CheckExist;
import jibjoong.jibjoong.enums.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Getter
@Table(name = "registration",
        indexes = {
                @Index(name = "member_team_idx", columnList = "member_id, team_id"),
                @Index(name = "team_idx", columnList = "team_id")
        })
@EntityListeners(AuditingEntityListener.class)
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "registration_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Enumerated(EnumType.STRING)
    private Role role;

    @CreatedDate
    private LocalDateTime joinDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "is_resign")
    CheckExist isResign;

    @Builder
    public Registration(Long id, Member member, Team team, Role role, LocalDateTime joinDate) {
        this.id = id;
        this.member = member;
        this.team = team;
        this.role = role;
        this.joinDate = joinDate;
    }

    public void changeRole(Role role) {
        this.role = role;
    }

    public void changeIsResign(CheckExist isResign) {
        this.isResign = isResign;
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
