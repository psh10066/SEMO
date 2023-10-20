package kr.or.semo.groupBoard.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="groupBoard")
public class GroupBoard {
	private int grBoardNo;
	private String grBoardTitle;
	private String grBoardContent;
	private String grBoardDate;	
	private int grBoardWriter;
	private String memberId;
	private String memberName;
	private int groupNo;//모임번호
	private int grBoardState;
}
