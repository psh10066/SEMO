package kr.or.semo.report.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="report")
public class Report {
	private int reportNo;
	private String reportDetail;
	private String reportDate;
	private int groupNo;
	private int memberNo;
	private String memberId;
	private String groupName;
}
