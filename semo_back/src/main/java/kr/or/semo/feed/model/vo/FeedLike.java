package kr.or.semo.feed.model.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="feedLike")
public class FeedLike {
	private int feedNo;
	private int memberNo;
}
