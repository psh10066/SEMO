package kr.or.semo.chatserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.core.net.SyslogOutputStream;
import kr.or.semo.chatserver.model.vo.LastAccessChatTime;
import kr.or.semo.chatserver.model.vo.Message;
import kr.or.semo.chatserver.service.ChatServerService;
import kr.or.semo.group.model.vo.Group;
import kr.or.semo.member.model.vo.Member;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
public class ChatServerController {
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate; ////클라이언트에게 메시지를 보내는데 사용
    @Autowired
    private ChatServerService chatServerService;
    

    //클라이언트 메세지 매핑 (: publish)
    @MessageMapping("/chat/{roomId}") 
    public void receiveGroupMessage(@Payload Message message,@DestinationVariable String roomId) { //@Payload : 전송하고자 하는 실제 데이터
    	simpMessagingTemplate.convertAndSend("/chat/rooms/"+roomId, message);
    }
    
    
    //메세지 db에 저장
    @PostMapping("/chat/insert")
    public int messageInsert(@RequestBody Message messagePayload) {
    	return chatServerService.messageInsert(messagePayload);
    }
    
    // 채팅시간관련
    @PostMapping("/chat/chatTimeList")
    public List chatTimeList (@RequestBody Map<String, Integer> request) {
    	int roomId = request.get("roomId"); //객체로 보낸거 키(String = groupNo) , 값(Integer) 가지고옴 
    	int memberNo = request.get("memberNo");
    	return chatServerService.chatTimeList(roomId,memberNo);
    }
    
    //접속 시간 저장
    @PostMapping("/chat/insertAccessTime")
    public int chatAccessTimeInsert(@RequestBody LastAccessChatTime lastAccessChatTime) {
    	return chatServerService.chatAccessTimeInsert(lastAccessChatTime);
    }
    //접속 시간 업데이트
    @PostMapping("/chat/updateAccessTime")
    public int updateAccessTime(@RequestBody LastAccessChatTime lastAccessChatTime) {
    	return chatServerService.updateAccessTime(lastAccessChatTime);
    }

    
    //지난 대화 불러오기
    @PostMapping("/chat/chatMessage")
    public List chatPreviousMessage (@RequestBody Map<String,Object> request) {
    	int roomId = (Integer)request.get("roomId"); //객체로 보낸거 키(String = groupNo) , 값(Integer) 가지고옴 
    	String beforeTime = (String)request.get("beforeTime");
    	return chatServerService.chatPreviousMessage(roomId,beforeTime);
    }
    
    //채팅룸에 new 알림기능
    @PostMapping("/chat/mychatTime")
    public String myChatTime (@RequestBody Map<String, Integer> request) {
    	int roomId = request.get("roomId"); //객체로 보낸거 키(String = groupNo) , 값(Integer) 가지고옴 
    	int memberNo = request.get("memberNo");
    	return chatServerService.myChatTime(roomId,memberNo);
    }
    @PostMapping("/chat/totalChatTime")
    public String totalChatTime (@RequestBody Map<String, Integer> request) {
    	int roomId = request.get("roomId"); //객체로 보낸거 키(String = groupNo) , 값(Integer) 가지고옴 
    	return chatServerService.totalChatTime(roomId);
    }
    
   //헤더에 new 알림 기능 
    //
    @PostMapping("/chat/myLatestChatTime")
    public String myLatestChatTime (@RequestBody Member m,@RequestAttribute String memberId) {
    	m.setMemberId(memberId);
    	int memberNo = m.getMemberNo();
    	return chatServerService.myLatestChatTime(memberNo);
    }
    
	//내가 참여하고있는 총 채팅방 
    @PostMapping(value="/chat/totalLatestChatTime")
	public String totalLatestChatTime(@RequestBody Member m,@RequestAttribute String memberId) {
		m.setMemberId(memberId);
    	int memberNo = m.getMemberNo();
		return chatServerService.totalLatestChatTime(memberNo);
	}
	
}