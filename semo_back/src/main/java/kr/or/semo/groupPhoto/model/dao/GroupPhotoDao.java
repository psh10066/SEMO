package kr.or.semo.groupPhoto.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;

@Mapper
public interface GroupPhotoDao {

	int totalCount();

	List selectgroupPhotoList(int groupNo, PageInfo pi);

}
