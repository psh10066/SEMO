package kr.or.semo.report.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;
import kr.or.semo.member.model.vo.Member;

@Mapper
public interface ReportDao {

	int reportTotalCount();

	List reportList(PageInfo pi);

	//List myGroup(int memberNo);

	List myGroupList(int memberNo);

}
