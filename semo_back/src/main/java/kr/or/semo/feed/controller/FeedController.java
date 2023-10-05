package kr.or.semo.feed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.FileUtil;
import kr.or.semo.feed.model.service.FeedService;
import kr.or.semo.member.model.service.MemberService;
import kr.or.semo.member.model.vo.Member;

@RestController
@RequestMapping(value="/feed")
public class FeedController {
	@Autowired
	private FeedService feedService;
	@Autowired
	private FileUtil fileUtil;
	@Value("&{file.root}")
	private String root;
	
	//피드 프로필
	@GetMapping(value="/profile/{memberNo}")
	public Member profile(@PathVariable int memberNo) {
		return feedService.selectOneMember(memberNo);
	}
}
