package kr.or.semo.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
}
