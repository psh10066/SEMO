package kr.or.semo.group.controller;

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
import kr.or.semo.group.model.service.GroupService;
import kr.or.semo.group.model.vo.Group;

@RestController
@RequestMapping(value="/group")
public class GroupController {
	@Autowired
	private GroupService groupService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	//모임생성
	@PostMapping(value="/create")
	public int insertGroup(@ModelAttribute Group g, @ModelAttribute MultipartFile thumbnail, @RequestAttribute String memberId) {
		g.setMemberId(memberId);
		String savepath = root+"group/";
		if(thumbnail != null) {
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getfilepath(savepath, filename, thumbnail);
			g.setGroupImg(filepath);	
		}
		int result = groupService.insertGroup(g);
		return result;
	}
	//에디터 이미지 삽입
	@PostMapping(value="/contentImg")
	public String contentImg(@ModelAttribute MultipartFile image) {
		String savepath = root+"group/editor/";
		String filename = image.getOriginalFilename();
		String filepath = fileUtil.getfilepath(savepath, filename, image);
		return "/group/editor/"+filepath;
	}
	
	//상세보기 조회
	@GetMapping(value="/view/{groupNo}")
	public Group View(@PathVariable int groupNo) {
		return groupService.selectOneGroup(groupNo);
	}
}
