package kr.or.semo.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	public MemberService() {
		super();
		expiredMs = 1000 * 60 * 60l;
	}

	public String login(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberId());
		if (m != null && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {
			return jwtUtil.createToken(member.getMemberId(), secretKey, expiredMs);
		} else {
			return "실패";
		}
	}

	public Member selectOneMember(String memberId) {
		// TODO Auto-generated method stub
		return memberDao.selectOneMember(memberId);
	}
	@Transactional
	public int insertMember(Member member) {
		System.out.println(member.getMemberImg());
		// TODO Auto-generated method stub
		return memberDao.insertMember(member);
	}

	
	
	
	@Transactional
	public int updateMyInfo(Member member) {
		return memberDao.updateMyInfo(member);
	}
	
	public int selectOneMemberByPw(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberId());
		if(m !=null && bCryptPasswordEncoder.matches(member.getMemberPw(),m.getMemberPw())) {
			return 1;
		}
		return 0;
	}

	@Transactional
	public int updatePwMember(Member member) {
		return memberDao.updatePwMember(member);
	}
	
	@Transactional
	public int updateMyFeed(Member member) {
		return memberDao.updateMyFeed(member);
	}

	public int updateMyLike(Member member) {
		return memberDao.updateMyLike(member);
	}

}
