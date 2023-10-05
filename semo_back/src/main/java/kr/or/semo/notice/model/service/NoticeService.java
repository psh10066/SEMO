package kr.or.semo.notice.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.semo.PageInfo;
import kr.or.semo.Pagination;
import kr.or.semo.notice.model.dao.NoticeDao;

@Service
public class NoticeService {
	@Autowired
	private NoticeDao noticeDao;
	@Autowired
	private Pagination pagination;
	
	public Map noticeList(int reqPage) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		int totalCount = noticeDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List noticeList = noticeDao.selectNoticeList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("noticeList", noticeList);
		map.put("pi", pi);
		return map;
	}
}
