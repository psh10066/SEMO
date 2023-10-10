package kr.or.semo.feed.model.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FeedDao {

	int insertFeed(Feed f);

	List selectFeedList(int feedWriter);

	Feed selectOneFeed(int feedNo);

	int updateFeed(Feed f);

	int deleteFeed(int feedNo);

	List getFeedLike(int feedNo);

	int feedLikeCount(int feedNo);

	int getIsLike(int feedNo, int memberNo);

	int insertFeedLike(int feedNo, int memberNo);

	int deleteFeedLike(int feedNo, int memberNo);


}
