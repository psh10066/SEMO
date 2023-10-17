package kr.or.semo.page.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;

@Mapper
public interface PageDao {

	int totalCount1();
	
	int totalCount2(String categoryValue);
	
	int totalCount3(String categoryValue);

	List selectPageList1(HashMap<String, Object> mapCat);

	List selectPageList2(HashMap<String, Object> mapCat);

	List selectPageList3(HashMap<String, Object> mapCat);

	List search(String searchContent);

	int searchTotalCount(String searchKeyword);

	List socialingSearchList(HashMap<String, Object> mapSearch);

	int searchTotalCountFeed(String searchKeyword);

	List feedSearchList(HashMap<String, Object> mapSearch);

}
