package kr.or.semo.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.member.model.service.MemberService;
import kr.or.semo.member.model.vo.Member;

@RestController
@RequestMapping(value="/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	//로그인
	@PostMapping(value="/login")
	public String login(@RequestBody Member member) {
		System.out.println("컨트롤러1");
		String result = memberService.login(member);
		return result;
	}
	
	//아이디 중복검사
	@GetMapping(value="/checkId/{memberId}")
	public int checkId(@PathVariable String memberId) {
		Member m = memberService.selectOneMember(memberId);
		if(m == null) {
			return 0;
		}else {
			return 1;
		}
	}
	@PostMapping(value="/join")
	public int join(@RequestBody Member member) {
		System.out.println(member.getMemberMail());
		System.out.println(member.getMemberPhone());
		int result = memberService.insertMember(member);
		return result;
	}
}
