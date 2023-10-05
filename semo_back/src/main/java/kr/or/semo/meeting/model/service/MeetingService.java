package kr.or.semo.meeting.model.service;

import org.springframework.stereotype.Service;

import kr.or.semo.meeting.model.dao.MeetingDao;
import kr.or.semo.meeting.model.vo.Meeting;

@Service
public class MeetingService {
	private MeetingDao meetingDao;

	public int create(Meeting meeting) {
		// TODO Auto-generated method stub
		return meetingDao.create(meeting);
	}
}
