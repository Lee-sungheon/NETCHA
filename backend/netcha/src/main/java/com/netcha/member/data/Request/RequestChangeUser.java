package com.netcha.member.data.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestChangeUser {
	String mbti;
	String phone;
	String nickname;
	String userId;
}
