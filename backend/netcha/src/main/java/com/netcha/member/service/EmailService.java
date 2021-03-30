package com.netcha.member.service;

public interface EmailService {

    void sendMail(String to, String sub, String text);
}
