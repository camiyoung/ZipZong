package jibjoong.jibjoong.db.domain;

import jibjoong.jibjoong.api.dto.team.request.member.MemberResponse;
import jibjoong.jibjoong.enums.CheckExist;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Table(name = "member") //테이블 관련 설정 어노테이션
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "provider", nullable = false)
    private String provider;

    @Column(name = "nickname", nullable = true, unique = true)
    private String nickname;

    @Column(name = "refreshToken", unique = true)
    private String refreshToken;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_history_id")
    private MemberHistory memberHistory;

    public void setMemberHistory(MemberHistory memberHistory) {
        this.memberHistory = memberHistory;
    }

    @Column(name ="rep_icon", nullable = false)
    private String repIcon;

    @Enumerated(EnumType.STRING)
    @Column(name ="is_delete")
    private CheckExist isDeleted;


    @Builder //생성을 Builder 패턴으로 하기 위해서
    public Member(Long id, String name, String email, String provider, String nickname,String repIcon) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.provider = provider;
        this.nickname = nickname;
        this.repIcon = repIcon;
    }

    public void setIsDeleted(CheckExist value) {
        this.isDeleted = value;
    }

    public void setRepIcon(String repIcon){
        this.repIcon = repIcon;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Member update(String name, String email) {
        this.name = name;
        this.email = email;
        return this;
    }

    public MemberResponse toMemberResponse() {
        MemberResponse memberResponse = new MemberResponse();
        memberResponse.setEmail(this.getEmail());
        memberResponse.setName(this.getName());
        memberResponse.setProvider(this.getProvider());
        memberResponse.setNickname(this.getNickname());
        memberResponse.setRepIcon(this.getRepIcon());
        return memberResponse;
    }

}
