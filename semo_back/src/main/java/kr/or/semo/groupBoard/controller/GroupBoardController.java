package kr.or.semo.groupBoard.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.semo.FileUtil;
import kr.or.semo.groupBoard.model.service.GroupBoardService;
import kr.or.semo.groupBoard.model.vo.GroupBoard;

@RestController
@RequestMapping(value="/groupBoard")
public class GroupBoardController {
	@Autowired
	private GroupBoardService groupBoardService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	@GetMapping(value="/list/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		Map map = groupBoardService.groupBoardList(reqPage);
		return map;
	}
	@PostMapping(value="/insert")
//	public int insertBoard(@ModelAttribute GroupBoard gb, @RequestAttribute String memberId) {
//		gb.setMemberId(memberId);
	public int insertBoard(@ModelAttribute GroupBoard gb) {
		gb.setMemberId("1"); // 임시
		gb.setGroupNo(1); // 임시
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
}