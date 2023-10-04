package kr.or.semo.group.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="groupJoin")
public class GroupJoin {
	private int grJoin;
	private int groupNo;
	private int memberNo;
	private int grJoinType;
}
