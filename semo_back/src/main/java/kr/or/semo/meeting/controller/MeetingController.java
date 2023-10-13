package kr.or.semo.meeting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.meeting.model.service.MeetingService;
import kr.or.semo.meeting.model.vo.Meeting;
import kr.or.semo.meeting.model.vo.MeetingJoin;
import kr.or.semo.member.model.vo.Member;


@RestController
@RequestMapping(value = "/meeting")
public class MeetingController {
	@Autowired
	private MeetingService meetingService;
	
	// 약속 생성
	@PostMapping(value = "/create")
	public int create(@RequestBody Meeting meeting,@RequestAttribute String memberId) {		
		meeting.setMemberId(memberId);
		return meetingService.createMeeting(meeting);
	}
	// 약속 보이기
	@GetMapping(value = "/view/{groupNo}")
	public List view(@PathVariable int groupNo) {
		return meetingService.selectMeetingList(groupNo);
	}
	// 약속 참가
	@PostMapping(value = "/join")
	public int join(@RequestBody MeetingJoin meetingJoin, @RequestAttribute String memberId) {
		meetingJoin.setMemberId(memberId);
		return meetingService.joinMeeting(meetingJoin);
	}

	

}