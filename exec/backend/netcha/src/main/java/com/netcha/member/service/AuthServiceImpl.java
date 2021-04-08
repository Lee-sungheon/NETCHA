package com.netcha.member.service;

import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.netcha.config.UserRole;
import com.netcha.member.data.Member;
import com.netcha.member.data.MemberRepository;
import com.netcha.member.data.Salt;
import com.netcha.member.data.Request.RequestChangeUser;

import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private SaltUtil saltUtil;

	@Autowired
	private RedisUtil redisUtil;

	@Override
	public long size() {
		return memberRepository.count();
	}

	@Override
	@Transactional
	public void signUpUser(Member member) {
		String password = member.getPassword();
		String salt = saltUtil.genSalt();
		member.setSalt(new Salt(salt));
		member.setPassword(saltUtil.encodePassword(salt, password));
		memberRepository.save(member);
	}

	@Override
	public Member loginUser(String id, String password) throws Exception {
		Member member = memberRepository.findByUserId(id);
		if (member == null)
			throw new Exception("멤버가 조회되지 않음");
		String salt = member.getSalt().getSalt();
		password = saltUtil.encodePassword(salt, password);
		if (!member.getPassword().equals(password))
			throw new Exception("비밀번호가 틀립니다.");
		return member;
	}

	@Override
	public Member findByUserId(String userId) throws NotFoundException {
		Member member = memberRepository.findByUserId(userId);
		if (member == null)
			throw new NotFoundException("멤버가 조회되지 않음");
		return member;
	}

	@Override
	public Member checkFindByUserId(String userId) {
		Member member = memberRepository.findByUserId(userId);
		return member;
	}

	@Override
	public void verifyEmail(String key) throws NotFoundException {
		String userId = redisUtil.getData(key);
		Member member = memberRepository.findByUserId(userId);
		if (member == null)
			throw new NotFoundException("멤버가 조회되지않음");
		modifyUserRole(member, UserRole.ROLE_USER);
		redisUtil.deleteData(key);
	}

	@Override
	public void sendVerificationMail(Member member) throws NotFoundException {
		String VERIFICATION_LINK = "http://j4d105.p.ssafy.io:9000/netcha/user/verify/";
		if (member == null)
			throw new NotFoundException("멤버가 조회되지 않음");
		UUID uuid = UUID.randomUUID();
		redisUtil.setDataExpire(uuid.toString(), member.getUserId(), 60 * 30L);
		emailService.sendMail(member.getUserId(), "[넷챠] 회원가입 인증메일입니다.", VERIFICATION_LINK + uuid.toString());
	}

	@Override
	public void modifyUserRole(Member member, UserRole userRole) {
		member.setRole(userRole);
		memberRepository.save(member);
	}

	@Override
	public boolean isPasswordUuidValidate(String key) {
		String memberId = redisUtil.getData(key);
		return !memberId.equals("");
	}

	@Override
	public void changePassword(Member member, String password) throws NotFoundException {
		if (member == null)
			throw new NotFoundException("changePassword(),멤버가 조회되지 않음");
		String salt = saltUtil.genSalt();
		member.setSalt(new Salt(salt));
		member.setPassword(saltUtil.encodePassword(salt, password));
		memberRepository.save(member);
	}

	@Transactional
	@Override
	public void changeUser(RequestChangeUser member) throws NotFoundException {
		Member tempMember = memberRepository.findByUserId(member.getUserId());
		if (tempMember == null)
			throw new NotFoundException("changeUser(),멤버가 조회되지 않음");
		tempMember.updateUser(member);
	}

	@Override
	public void requestChangePassword(Member member) throws NotFoundException {
		String CHANGE_PASSWORD_LINK = "http://j4d105.p.ssafy.io:9000/netcha/user/password/";
		if (member == null)
			throw new NotFoundException("멤버가 조회되지 않음.");
		String key = REDIS_CHANGE_PASSWORD_PREFIX + UUID.randomUUID();
		redisUtil.setDataExpire(key, member.getUserId(), 60 * 30L);
		emailService.sendMail(member.getUserId(), "[넷챠] 사용자 비밀번호 안내 메일", CHANGE_PASSWORD_LINK + key);
	}
	
	@Transactional
	@Override
	public String getName(int seq) {
		Member member = memberRepository.findById(seq).get();
		return member.getNickname();
	}
}