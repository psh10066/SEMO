package kr.or.semo.groupBoard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import kr.or.semo.groupBoard.model.service.GroupBoardService;
import kr.or.semo.groupBoard.model.vo.GroupBoard;
import kr.or.semo.groupBoard.model.vo.GroupBoardComment;

@RestController
@RequestMapping(value="/groupBoard")
public class GroupBoardController {
	@Autowired
	private GroupBoardService groupBoardService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	@GetMapping(value="/list/{groupNo}/{reqPage}")
	public Map list(@PathVariable int groupNo, @PathVariable int reqPage) {
		Map map = groupBoardService.groupBoardList(groupNo,reqPage);
		return map;
	}
	@PostMapping(value="/insert")
	public int insertGroupBoard(@ModelAttribute GroupBoard gb, @RequestAttribute String memberId) {
		gb.setMemberId(memberId);
		int result = groupBoardService.insertGroupBoard(gb);
		return result;
	}
	@GetMapping(value="/view/{grBoardNo}")
	public GroupBoard view(@PathVariable int grBoardNo) {
		return groupBoardService.selectOneGroupBoard(grBoardNo);
	}
	//에디터 이미지 삽입
	@PostMapping(value="/contentImg")
	public String contentImg(@ModelAttribute MultipartFile image) {
		String savepath = root+"groupBoard/editor/";
		String filename = image.getOriginalFilename();
		String filepath = fileUtil.getfilepath(savepath, filename, image);
		return "/groupBoard/editor/"+filepath;
	}
	//수정
	@PostMapping(value="/modify")
	public int modify(@ModelAttribute GroupBoard gb, @RequestAttribute String memberId) {
		gb.setMemberId(memberId);
		int result = groupBoardService.updateGroupBoard(gb);
		return result;
	}
	//삭제
	@GetMapping(value="/delete/{grBoardNo}")
	public int deleteBoard(@PathVariable int grBoardNo) {
		int result = groupBoardService.deleteGroupBoard(grBoardNo);
		return result;
	}
	//댓글 등록
	@PostMapping(value="/insertComment")
	public int insertComment(@RequestBody GroupBoardComment gbc, @RequestAttribute String memberId) {
		return groupBoardService.insertComment(gbc, memberId);
		
	}
	//댓글 가져오기
	@GetMapping(value="/groupBoardCommentList/{grBoardNo}")
	public List groupBoardCommentList(@PathVariable int grBoardNo) {
		return groupBoardService.groupBoardCommentList(grBoardNo);
	}
	//댓글 삭제
	@GetMapping(value="/deleteComment/{grBoardCommentNo}")
	public int deleteComment(@PathVariable int grBoardCommentNo) {
		return groupBoardService.deleteComment(grBoardCommentNo);
	}
	//댓글 수정
	@GetMapping(value="/modifyComment")
	public int modifyComment(int grBoardCommentNo, String grBoardCommentContent) {
		return groupBoardService.modifyComment(grBoardCommentNo, grBoardCommentContent);
	}
	//대댓글 가져오기
	@GetMapping(value="/groupBoardReCommentList/{grBoardNo}")
	public List groupBoardReCommentList(@PathVariable int grBoardNo) {
		return groupBoardService.groupBoardReCommentList(grBoardNo);
	}
	//댓글 좋아요
	@PostMapping(value="/commentLike/{grBoardCommentNo}")
	public int groupBoardCommentLike(@PathVariable int grBoardCommentNo, @RequestAttribute String memberId) {
		return groupBoardService.groupBoardCommentLike(grBoardCommentNo, memberId);
	}
}