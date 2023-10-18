package kr.or.semo.page.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.semo.PageInfo;
import kr.or.semo.Pagination;
import kr.or.semo.group.model.vo.Group;
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
			//System.out.println("pi는 "+pi);
			
			HashMap<String, Object> mapCat = new HashMap<String, Object>();
			mapCat.put("start",pi.getStart());
			mapCat.put("end",pi.getEnd());
			
			pageList = pageDao.selectPageList1(mapCat);
			//System.out.println("pageList는 "+pageList);
			
		}else if(categoryLocal.equals("groupCategory")) {
			
			int totalCount = pageDao.totalCount2(categoryValue);
			pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			//System.out.println("pi는 "+pi);
			
			HashMap<String, Object> mapCat = new HashMap<String, Object>();
			mapCat.put("start",pi.getStart());
			mapCat.put("end",pi.getEnd());
			
			mapCat.put("categoryValue", categoryValue);
			//System.out.println("mapCat은 "+mapCat);
			
			pageList = pageDao.selectPageList2(mapCat);
			//System.out.println("pageList는 "+pageList);
			
		}else if(categoryLocal.equals("groupLocal")) {
			
			int totalCount = pageDao.totalCount3(categoryValue);
			pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
			//System.out.println("pi는 "+pi);
			
			HashMap<String, Object> mapCat = new HashMap<String, Object>();
			mapCat.put("start",pi.getStart());
			mapCat.put("end",pi.getEnd());

			mapCat.put("categoryValue", categoryValue);
			//System.out.println("mapCat은 "+mapCat);
			
			pageList = pageDao.selectPageList3(mapCat);
			//System.out.println("pageList는 "+pageList);
		}
			
//			Object obj = pageList.get(0);
//			Group g = (Group)obj;
//			g.getGroupNo();

		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pageList", pageList);
		map.put("pi", pi);
		return map;
	}

	public Map searchSocialing(String searchKeyword, int reqPage) {
		int numPerPage = 8;
		int pageNaviSize = 5;
		
		List searchSocialingList = null;
		PageInfo pi = null;
		
		int totalCount = pageDao.searchTotalCount(searchKeyword);
		pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		System.out.println("socialing pi는 "+pi);
		
		HashMap<String, Object> mapSearch = new HashMap<String, Object>();
		mapSearch.put("start", pi.getStart());
		mapSearch.put("end", pi.getEnd());
		mapSearch.put("searchKeyword", searchKeyword);
		
		searchSocialingList = pageDao.socialingSearchList(mapSearch);
		System.out.println("searchSocialingList는 "+searchSocialingList);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("searchSocialingList", searchSocialingList);
		map.put("pi", pi);
		
		return map;
	}

	public Map searchFeed(String searchKeyword, int reqPage) {
		int numPerPage = 8;
		int pageNaviSize = 5;
		
		List searchFeedList = null;
		PageInfo pi = null;
		
		int totalCount = pageDao.searchTotalCountFeed(searchKeyword);
		pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		System.out.println("Feed pi는 "+pi);
		
		HashMap<String, Object> mapSearch = new HashMap<String, Object>();
		mapSearch.put("start", pi.getStart());
		mapSearch.put("end", pi.getEnd());
		mapSearch.put("searchKeyword", searchKeyword);
		
		searchFeedList = pageDao.feedSearchList(mapSearch);
		System.out.println("searchFeedList는 "+searchFeedList);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("searchFeedList", searchFeedList);
		map.put("pi", pi);
		
		return map;
	}

	public Map loungeList(int reqPage) {
		int numPerPage = 12;
		int pageNaviSize = 5;
		
		List loungeList = null;
		PageInfo pi = null;
		
		int totalCount = pageDao.totalCountLounge();
		pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		System.out.println("pi는 "+pi);
		
		HashMap<String, Object> mapLounge = new HashMap<String, Object>();
		mapLounge.put("start", pi.getStart());
		mapLounge.put("end", pi.getEnd());
		
		loungeList = pageDao.selectLoungeList(mapLounge);
		System.out.println("loungeList는 "+loungeList);
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("loungeList", loungeList);
		map.put("pi", pi);
		
		return map;
	}

}
