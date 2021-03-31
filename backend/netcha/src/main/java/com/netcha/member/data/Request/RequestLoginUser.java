package com.netcha.member.data.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestLoginUser {
    private String userId;
    private String password;

    
    public RequestLoginUser(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }


	public RequestLoginUser() {
	}
}
