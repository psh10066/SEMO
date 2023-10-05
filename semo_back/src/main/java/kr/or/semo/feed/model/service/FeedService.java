package kr.or.semo.feed.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.semo.feed.model.dao.FeedDao;
import kr.or.semo.member.model.dao.MemberDao;
import kr.or.semo.member.model.vo.Member;

@Service
public class FeedService {
	@Autowired
	private FeedDao feedDao;
	@Autowired
	private MemberDao memberDao;

	public Member selectOneMember(int memberNo) {
		// TODO Auto-generated method stub
		return memberDao.selectMember(memberNo);
	}
}
