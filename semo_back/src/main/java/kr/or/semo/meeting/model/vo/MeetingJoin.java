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
	private int mtJoin;
	private int memberNo;
	private int meetingNo;
	private int mtJoinStatus;
	private String memberId;
}
