package kr.or.semo.feed.model.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="feedComment")
public class FeedComment {
	private int feedCommentNo;
	private int feedNo;
	private int feedCommentWriter;
	private String memberName;		//댓글 작성자 이름
	private String feedCommentContent;
	private int feedCommentNo2;
	private String feedCommentRef;
	private Date feedCommentDate;
	private String memberImg;
}
