package kr.or.semo.group.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestAttribute;

import kr.or.semo.group.model.dao.GroupDao;
import kr.or.semo.group.model.vo.ChatRoom;
import kr.or.semo.group.model.vo.Group;
import kr.or.semo.group.model.vo.GroupJoin;
import kr.or.semo.group.model.vo.GroupSave;
import kr.or.semo.member.model.dao.MemberDao;
import kr.or.semo.member.model.vo.Member;


@Service
public class GroupService {
	@Autowired
	private GroupDao groupDao;
	@Autowired
	private MemberDao memberDao;

	
	//모임생성
	@Transactional
	public int insertGroup(Group g) {
		int result = groupDao.insertGroup(g);
		Member member = memberDao.selectOneMember(g.getMemberId());
		int groupNo = groupDao.selectGroupNo();
		
		GroupJoin gj = new GroupJoin();
		ChatRoom cr = new ChatRoom();
		
		if(result>0) {
			gj.setGroupNo(groupNo);
			gj.setMemberNo(member.getMemberNo());
			int result2 = groupDao.insertGroupJoin(gj);

			cr.setGroupNo(groupNo);
			int result3 = groupDao.insertChatRoom(cr);
			
			return result2+result3;
		}
	
		return 0;
	}

	public Group selectOneGroup(int groupNo, String memberId) {
		Group g = groupDao.selectOneGroup(groupNo);

		Member member = memberDao.selectOneMember(memberId);
		GroupSave groupSave = groupDao.selectOneGroupSave(groupNo,member.getMemberNo());
		if (groupSave != null) {
			g.setGroupSave(true);
		}
		return g;
	}
	
	@Transactional
	public int groupJoin(String memberId, Group group) {
		int groupNo = group.getGroupNo();
		return groupDao.groupJoin(memberId,groupNo);
	}

	public int joinState(String memberId, Group g) {
		int groupNo = g.getGroupNo(); 
		GroupJoin gj = groupDao.joinState(memberId,groupNo);
		if(gj != null) {
			return 1;
		}
		return 0;
	}

	public int groupLevelState(int groupNo, String memberId) {
		// TODO Auto-generated method stub
		Integer result =groupDao.groupLevelState(groupNo, memberId);
		if(result == null) {
			return 0;
		}
		return result;
	}
	
	@Transactional
	public int groupExit(String memberId, int groupNo) {
		// TODO Auto-generated method stub
		return groupDao.groupExit(memberId,groupNo);
	}

	public int joinNum(String memberId) {
		// TODO Auto-generated method stub
		return groupDao.joinNum(memberId);
	}

	public int totalMemberCount(int groupNo) {
		// TODO Auto-generated method stub
		return groupDao.totalMemberCount(groupNo);
	}

	public List groupChatRoomName(Group g,String memberId) {
		Member member = memberDao.selectOneMember(g.getMemberId());
		return groupDao.groupChatRoomName(member.getMemberNo());
	}
	
	//찜하기
	@Transactional
	public int groupSaveToggle(int groupNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		GroupSave groupSave = groupDao.selectOneGroupSave(groupNo,member.getMemberNo());
		if(groupSave != null) {
			groupDao.deleteGroupSave(groupNo, member.getMemberNo());
			return 0;
		}else {
			groupDao.insertGroupSave(groupNo, member.getMemberNo());
			return 1;
		}		
	}

	public List groupAllMember( int groupNo) {
		return groupDao.groupAllMember(groupNo);
	}

	public Map groupPeopleList(int groupNo) {
		int peopleCount = groupDao.peopleCount(groupNo);
		List peopleList = groupDao.peopleList(groupNo);
		HashMap<String, Object> map = new  HashMap<String, Object>();
		map.put("peopleList", peopleList);
		map.put("peopleCount", peopleCount);
		return map;
	}
	
	@Transactional
	public int deleteGroup(int groupNo) {
		return groupDao.deleteGroup(groupNo);
	}

	public List myLikeGroup(Member m) {
		// TODO Auto-generated method stub
		
		int memberNo = m.getMemberNo();
		System.out.println(memberNo);
		 List<Integer> groupNo= groupDao.LikeGroupNo(m);
		List<Group> g = groupDao.myLikeGroup(groupNo);
		return g;
	}

	public List selectGrJoinMember(int groupNo) {
		// TODO Auto-generated method stub
		return groupDao.selectGrJoinMember(groupNo);
	}

	public List groupMemberList(int groupNo) {
		// TODO Auto-generated method stub 
		return groupDao.groupMemberList(groupNo);
	}

	public List groupLikeList() {
		return groupDao.groupLikeList();
	}

	public List groupLikeListDetail(int groupNo) {
		return groupDao.groupLikeListDetail(groupNo);
	}


   
	@Transactional
	public int modifyGroup(Group g) {
		// TODO Auto-generated method stub
		return groupDao.modifyGroup(g);
	}

	public int chanceType(GroupJoin grJoin) {
		// TODO Auto-generated method stub
		return groupDao.changeType(grJoin);
	}
	

	
}
