package kr.or.semo.feed.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
	@Transactional
	public int modifyFeed(Feed f) {
		// TODO Auto-generated method stub
		return feedDao.updateFeed(f);
	}
	@Transactional
	public String delete(int feedNo) {
		Feed f = feedDao.selectOneFeed(feedNo);
		String feedImg = f.getFeedImg();
		int result = feedDao.deleteFeed(feedNo);
		if(result>0) {
			return feedImg;
		}
		return null;
	}

	public Map getFeedLike(int feedNo) {
		int feedLikeCount = feedDao.feedLikeCount(feedNo);
		List feedLikeList = feedDao.getFeedLike(feedNo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", feedLikeList);
		map.put("feedLikeCount", feedLikeCount);
		return map;
	}

	public int getIsLike(int feedNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		int memberNo = member.getMemberNo();
		return feedDao.getIsLike(feedNo, memberNo);
	}
	@Transactional
	public int insertFeedLike(int feedNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		int memberNo = member.getMemberNo();
		int result = feedDao.insertFeedLike(feedNo, memberNo);
		int likeCount = feedDao.feedLikeCount(feedNo);
		return likeCount;
	}

	public int deleteFeedLike(int feedNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		int memberNo = member.getMemberNo();
		int result = feedDao.deleteFeedLike(feedNo, memberNo);
		int likeCount = feedDao.feedLikeCount(feedNo);
		return likeCount;
	}

}
