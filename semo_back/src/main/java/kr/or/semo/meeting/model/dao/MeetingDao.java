package kr.or.semo.meeting.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.meeting.model.vo.Meeting;

@Mapper
public interface MeetingDao {

	int createMeeting(Meeting meeting);

	List selectMeetingList(int groupNo);

	

}
