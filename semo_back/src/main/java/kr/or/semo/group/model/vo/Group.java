package kr.or.semo.group.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="group")
public class Group {
	private int groupNo;
	private String groupName;
	private String groupImg;
	private int groupMaxnum;
	private String groupContent;
	private int groupCategory;
	private int groupLocal;
	private String memberId;
	private boolean groupSave;
	private int totalCount;
}
