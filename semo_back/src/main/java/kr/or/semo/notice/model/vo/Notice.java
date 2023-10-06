package kr.or.semo.notice.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="notice")
public class Notice {
	private int noticeNo;
	private String noticeTitle;
	private String noticeContent;
	private int memberNo;
	private String noticeDate;
	private String memberId;
	private String memberName;
}