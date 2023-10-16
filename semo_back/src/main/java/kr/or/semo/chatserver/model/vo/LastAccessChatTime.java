package kr.or.semo.chatserver.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class LastAccessChatTime {
	private int roomId; //그룹넘버
	private int memberNo; //보내는 사람 멤버 넘버
	private String chatMyLastTime; //마지막으로 접속한 시간

}
