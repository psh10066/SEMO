package kr.or.semo.group.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="groupSave")
public class GroupSave {
	private int groupSaveNo;
	private int groupNo;
	private int memberNo;
	private int count;
}
