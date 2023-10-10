package kr.or.semo.meeting.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.meeting.model.dao.MeetingDao;
import kr.or.semo.meeting.model.vo.Meeting;

@Service
public class MeetingService {
	@Autowired
	private MeetingDao meetingDao;

	@Transactional
	public int createMeeting(Meeting meeting) {
		// TODO Auto-generated method stub
		return meetingDao.createMeeting(meeting);
	}

	public Meeting selectOneMeeting(int groupNo) {
		Meeting m = meetingDao.selectOneMeeting(groupNo);
		return m;
	}

	
	
}
