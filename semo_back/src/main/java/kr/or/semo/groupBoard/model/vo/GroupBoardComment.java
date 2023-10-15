package kr.or.semo.groupBoard.model.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="groupBoardComment")
public class GroupBoardComment {
	private int grBoardCommentNo;
	private int grBoardNo;
	private int grBoardCommentWriter;
	private String memberName;
	private String grBoardCommentContent;
	private int grBoardCommentNo2;
	private String grBoardCommentRef;
	private Date grBoardCommentDate;
	private String memberImg;
}
