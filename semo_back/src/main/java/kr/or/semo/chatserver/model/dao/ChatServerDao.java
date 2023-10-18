package kr.or.semo.chatserver.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.chatserver.model.vo.LastAccessChatTime;
import kr.or.semo.chatserver.model.vo.Message;

@Mapper
public interface ChatServerDao {

	int messageInsert(Message messagePayload);

	int chatAccessTimeInsert(LastAccessChatTime lastAccessChatTime);

	List chatPreviousMessage(int roomId);

	String myChatTime(int roomId,int memberNo);

	String totalChatTime(int roomId);



}
