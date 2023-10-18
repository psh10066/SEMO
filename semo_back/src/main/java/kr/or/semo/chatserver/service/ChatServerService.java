package kr.or.semo.chatserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.chatserver.model.dao.ChatServerDao;
import kr.or.semo.chatserver.model.vo.LastAccessChatTime;
import kr.or.semo.chatserver.model.vo.Message;

@Service
public class ChatServerService {
	@Autowired
	private ChatServerDao chatServerDao;

	@Transactional 
	public int messageInsert(Message messagePayload) {
		return chatServerDao.messageInsert(messagePayload);
	}

	public List chatTimeList(int roomId,int memberNo) {
		return chatServerDao.chatTimeList(roomId,memberNo);
	}
	
	@Transactional
	public int chatAccessTimeInsert(LastAccessChatTime lastAccessChatTime) {
		return chatServerDao.chatAccessTimeInsert(lastAccessChatTime);
	}
	@Transactional
	public int updateAccessTime(LastAccessChatTime lastAccessChatTime) {
		return chatServerDao.updateAccessTime(lastAccessChatTime);
	}

	public List chatPreviousMessage(int roomId) {
		return chatServerDao.chatPreviousMessage(roomId);
	}

	public String myChatTime(int roomId, int memberNo) {
		return chatServerDao.myChatTime(roomId,memberNo);
	}

	public String totalChatTime(int roomId) {
		return chatServerDao.totalChatTime(roomId);
	}





}
