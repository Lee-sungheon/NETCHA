package com.netcha.member.data;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.netcha.config.UserRole;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Member {

    @Id
    @GeneratedValue
    private int seq;

    @Column(unique = true)
    @NotNull
    private String userId;
    @NotNull
    private String password;
    @NotBlank
    private String name;
    @NotNull
    private String nickname;
    private String phone;
    private String mbti;
    
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_NOT_PERMITTED;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createAt;
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updateAt;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "salt_id")
    private Salt salt;

    public Member() {
    }

    
    public Member(@NotNull String userId, @NotNull String password, @NotBlank String name,
    	 @NotNull String nickname, String phone, String mbti) {
    	this.userId = userId;
    	this.password = password;
    	this.name = name;
    	this.nickname = nickname;
    	this.phone = phone;
    	this.mbti = mbti;
    }

    @Override
    public String toString() {
        return "User{" +
                "seq=" + seq +
                ", id='" + userId + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", role=" + role +
                ", createAt=" + createAt +
                ", updateAt=" + updateAt +
                '}';
    }


}
