package kr.or.semo.feed.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.feed.model.vo.Feed;
import kr.or.semo.feed.model.vo.FeedComment;

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

	int insertComment(FeedComment fc);

	List feedCommentList(int feedNo);



}
