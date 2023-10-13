package kr.or.semo.meeting.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "meeting")
public class Meeting {
	private int meetingNo;
	private int groupNo;
	private String meetingName;
	private String meetingDate;
	private String meetingPlace;
	private String meetingPrice;
	private int meetingMaxnum;
	private String memberId;
}






