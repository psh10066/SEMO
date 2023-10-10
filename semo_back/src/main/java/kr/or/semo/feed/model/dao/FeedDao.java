package kr.or.semo.feed.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.feed.model.vo.Feed;

@Mapper
public interface FeedDao {

	int insertFeed(Feed f);

	List selectFeedList(int feedWriter);

	Feed selectOneFeed(int feedNo);

	int updateFeed(Feed f);

	int deleteFeed(int feedNo);

}
