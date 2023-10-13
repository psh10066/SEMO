package kr.or.semo.groupBoard.model.vo;

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
	private String grBoardCommentContent;
	private String grBoardCommentDate;
	private int grBoardNo;
	private int grBoardCommentNo2;
	private int grBoardCommentWriter;
	private String grBoardCommentRef;
	private String memberImg;
}
