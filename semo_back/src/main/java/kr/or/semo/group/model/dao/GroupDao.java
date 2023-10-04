package kr.or.semo.group.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.group.model.vo.Group;

@Mapper
public interface GroupDao {

	int insertGroup(Group g);

}
