package kr.or.semo.group.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
		return null;
	}
}
