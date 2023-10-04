package kr.or.semo.admin.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="admin")
public class Admin {
	private int memberNo;
	private String memberId;
	private String memberName;
	private String memberMail;
	private String memberPhone;
	private int memberType;
}
