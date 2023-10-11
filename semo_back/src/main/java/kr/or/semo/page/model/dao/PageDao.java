package kr.or.semo.page.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;

@Mapper
public interface PageDao {

	int totalCount();

	List selectPageList1(PageInfo pi);
	
	//List selectPageList2(PageInfo pi, String categoryLocal, String categoryValue);

	List selectPageList2(HashMap<String, Object> mapCat);

	List selectPageList3(HashMap<String, Object> mapCat);
	
}
