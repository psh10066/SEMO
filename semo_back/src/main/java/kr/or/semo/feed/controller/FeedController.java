package kr.or.semo.feed.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.semo.FileUtil;
import kr.or.semo.feed.model.service.FeedService;
import kr.or.semo.feed.model.vo.Feed;
import kr.or.semo.member.model.service.MemberService;
import kr.or.semo.member.model.vo.Member;

@RestController
@RequestMapping(value="/feed")
public class FeedController {
	@Autowired
	private FeedService feedService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	//피드 프로필
	@GetMapping(value="/profile/{memberNo}")
	public Member profile(@PathVariable int memberNo) {
		return feedService.selectOneMember(memberNo);
	}
	
	//피드 작성
	@PostMapping(value="/write")
	public int insertFeed(@ModelAttribute Feed f, @ModelAttribute MultipartFile thumbnail, @RequestAttribute String memberId) {
		f.setMemberId(memberId);
		String savepath = root+"feed/";
		if(thumbnail != null) {
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getfilepath(savepath, filename, thumbnail);
			f.setFeedImg(filepath);
		}
		int result = feedService.insertFeed(f);
		return result;
	}
	
	//피드리스트 가져오기
	@GetMapping(value="/list/{feedWriter}")
	public List feedList(@PathVariable int feedWriter) {
		System.out.println("feedWriter : "+feedWriter);
		return feedService.selectFeedList(feedWriter);
	}
	
	//피드 상세보기(피드리스트 가져오기)
	@GetMapping(value="/view/{feedNo}")
	public Feed view(@PathVariable int feedNo) {
		return feedService.selectOneFeed(feedNo);
	}
}
