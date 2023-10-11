package kr.or.semo.page.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.semo.PageInfo;
import kr.or.semo.Pagination;
import kr.or.semo.page.model.dao.PageDao;

@Service
public class PageService {
	@Autowired
	private PageDao pageDao;
	@Autowired
	private Pagination pagination;
	
	public Map pageList(int reqPage, String categoryLocal, String categoryValue) {
		int numPerPage = 12;
		int pageNaviSize = 5;
		int totalCount = pageDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		System.out.println("pi는 "+pi);
		List pageList = null;
		
		if(categoryLocal.equals("all")) {
			pageList = pageDao.selectPageList1(pi);
			System.out.println("pageList는 "+pageList);
			
		}else if(categoryLocal.equals("groupCategory")) {
			HashMap<String, Object> mapCat = new HashMap<String, Object>();
			mapCat.put("pi", pi);
			mapCat.put("categoryLocal", categoryLocal);
			mapCat.put("categoryValue", categoryValue);
			System.out.println("mapCat은 "+mapCat);
			
			pageList = pageDao.selectPageList2(mapCat);
			System.out.println("pageList는 "+pageList);
			
		}else if(categoryLocal.equals("groupLocal")) {
			HashMap<String, Object> mapCat = new HashMap<String, Object>();
			mapCat.put("pi", pi);
			mapCat.put("categoryLocal", categoryLocal);
			mapCat.put("categoryValue", categoryValue);
			System.out.println("mapCat은 "+mapCat);
			
			pageList = pageDao.selectPageList3(mapCat);
			System.out.println("pageList는 "+pageList);
		}
			
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pageList", pageList);
		map.put("pi", pi);
		return map;
	}


}
