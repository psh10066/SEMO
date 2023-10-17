package kr.or.semo.feed.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="feedCommentLike")
public class FeedCommentLike {
	private int feedCommentNo;
	private int memberNo;
}
