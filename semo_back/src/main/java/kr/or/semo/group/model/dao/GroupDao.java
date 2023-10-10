package kr.or.semo.group.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestAttribute;

import kr.or.semo.group.model.vo.Group;
import kr.or.semo.group.model.vo.GroupJoin;
import kr.or.semo.member.model.vo.Member;

@Mapper
public interface GroupDao {

	int insertGroup(Group g);

	int insertGroupJoin(GroupJoin gj);

	int selectGroupNo();

	Group selectOneGroup(int groupNo);

	int groupJoin(String memberId, int groupNo);

	GroupJoin joinState(String memberId);

	Integer groupLevelState(int groupNo, String memberId);

	int groupExit(String memberId);

	

}
