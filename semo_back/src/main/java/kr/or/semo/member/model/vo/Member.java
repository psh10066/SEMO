package kr.or.semo.member.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="member")
public class Member {
	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberPhone;
	private String memberName;
	private String memberMail;
	private int memberType;
	private String memberContent;
	private int memberCategory1;
	private int memberCategory2;
	private int memberLocal;
	private String memberImg;
}
