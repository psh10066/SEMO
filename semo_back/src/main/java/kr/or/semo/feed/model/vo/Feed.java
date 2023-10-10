package kr.or.semo.feed.model.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="feed")
public class Feed {
	private int feedNo;
	private String feedImg;
	private String feedContent;
	private int feedWriter;
	private String memberId;
	private String memberName;
	private String memberImg;
	private Date feedDate;
}
