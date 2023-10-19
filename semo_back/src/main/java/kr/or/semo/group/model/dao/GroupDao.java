package kr.or.semo.group.model.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestAttribute;

import kr.or.semo.group.model.vo.ChatRoom;
import kr.or.semo.group.model.vo.Group;
import kr.or.semo.group.model.vo.GroupJoin;
import kr.or.semo.group.model.vo.GroupSave;
import kr.or.semo.member.model.vo.Member;

@Mapper
public interface GroupDao {

	int insertGroup(Group g);

	int insertGroupJoin(GroupJoin gj);

	int selectGroupNo();

	Group selectOneGroup(int groupNo);

	int groupJoin(String memberId, int groupNo);

	GroupJoin joinState(String memberId, int groupNo);

	Integer groupLevelState(int groupNo, String memberId);

	int groupExit(String memberId, int groupNo);

	int joinNum(String memberId);

	int totalMemberCount(int groupNo);

	int insertChatRoom(ChatRoom cr);

	List groupChatRoomName(int memberNo);

	GroupSave selectOneGroupSave(int groupNo, int memberNo);

	int deleteGroupSave(int groupNo, int memberNo);

	int insertGroupSave(int groupNo, int memberNo);

	List groupAllMember(int groupNo);

	int peopleCount(int groupNo);

	List peopleList(int groupNo);

	int deleteGroup(int groupNo);

	List<Integer> LikeGroupNo(Member m);

	List<Group> myLikeGroup(List<Integer> groupNo);

	List selectGrJoinMember(int groupNo);

	List groupMemberList(int groupNo);

	int modifyGroup(Group g);

	int changeType(GroupJoin grJoin);

	

}
