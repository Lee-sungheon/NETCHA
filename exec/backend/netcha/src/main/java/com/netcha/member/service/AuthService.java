package com.netcha.member.service;

import com.netcha.config.UserRole;
import com.netcha.member.data.Member;
import com.netcha.member.data.Request.RequestChangeUser;

import javassist.NotFoundException;

public interface AuthService {

    final String REDIS_CHANGE_PASSWORD_PREFIX="CPW";

    void signUpUser(Member member);

    Member loginUser(String id, String password) throws Exception;

    Member findByUserId(String userId) throws NotFoundException;
    Member checkFindByUserId(String userId);

    void changeUser(RequestChangeUser member) throws NotFoundException;
    
    void verifyEmail(String key) throws NotFoundException;

    void sendVerificationMail(Member member) throws NotFoundException;

    void modifyUserRole(Member member, UserRole userRole);

    boolean isPasswordUuidValidate(String key);

    void changePassword(Member member, String password) throws NotFoundException;

    void requestChangePassword(Member member) throws NotFoundException;
    
    long size();
    
    String getName(int seq) throws Exception;
}
