package kr.or.semo.meeting.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Meeting {
	private int meetingNo;
	private int groupNo;
	private int grJoin;
	private String meetingName;
	private String meetingDate;
	private String meetingPlace;
	private int meetingPrice;
	private int meetingMaxnum;
}
