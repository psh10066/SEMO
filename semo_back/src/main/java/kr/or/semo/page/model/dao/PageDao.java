package kr.or.semo.page.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;

@Mapper
public interface PageDao {

	int totalCount();

	List selectPageList(PageInfo pi);

}
