package com.netcha.member.data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter	
public class MemberResponseDto {
	private int seq;
	private String userId;
	private String name;
	private String nickname;
	private String phone;
	private String mbti;

	public MemberResponseDto(Member member) {
		this.seq = member.getSeq();
		this.userId = member.getUserId();
		this.name = member.getName();
		this.nickname = member.getNickname();
		this.phone = member.getPhone();
		this.mbti = member.getMbti();
	}

}
