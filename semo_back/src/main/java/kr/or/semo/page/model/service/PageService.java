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
		int numPerPage = 6;
		int pageNaviSize = 5;

		List pageList = null;
		PageInfo pi = null;
		
		if(categoryLocal.equals("all")) {
			int totalCount = pageDao.totalCount1();
			pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			System.out.println("pi는 "+pi);
			
			HashMap<String, Object> mapCat = new HashMap<String, Object>();
			mapCat.put("start",pi.getStart());
			mapCat.put("end",pi.getEnd());
			
			pageList = pageDao.selectPageList1(mapCat);
			System.out.println("pageList는 "+pageList);
			
		}else if(categoryLocal.equals("groupCategory")) {
			
			int totalCount = pageDao.totalCount2(categoryValue);
			pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			System.out.println("pi는 "+pi);
			
			HashMap<String, Object> mapCat = new HashMap<String, Object>();
			mapCat.put("start",pi.getStart());
			mapCat.put("end",pi.getEnd());
			
			//mapCat.put("categoryLocal", categoryLocal);
			mapCat.put("categoryValue", categoryValue);
			System.out.println("mapCat은 "+mapCat);
			
			pageList = pageDao.selectPageList2(mapCat);
			System.out.println("pageList는 "+pageList);
			
		}else if(categoryLocal.equals("groupLocal")) {
			
			int totalCount = pageDao.totalCount3(categoryValue);
			pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			System.out.println("pi는 "+pi);
			
			HashMap<String, Object> mapCat = new HashMap<String, Object>();
			mapCat.put("start",pi.getStart());
			mapCat.put("end",pi.getEnd());
			
			//mapCat.put("categoryLocal", categoryLocal);
			mapCat.put("categoryValue", categoryValue);
			System.out.println("mapCat은 "+mapCat);
			
			pageList = pageDao.selectPageList3(mapCat);
			System.out.println("pageList는 "+pageList);
		}
			//System.out.println(mapCat);
			System.out.println(pageList);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pageList", pageList);
		map.put("pi", pi);
		return map;
	}

	public List search(String searchContent) {
		System.out.println("searchContent는 "+searchContent);
		return pageDao.search(searchContent);
	}

	/*
	public String search(String searchContent) {
		return pageDao.search(searchContent);
	}
*/

}
