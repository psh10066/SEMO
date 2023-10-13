package kr.or.semo.member.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.semo.FileUtil;
import kr.or.semo.member.model.service.MemberService;
import kr.or.semo.member.model.vo.Member;

@RestController
@RequestMapping(value = "/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;

	// 로그인
	@PostMapping(value = "/login")
	public String login(@RequestBody Member member) {
		String result = memberService.login(member);
		return result;
	}

	// 아이디 중복검사
	@GetMapping(value = "/checkId/{memberId}")
	public int checkId(@PathVariable String memberId) {
		Member m = memberService.selectOneMember(memberId);
		if (m == null) {
			return 0;
		} else {
			return 1;
		}
	}

	// 회원가입
	@PostMapping(value = "/join")
	public int join(@ModelAttribute Member member, @ModelAttribute MultipartFile memberThumbnail) {
		String savepath = root + "member/";
		if (memberThumbnail != null) {
			String filename = memberThumbnail.getOriginalFilename();
			String filepath = fileUtil.getfilepath(savepath, filename, memberThumbnail);
			member.setMemberImg(filepath);
		}
		int result = memberService.insertMember(member);
		return result;
	}

	// 로그인된 회원 정보 가져오기
	@PostMapping(value = "/getMember")
	public Member mypage(@RequestAttribute String memberId) {
		return memberService.selectOneMember(memberId);
	}

	// 내정보수정
	@PostMapping(value = "/updateMyInfo")
	public int updateMyInfo(@RequestBody Member member, @RequestAttribute String memberId) {
		member.setMemberId(memberId);
		return memberService.updateMyInfo(member);

	}

	// 비밀번호 검사 - @RequestBody 필터 통과 후 (로그인한 아이디가 있는 ) requestAttribute 값 가져옴
	@PostMapping(value = "/pwCheck")
	public int checkPw(@RequestBody Member member, @RequestAttribute String memberId) {
		member.setMemberId(memberId);
		return memberService.selectOneMemberByPw(member);
	}

	// 비밀번호 수정
	@PostMapping(value = "/updatePwMember")
	public int updatePwMember(@RequestBody Member member, @RequestAttribute String memberId) {
		member.setMemberId(memberId);
		return memberService.updatePwMember(member);

	}

	// 내 피드 수정
	@PostMapping(value = "/updateMyFeed")
	public int updateMyFeed(@ModelAttribute Member member, @ModelAttribute MultipartFile feedThumbnail,
			@RequestAttribute String memberId) {

		member.setMemberId(memberId);
	
		String savepath = root + "member/";

		if (feedThumbnail != null) {
			String filename = feedThumbnail.getOriginalFilename();
			String filepath = fileUtil.getfilepath(savepath, filename,feedThumbnail);
			
			//이전 이미지 있으면 삭제
			if(member.getMemberImg() != null) {
				String oldMemberImgPath = member.getMemberImg();
				File oldMemberImgFile = new File(savepath + oldMemberImgPath);
				oldMemberImgFile.delete();
			}
			//새 이미지 파일 추가
				member.setMemberImg(filepath);	
			
		}
		return memberService.updateMyFeed(member);
	}
	//내 관심사 수정
	@PostMapping(value = "/updateMyLike")
	public int updateMyLike(@RequestBody Member member, @RequestAttribute String memberId) {
		member.setMemberId(memberId);
		return memberService.updateMyLike(member);

	}
	
	//팔로우 관련 멤버리스트 가져오기
	@GetMapping(value="/memberList")
	public List memberList(String memberNoList) {
		return memberService.memberList(memberNoList);
	}
}
