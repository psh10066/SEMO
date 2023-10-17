package kr.or.semo.groupBoard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;
import kr.or.semo.groupBoard.model.vo.GroupBoard;
import kr.or.semo.groupBoard.model.vo.GroupBoardComment;
import kr.or.semo.groupBoard.model.vo.GroupBoardCommentLike;

@Mapper
public interface GroupBoardDao {

	int totalCount();

	List selectgroupBoardList(int groupNo, PageInfo pi);

	int insertGroupBoard(GroupBoard gb);

	GroupBoard selectOneGroupBoard(int grBoardNo);

	int updateGroupBoard(GroupBoard gb);

	int deleteGroupBoard(int grBoardNo);
	
	int insertComment(GroupBoardComment gbc);

	List groupBoardCommentList(int grBoardNo);

	int deleteComment(int grBoardCommentNo);

	int modifyComment(GroupBoardComment gbc);

	List groupBoardReCommentList(int grBoardNo);

	int insertGroupBoardCommentLike(int grBoardCommentNo, int memberNo);

	int deleteGroupBoardCommentLike(int grBoardCommentNo, int memberNo);

	GroupBoardCommentLike selectOneGroupBoardCommentLike(int grBoardCommentNo, int memberNo);

	

}
