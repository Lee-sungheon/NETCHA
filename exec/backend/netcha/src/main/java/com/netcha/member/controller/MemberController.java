package com.netcha.member.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.netcha.config.UserRole;
import com.netcha.member.data.Member;
import com.netcha.member.data.MemberResponseDto;
import com.netcha.member.data.Response;
import com.netcha.member.data.Request.RequestChangePassword1;
import com.netcha.member.data.Request.RequestChangePassword2;
import com.netcha.member.data.Request.RequestChangeUser;
import com.netcha.member.data.Request.RequestLoginUser;
import com.netcha.member.data.Request.RequestVerifyEmail;
import com.netcha.member.service.AuthService;
import com.netcha.member.service.CookieUtil;
import com.netcha.member.service.JwtUtil;
import com.netcha.member.service.RedisUtil;

import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001","https://netcha.netlify.app","https://j4d105.p.ssafy.io","https://netcha-pedia.netlify.app"}, allowCredentials = "true")
@RestController
@RequestMapping("/user")
public class MemberController {

	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private AuthService authService;
	@Autowired
	private CookieUtil cookieUtil;
	@Autowired
	private RedisUtil redisUtil;


	@ApiOperation(value = "회원 가입을 한다.", response = Response.class)
	@PostMapping("/signup")
	public Response signUpUser(@RequestBody Member member) {
		try {
			authService.signUpUser(member);
			return new Response("success", "회원가입을 성공적으로 완료했습니다.", null);
		} catch (Exception e) {
			return new Response("error", "회원가입을 하는 도중 오류가 발생했습니다.", null);
		}
	}

	@ApiOperation(value = "회원정보 수정", response = Response.class)
	@PostMapping("/changeUser")
	public Response checkId(@RequestBody RequestChangeUser member) {
		try {
			authService.changeUser(member);
			return new Response("success", "수정됐습니다.", null);
		} catch (Exception e) {
			return new Response("error", "수정이 실패했습니다.", null);
		}
	}


	@ApiOperation(value = "유저 정보 조회", response = Response.class)
	@GetMapping("/info")
	public Response info(HttpServletRequest req, HttpServletResponse res) {
		try {
			
			final Cookie accessToken = cookieUtil.getCookie(req, JwtUtil.ACCESS_TOKEN_NAME);
			Member member = authService.findByUserId(jwtUtil.getUsername(accessToken.getValue()));
			MemberResponseDto userInfo = new MemberResponseDto(member);
			return new Response("success", "유저정보 조회 성공", userInfo);
		} catch (Exception e) {
			return new Response("error", "유저정보 조회 실패", null);
		}
	}

	@ApiOperation(value = "토큰 쿠키로 반환", response = Response.class)
	@GetMapping("/getToken/{token}")
	public Response getToken(@PathVariable String token, HttpServletRequest req, HttpServletResponse res) {
		try {
			Member member = authService.findByUserId(jwtUtil.getUsername(token));
			Cookie accessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, token);
			Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, redisUtil.getData(member.getUserId()));
			res.addCookie(accessToken);
			res.addCookie(refreshToken);
			MemberResponseDto userInfo = new MemberResponseDto(member);
			return new Response("success", "유저정보 조회 성공", userInfo);
		} catch (Exception e) {
			return new Response("error", "유저정보 조회 실패", null);
		}
	}

	
	@ApiOperation(value = "Id 중복체크", response = Response.class)
	@PostMapping("/checkId")
	public Response checkId(@RequestBody String userId) {
		try {
			Member isMember = authService.checkFindByUserId(userId);
			if (isMember == null) {
				return new Response("success", "중복없습니다.", 1);
			} else {
				return new Response("error", "중복입니다.", 0);
			}
		} catch (Exception e) {
			return new Response("error", "오류가 발생했습니다.", null);
		}
	}

//    @ApiOperation(value = "네이버 로그인을 한다.", response = Response.class)
//    @PostMapping("/login/naver")
//    public Response naverLogin(@RequestBody Member member,
//                          HttpServletRequest req,
//                          HttpServletResponse res) {
//        try {
//            Member isMember = authService.socialFindByUserId(member.getUserId());
//            if(isMember == null) {
//            	authService.signUpUser(member);
//            	member = authService.findByUserId(member.getUserId());
//            }
//            final String token = jwtUtil.generateToken(member);
//            final String refreshJwt = jwtUtil.generateRefreshToken(member);
//            Cookie accessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, token);
//            Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);
//            redisUtil.setDataExpire(refreshJwt, member.getUserId(), JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
//            Map<String, Object> map = new HashMap<String, Object>();
//            map.put("token", token);
//            map.put("member", member);
//            res.addCookie(accessToken);
//            res.addCookie(refreshToken);
//            return new Response("success", "로그인에 성공했습니다.", map);
//        } catch (Exception e) {
//            return new Response("error", "로그인에 실패했습니다.", e.getMessage());
//        }
//    }

	@ApiOperation(value = "일반 로그인을 한다.", response = Response.class)
	@PostMapping("/login")
	public Response login(@RequestBody RequestLoginUser user, HttpServletRequest req, HttpServletResponse res) {
		try {
			final Member member = authService.loginUser(user.getUserId(), user.getPassword());
			if(member.getRole().toString().equals("ROLE_NOT_PERMITTED")) {
				return new Response("authenticationError", "인증되지 않은 사용자입니다.", null);
			}
			final String token = jwtUtil.generateToken(member);
			final String refreshJwt = jwtUtil.generateRefreshToken(member);
			Cookie accessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, token);
			Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);
			redisUtil.setDataExpire(refreshJwt, member.getUserId(), JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
			redisUtil.setDataExpire(member.getUserId(), refreshJwt, JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
			res.addCookie(accessToken);
			res.addCookie(refreshToken);
			MemberResponseDto responseMember = new MemberResponseDto(member);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("token", token);
			map.put("member", responseMember);
			return new Response("success", "로그인에 성공했습니다.", map);
		} catch (Exception e) {
			return new Response("error", "로그인에 실패했습니다.", e.getMessage());
		}
	}

	@ApiOperation(value = "로그아웃을 한다.", response = Response.class)
	@GetMapping("/logout")
	public void logout(HttpServletRequest req, HttpServletResponse res) {
		final String token = "";
		final String refreshJwt = "";
		Cookie accessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, token);
		Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);
		res.addCookie(accessToken);
		res.addCookie(refreshToken);
	}

	@GetMapping("/size")
	public Response size() {
		Response response;
		try {
			return new Response("success", "멤버사이즈를 불러오는데 성공했습니다.", authService.size());

		} catch (Exception e) {
			return new Response("error", "멤버 사이즈를 불러오는데 실패했습니다.", e.getMessage());
		}
	}

	@ApiOperation(value = "로그인 인증메일을 보낸다.", response = Response.class)
	@PostMapping("/verify")
	public Response verify(@RequestBody RequestVerifyEmail requestVerifyEmail, HttpServletRequest req,
			HttpServletResponse res) {
		Response response;
		try {
			Member member = authService.findByUserId(requestVerifyEmail.getUserId());
			authService.sendVerificationMail(member);
			response = new Response("success", "성공적으로 인증메일을 보냈습니다.", null);
		} catch (Exception exception) {
			response = new Response("error", "인증메일을 보내는데 문제가 발생했습니다.", exception);
		}
		return response;
	}

	@ApiOperation(value = "로그인 인증메일을 확인한다.", response = Response.class)
	@GetMapping("/verify/{key}")
	public Response getVerify(@PathVariable String key) {
		Response response;
		try {
			authService.verifyEmail(key);
			response = new Response("success", "성공적으로 인증메일을 확인했습니다.", null);

		} catch (Exception e) {
			response = new Response("error", "인증메일을 확인하는데 실패했습니다.", null);
		}
		return response;
	}

	@GetMapping("/password/{key}")
	public Response isPasswordUUIdValidate(@PathVariable String key) {
		Response response;
		try {
			if (authService.isPasswordUuidValidate(key))
				response = new Response("success", "정상적인 접근입니다.", null);
			else
				response = new Response("error", "유효하지 않은 Key값입니다.", null);
		} catch (Exception e) {
			response = new Response("error", "유효하지 않은 key값입니다.", null);
		}
		return response;
	}

	@PostMapping("/password")
	public Response requestChangePassword(@RequestBody RequestChangePassword1 requestChangePassword1) {
		Response response;
		try {
			Member member = authService.findByUserId(requestChangePassword1.getUserId());
			if (!member.getUserId().equals(requestChangePassword1.getUserId()))
				throw new NoSuchFieldException("");
			authService.requestChangePassword(member);
			response = new Response("success", "성공적으로 사용자의 비밀번호 변경요청을 수행했습니다.", null);
		} catch (NoSuchFieldException e) {
			response = new Response("error", "사용자 정보를 조회할 수 없습니다.", null);
		} catch (Exception e) {
			response = new Response("error", "비밀번호 변경 요청을 할 수 없습니다.", null);
		}
		return response;
	}

	@PutMapping("/password")
	public Response changePassword(@RequestBody RequestChangePassword2 requestChangePassword2) {
		Response response;
		try {
			Member member = authService.findByUserId(requestChangePassword2.getUserId());
			authService.changePassword(member, requestChangePassword2.getPassword());
			response = new Response("success", "성공적으로 사용자의 비밀번호를 변경했습니다.", null);
		} catch (Exception e) {
			response = new Response("error", "사용자의 비밀번호를 변경할 수 없었습니다.", null);
		}
		return response;

	}
	
	@GetMapping("/getUsername")
	public ResponseEntity<?> getUsernameBySeq(@RequestParam long seq){
		String nickname = "";
		try {
			nickname = authService.getName((int)seq);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<> (nickname, HttpStatus.OK);
	}
}
