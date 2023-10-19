package kr.or.semo.kakao.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.JwtUtil;
import kr.or.semo.kakao.oauth.OauthMember;
import kr.or.semo.kakao.oauth.OauthParams;
import kr.or.semo.member.model.dao.MemberDao;
import kr.or.semo.member.model.vo.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuthService {
	private final MemberDao memberDAO;
	private final RequestOauthInfoService requestOauthInfoService;
	private JwtUtil jwtUtil;
	@Value("${jwt.secret}")
	private String secretKey;
	private long expiredMs;
	

	// 받아온 유저정보로 로그인 시도


}