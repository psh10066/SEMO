package kr.or.semo.notice.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;

@Mapper
public interface NoticeDao {

	int totalCount();

	List selectNoticeList(PageInfo pi);

}
