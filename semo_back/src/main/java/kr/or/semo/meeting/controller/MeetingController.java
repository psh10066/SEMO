package kr.or.semo.meeting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

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
	public int create(@RequestBody Meeting meeting) {
		meeting.setMeetingNo(1);
		meeting.setGroupNo(25);
		meeting.setGrJoin(64);
		int result = meetingService.createMeeting(meeting);
		return result;
	}
	@GetMapping(value = "/view/{groupNo}")
	public Meeting View(@PathVariable int groupNo) {
		return meetingService.selectOneMeeting(groupNo);
	}
	

}