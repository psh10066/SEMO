package kr.or.semo.group.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestAttribute;

import kr.or.semo.group.model.dao.GroupDao;
import kr.or.semo.group.model.vo.Group;
import kr.or.semo.group.model.vo.GroupJoin;
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
		if(result>0) {
			gj.setGroupNo(groupNo);
			gj.setMemberNo(member.getMemberNo());
			int result2 = groupDao.insertGroupJoin(gj);
			return result2;
		}
		return 0;
	}

	public Group selectOneGroup(int groupNo) {
		Group g = groupDao.selectOneGroup(groupNo);
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
}
