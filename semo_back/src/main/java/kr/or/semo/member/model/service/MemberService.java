package kr.or.semo.member.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.JwtUtil;
import kr.or.semo.kakao.oauth.OauthMember;
import kr.or.semo.kakao.oauth.OauthParams;
import kr.or.semo.kakao.service.RequestOauthInfoService;
import kr.or.semo.member.model.dao.MemberDao;
import kr.or.semo.member.model.vo.Follow;
import kr.or.semo.member.model.vo.Member;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private RequestOauthInfoService requestOauthInfoService;
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
	@Transactional
	public int updateMyLike(Member member) {
		return memberDao.updateMyLike(member);
	}

	public List memberList(String memberNoList) {
		String[] memberNo = {};
		memberNo = memberNoList.split(",");
		return memberDao.memberList(memberNo);
	}
	
	@Transactional
	public int insertFollow(int memberNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		int followerNo = member.getMemberNo();
		Follow f = new Follow();
		f.setFollowerNo(followerNo);
		f.setFollowingNo(memberNo);
		return memberDao.insertFollow(f);
	}
	@Transactional
	public int deleteFollow(int memberNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		int followerNo = member.getMemberNo();
		Follow f = new Follow();
		f.setFollowerNo(followerNo);
		f.setFollowingNo(memberNo);
		return memberDao.deleteFollow(f);
	}

	public int getIsFollow(int memberNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		int followerNo = member.getMemberNo();
		Follow f = new Follow();
		f.setFollowerNo(followerNo);
		f.setFollowingNo(memberNo);
		return memberDao.getIsFollow(f);
	}

	public Map getFollower(int memberNo) {
		int followerCount = memberDao.followerCount(memberNo);
		List followerList = memberDao.getFollower(memberNo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("followerCount",followerCount);
		map.put("followerList", followerList);
		return map;
	}

	public Map getFollowing(int memberNo) {
		int followingCount = memberDao.followingCount(memberNo);
		List followingList = memberDao.getFollowing(memberNo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("followingCount", followingCount);
		map.put("followingList", followingList);
		return map;
	}
	@Transactional
	public int deleteMyFollwer(int memberNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		int followingNo = member.getMemberNo();
		Follow f = new Follow();
		f.setFollowerNo(memberNo);
		f.setFollowingNo(followingNo);
		return memberDao.deleteMyFollower(f);
	}

	public String mailCheck(String memberMail) {
		String m = memberDao.mailCheck(memberMail);
		return m;
	}

	public int pwChk(Member member) {
		Member m = memberDao.pwChk(member);
		if(m != null ) {
			return 1;
		}else {
			return 0;
		}
	}
	
	@Transactional
	public int findChangePwMember(Member member) {
		// TODO Auto-generated method stub
		return memberDao.findChangePwMember(member);
	}
	
	@Transactional
	public String getMemberByOauthLoginMember(OauthParams oauthParams) {
		
//		System.out.println("------ Oauth 로그인 시도 ------");
		// 인증 파라미터 객체를 이용하여 해당 enum클래스에 해당하는 메소드 수행
		OauthMember oauthMember = requestOauthInfoService.request(oauthParams);
//		System.out.println("전달받은 유저정보:: " + oauthMember.getEmail());
		
		// 획득한 회원정보로 검증할 MemberDTO 생성
		Member accessMember = new Member();
		accessMember.setMemberId(oauthMember.getEmail());
		

		// 획득된 회원정보 DB 조회
		Member result = memberDao.selectByOauthLogin(accessMember);
		// 반환할 JWT
		String accessJwt = null;

		if (result == null) {
//			System.out.println("------ 회원가입 필요한 회원 ------");
			// 회원가입이 되지 않은 회원이기 때문에 회원 Dao에 값을 전달하여 DB저장
//			System.out.println("회원가입 요청 :: " + accessMember.getMemberId());
			
			// kakaoMember에서 전달된 데이터를 가진 memberDao DB 저장
			String kakaoPass = "semomokakaoMember";
			accessMember.setMemberPw(kakaoPass);
//			System.out.println(accessMember);
			int success = memberDao.insertKakaoMember(accessMember);
			
//			System.out.println("로그인 성공값 : "+success);

//			System.out.println("회원가입 완료 :: " + accessMember.getMemberId());
		}
		// 이미 가입된 회원은 토큰발급
//		System.out.println("------ JWT 발급 ------");
		accessJwt = jwtUtil.createToken(accessMember.getMemberId(), secretKey, expiredMs);
		
//		System.out.println("------ JWT 발급완료 ------ :"+accessJwt);
		return accessJwt;
	}
	
	@Transactional
	public int kakaoJoin(Member member) {
		// TODO Auto-generated method stub
		System.out.println(member);
		return memberDao.kakaoJoin(member);
	}

	public int deleteMember(String memberId) {
		// TODO Auto-generated method stub
		return memberDao.deleteMember(memberId);
	}
	
	
}
