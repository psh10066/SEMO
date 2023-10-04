package kr.or.semo.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.PageInfo;
import kr.or.semo.Pagination;
import kr.or.semo.admin.model.dao.AdminDao;
import kr.or.semo.admin.model.vo.Admin;

@Service
public class AdminService {
	@Autowired
	private AdminDao adminDao;
	@Autowired
	private Pagination pagination;	
	
	public Map memberList(int reqPage) {
		int totalCount = adminDao.totalCount();
		int numPerPage = 10;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List memberList = adminDao.memberList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", memberList);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int changeType(Admin admin) {
		return adminDao.changeType(admin);
	}

}
