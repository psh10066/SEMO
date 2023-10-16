package kr.or.semo.meeting.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.meeting.model.vo.Meeting;
import kr.or.semo.meeting.model.vo.MeetingJoin;

@Mapper
public interface MeetingDao {

	int createMeeting(Meeting meeting);

	List selectMeetingList(int groupNo);

	int joinMeeting(MeetingJoin meetingJoin);

	List selectMember(int meetingNo);

	

}
