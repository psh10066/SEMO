package kr.or.semo.chatserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import kr.or.semo.chatserver.model.vo.Message;

import java.time.LocalDateTime;

@Controller
public class ChatServerController {
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    
    @MessageMapping("/chat/{roomId}")
    public void receiveGroupMessage(@Payload Message message,@DestinationVariable String roomId) {
        message.setSentAt(LocalDateTime.now()); // 메시지 발송 시간 설정
        simpMessagingTemplate.convertAndSend("/chat/rooms/"+roomId, message);
    }
}