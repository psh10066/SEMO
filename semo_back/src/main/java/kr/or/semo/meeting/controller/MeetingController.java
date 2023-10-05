package kr.or.semo.meeting.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.meeting.model.service.MeetingService;
import kr.or.semo.meeting.model.vo.Meeting;


@RestController
@RequestMapping(value = "/meeting")
public class MeetingController {
	private MeetingService meetingService;
	
	@PostMapping(value = "/create")
	public int create(@RequestBody Meeting meeting) {
		int result = meetingService.create(meeting);
		return result;
	}

}
