package kr.or.semo.group.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="chatRoom")
public class ChatRoom {
	private int chatRoomNo;
	private int groupNo;
}
