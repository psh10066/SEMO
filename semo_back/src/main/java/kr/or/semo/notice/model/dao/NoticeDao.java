package kr.or.semo.notice.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;
import kr.or.semo.notice.model.vo.Notice;

@Mapper
public interface NoticeDao {

	int totalCount();

	List selectNoticeList(PageInfo pi);

	Notice selectOneNotice(int noticeNo);

	int insertNotice(Notice n);

}
