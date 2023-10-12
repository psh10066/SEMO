package kr.or.semo.feed.controller;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.semo.FileUtil;
import kr.or.semo.feed.model.service.FeedService;
import kr.or.semo.feed.model.vo.Feed;
import kr.or.semo.feed.model.vo.FeedComment;
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
	
	//피드 수정
	@PostMapping(value="/modify")
	public int modify(@ModelAttribute Feed f, @ModelAttribute MultipartFile thumbnail) {
		if(f.getFeedImg().equals("null")) {
			f.setFeedImg(null);
		}
		
		String savepath = root+"feed/";
		File delFile = new File(savepath+f.getFeedImg());
		delFile.delete();
		if(thumbnail != null) {
			String filepath = fileUtil.getfilepath(savepath, thumbnail.getOriginalFilename(), thumbnail);
			f.setFeedImg(filepath);
		}
		return feedService.modifyFeed(f);
	}
	
	//피드 삭제
	@GetMapping(value="/delete/{feedNo}")
	public int deleteFeed(@PathVariable int feedNo) {
		String feedImg = feedService.delete(feedNo);
		if(feedImg != null) {
			String savepath = root+"feed/";
			File delFile = new File(savepath+feedImg);
			delFile.delete();
			return 1;
		}else {
			return 0;
		}
	}
	
	//피드 좋아요 리스트 가져오기
	@GetMapping(value="/getFeedLike/{feedNo}")
	public Map feedLikeList(@PathVariable int feedNo) {
		return feedService.getFeedLike(feedNo);
	}
	
	//피드 좋아요 isLike 조회
	@PostMapping(value="/isLike")
	public int isLike(@RequestBody Feed f, @RequestAttribute String memberId) {
		int feedNo = f.getFeedNo();
		return feedService.getIsLike(feedNo, memberId);
	}
	//피드 좋아요 
	@PostMapping(value="addLike")
	public int addLike(@RequestBody Feed f, @RequestAttribute String memberId) {
		int feedNo = f.getFeedNo();
		return feedService.insertFeedLike(feedNo,memberId);
	}
	//피드 좋아요 삭제
	@PostMapping(value="/removeLike")
	public int removeLike(@RequestBody Feed f, @RequestAttribute String memberId) {
		int feedNo = f.getFeedNo();
		return feedService.deleteFeedLike(feedNo, memberId);
	}
	
	//피드 댓글 등록
	@PostMapping(value="/insertComment")
	public int insertComment(@RequestBody FeedComment fc, @RequestAttribute String memberId) {
		return feedService.insertComment(fc, memberId);
	}
	//피드 댓글 가져오기
	@GetMapping(value="/feedCommentList/{feedNo}")
	public List feedCommentList(@PathVariable int feedNo) {
		return feedService.feedCommentList(feedNo);
	}
	//피드 댓글 삭제
	@GetMapping(value="/deleteComment/{feedCommentNo}")
	public int deleteComment(@PathVariable int feedCommentNo) {
		return feedService.deleteComment(feedCommentNo);
	}
	//피드 댓글 수정
	@GetMapping(value="/modifyComment")
	public int modifyComment(int feedCommentNo, String feedCommentContent) {
		return feedService.modifyComment(feedCommentNo, feedCommentContent);
	}
	//피드 대댓글 가져오기
	@GetMapping(value="/feedReCommentList/{feedNo}")
	public List feedReCommentList(@PathVariable int feedNo) {
		System.out.println("피드번호 : "+feedNo);
		return feedService.feedReCommentList(feedNo);
	}

}
