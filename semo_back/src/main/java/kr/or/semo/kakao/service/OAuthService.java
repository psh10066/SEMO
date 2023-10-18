package kr.or.semo.kakao.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

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
	public String getMemberByOauthLogin(OauthParams oauthParams) {
		expiredMs = 1000 * 1 * 60l;
		
		System.out.println("------ Oauth 로그인 시도 ------");
		// 인증 파라미터 객체를 이용하여 해당 enum클래스에 해당하는 메소드 수행
		OauthMember oauthMember = requestOauthInfoService.request(oauthParams);
		System.out.println("전달받은 유저정보:: " + oauthMember.getEmail());
		
		// 획득한 회원정보로 검증할 MemberDTO 생성
		Member accessMember = new Member();
		accessMember.setMemberId(oauthMember.getEmail());
		//accessMember.setMemberName(oauthMember.getNickName());

		// 획득된 회원정보 DB 조회
		Member result = memberDAO.selectByOauthLogin(accessMember);
		System.out.println(result);
		// 반환할 JWT
		String accessJwt = null;

		if (result == null) {
			System.out.println("------ 회원가입 필요한 회원 ------");
			// 회원가입이 되지 않은 회원이기 때문에 회원 DTO에 값을 전달하여 DB저장
			System.out.println("회원가입 요청 :: " + accessMember.getMemberId());

			// kakaoMember에서 전달된 데이터를 가진 memberDTO DB 저장
			//memberDAO.insert(accessMember);

			System.out.println("회원가입 완료 :: " + accessMember.getMemberName());
		}
		// 이미 가입된 회원은 토큰발급
		System.out.println("------ JWT 발급 ------");
		accessJwt = jwtUtil.createToken(accessMember.getMemberId(), secretKey, expiredMs);

		System.out.println("------ JWT 발급완료 ------");
		return accessJwt;
	}

}