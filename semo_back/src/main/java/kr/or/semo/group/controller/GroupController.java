package kr.or.semo.group.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.semo.FileUtil;
import kr.or.semo.group.model.service.GroupService;
import kr.or.semo.group.model.vo.ChatRoom;
import kr.or.semo.group.model.vo.Group;
import kr.or.semo.group.model.vo.GroupJoin;
import kr.or.semo.member.model.vo.Member;

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
	public Group View(@PathVariable int groupNo, @RequestAttribute String memberId) {
		return groupService.selectOneGroup(groupNo, memberId);
	}
	
	//그룹 가입
	@PostMapping(value="/groupJoin")
	public int groupJoin(@RequestBody Group g, @RequestAttribute String memberId) {
		return groupService.groupJoin(memberId, g);
	}
	
	//그룹가입여부 조회
	@PostMapping(value="/joinState")
	public int joinState(@RequestAttribute String memberId, @RequestBody Group g) {
		int result = groupService.joinState(memberId,g);
		return result;
	}
	
	//그룹 등급 조회
	@PostMapping(value="/groupLevelState")
	public int groupLevelState(@RequestBody Group g, @RequestAttribute String memberId) {
		int groupNo = g.getGroupNo();
		return groupService.groupLevelState(groupNo, memberId);
		
	}
	
	//그룹 탈퇴
	@PostMapping(value="/groupExit")
	public int groupExit(@RequestBody Group g, @RequestAttribute String memberId) {
		int groupNo = g.getGroupNo();
		return groupService.groupExit(memberId, groupNo);
	}
	
	//그룹 가입수 조회
	@PostMapping(value="/joinNum")
	public int joinNum(@RequestAttribute String memberId) {
		return groupService.joinNum(memberId);
	}
	
	//그룹 전체멤버수 조회
	@PostMapping(value="/totalMemberCount")
	public int totalMemberCount(@RequestBody Group g) {
		int groupNo = g.getGroupNo();
		int result = groupService.totalMemberCount(groupNo);
		System.out.println("결과확인 : "+result);
		return result;
	}
	//그룹 찜하기
	@PostMapping(value="/save/toggle/{groupNo}")
	public int groupSaveToggle(@PathVariable int groupNo, @RequestAttribute String memberId) {
		return groupService.groupSaveToggle(groupNo,memberId);
	}
	
	
	//채팅방이름(=그룹이름) , 채팅방주소(=그룹넘버) 불러오기
	@PostMapping(value="/groupChatRoomName")
	public List groupChatRoomName(@RequestBody Group g,@RequestAttribute String memberId) {
		g.setMemberId(memberId);
		return groupService.groupChatRoomName(g,memberId);
	}
	//그룹에 있는 모든 회원번호, 회원이름 불러오기
	@PostMapping(value="/groupAllMember")
	public List groupAllMember(@RequestBody Map<String, Integer> request) {
	    int groupNo = request.get("groupNo"); //객체로 보낸거 키(groupNo) , 값 가지고옴 
	    return groupService.groupAllMember(groupNo);
	}
	
	
	
}
