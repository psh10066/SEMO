package kr.or.semo.member.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="follow")
public class Follow {
	private int followNo;
	private int followerNo;
	private int followingNo;
}
