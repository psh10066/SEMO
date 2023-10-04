package kr.or.semo.report.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;

@Mapper
public interface ReportDao {

	int reportTotalCount();

	List reportList(PageInfo pi);

}
