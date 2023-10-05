package kr.or.semo.group.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.group.model.vo.Group;
import kr.or.semo.group.model.vo.GroupJoin;

@Mapper
public interface GroupDao {

	int insertGroup(Group g);

	int insertGroupJoin(GroupJoin gj);

	int selectGroupNo();

	Group selectOneGroup(int groupNo);

}
