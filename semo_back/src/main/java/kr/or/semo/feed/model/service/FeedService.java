package kr.or.semo.feed.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.feed.model.dao.FeedDao;
import kr.or.semo.feed.model.vo.Feed;
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
	
	//피드 작성
	@Transactional
	public int insertFeed(Feed f) {
		Member member = memberDao.selectOneMember(f.getMemberId());
		f.setFeedWriter(member.getMemberNo());
		int result = feedDao.insertFeed(f);
		return result;
	}

	public List selectFeedList(int feedWriter) {
		List feedList = feedDao.selectFeedList(feedWriter);
		return feedList;
	}

	public Feed selectOneFeed(int feedNo) {
		// TODO Auto-generated method stub
		return feedDao.selectOneFeed(feedNo);
	}
}
