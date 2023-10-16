package kr.or.semo.chatserver.model.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
	
	private String senderName;
	private String receiverName;
	private int roomId;
	private String message;
	private LocalDateTime sentAt; //날짜 시간
	
	private Status status;
}
