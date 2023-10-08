package kr.or.semo.groupBoard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;
import kr.or.semo.groupBoard.model.vo.GroupBoard;

@Mapper
public interface GroupBoardDao {

	int totalCount();

	List selectgroupBoardList(int groupNo, PageInfo pi);

	int insertGroupBoard(GroupBoard gb);

	GroupBoard selectOneGroupBoard(int grBoardNo);

	int updateGroupBoard(GroupBoard gb);

	int deleteGroupBoard(int grBoardNo);

}
