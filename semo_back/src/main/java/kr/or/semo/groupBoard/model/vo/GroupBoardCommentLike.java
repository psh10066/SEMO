package kr.or.semo.groupBoard.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="groupBoardCommentLike")
public class GroupBoardCommentLike {
	private int grBoardCommentNo;
	private int memberNo;
}
