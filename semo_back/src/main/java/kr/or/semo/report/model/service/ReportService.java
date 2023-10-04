package kr.or.semo.report.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.semo.PageInfo;
import kr.or.semo.Pagination;
import kr.or.semo.report.model.dao.ReportDao;

@Service
public class ReportService {
	@Autowired
	private ReportDao reportDao;
	@Autowired
	private Pagination pagination;
	
	public Map reportList(int reqPage) {
		int totalCount = reportDao.reportTotalCount();
		int pageNaviSize = 5;
		int numPerPage = 10;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List reportList = reportDao.reportList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pi", pi);
		map.put("list", reportList);
		return map;
	}
}
