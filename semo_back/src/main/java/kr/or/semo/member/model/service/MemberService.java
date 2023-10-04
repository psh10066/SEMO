package kr.or.semo.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.or.semo.JwtUtil;
import kr.or.semo.member.model.dao.MemberDao;
import kr.or.semo.member.model.vo.Member;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private JwtUtil jwtUtil;
	@Value("${jwt.secret}")
	private String secretKey;
	private long expiredMs;

	public String login(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberId());
		System.out.println("서비스1");
		if (m != null && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {
			System.out.println("서비스2");
			return jwtUtil.createToken(member.getMemberId(), secretKey, expiredMs);
			
		} else {
			System.out.println("서비스3");
			return "실패";
		}
	}
}
