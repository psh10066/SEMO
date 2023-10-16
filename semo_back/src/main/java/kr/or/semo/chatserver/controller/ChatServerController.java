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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.chatserver.model.vo.LastAccessChatTime;
import kr.or.semo.chatserver.model.vo.Message;
import kr.or.semo.chatserver.service.ChatServerService;

import java.time.LocalDateTime;
import java.util.List;

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
    
    @PostMapping("/chat/insertAccessTime")
    public int chatAccessTimeInsert(@RequestBody LastAccessChatTime lastAccessChatTime) {
    	return chatServerService.chatAccessTimeInsert(lastAccessChatTime);
    }

    
    
   
    
}