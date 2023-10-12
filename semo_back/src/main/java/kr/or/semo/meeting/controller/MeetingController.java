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


@RestController
@RequestMapping(value = "/meeting")
public class MeetingController {
	@Autowired
	private MeetingService meetingService;
	
	@PostMapping(value = "/create")
	public int create(@ModelAttribute Meeting meeting,@RequestAttribute String memberId,@ModelAttribute int groupNo) {		
		
		
		int result = meetingService.createMeeting(meeting);
		return result;
	}
	@GetMapping(value = "/view/{groupNo}")
	public List View(@PathVariable int groupNo) {
		return meetingService.selectMeetingList(groupNo);
	}
	

}