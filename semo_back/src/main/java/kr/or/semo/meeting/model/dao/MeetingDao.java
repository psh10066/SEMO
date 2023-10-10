package kr.or.semo.meeting.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.meeting.model.vo.Meeting;

@Mapper
public interface MeetingDao {

	int createMeeting(Meeting meeting);

	Meeting selectOneMeeting(int groupNo);

	

}
