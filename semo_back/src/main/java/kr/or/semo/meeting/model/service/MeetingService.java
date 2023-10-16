package kr.or.semo.meeting.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.meeting.model.dao.MeetingDao;
import kr.or.semo.meeting.model.vo.Meeting;
import kr.or.semo.meeting.model.vo.MeetingJoin;

@Service
public class MeetingService {
	@Autowired
	private MeetingDao meetingDao;

	@Transactional
	public int createMeeting(Meeting meeting) {
		// TODO Auto-generated method stub
		return meetingDao.createMeeting(meeting);
	}

	public List selectMeetingList(int groupNo) {
		List meetingList = meetingDao.selectMeetingList(groupNo);
		return meetingList;
	}
	@Transactional
	public int joinMeeting(MeetingJoin meetingJoin) {
		// TODO Auto-generated method stub
		return meetingDao.joinMeeting(meetingJoin);
	}

	public List selectMember(int meetingNo) {
		// TODO Auto-generated method stub
		return meetingDao.selectMember(meetingNo);
	}

	
	
}
