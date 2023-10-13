package kr.or.semo.groupPhoto.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;
import kr.or.semo.groupPhoto.model.vo.GroupPhoto;

@Mapper
public interface GroupPhotoDao {

	int totalCount();

	List selectgroupPhotoList(int groupNo, PageInfo pi);

	GroupPhoto selectOneGroupPhoto(int grPhotoNo);

	int insertGroupPhoto(GroupPhoto gp);

	int updateGroupPhoto(GroupPhoto gp);

	int deleteGroupPhoto(int grPhotoNo);


}
