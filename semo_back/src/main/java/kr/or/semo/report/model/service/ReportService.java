package kr.or.semo.report.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.PageInfo;
import kr.or.semo.Pagination;
import kr.or.semo.group.model.vo.Group;
import kr.or.semo.member.model.vo.Member;
import kr.or.semo.report.model.dao.ReportDao;
import kr.or.semo.report.model.vo.Report;

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

	public List myGroupList(int memberNo) {
		List list = reportDao.myGroupList(memberNo);
		return list;
	}

	@Transactional
	public int insertReport(Report r) {
		System.out.println("서비스에서의 r값은 "+r);
		int result = reportDao.insertReport(r);
		if(result >0) {
			return result;
		}else {
			return 0;
		}
	}
}
