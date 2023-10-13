package kr.or.semo.meeting.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "meetingJoin")
public class MeetingJoin {
	private int mt_join;
	private int member_no;
	private int meeting_no;

}
