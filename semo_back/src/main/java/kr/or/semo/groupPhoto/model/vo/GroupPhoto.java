package kr.or.semo.groupPhoto.model.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="groupPhoto")
public class GroupPhoto {
	private int grPhotoNo;
	private String grPhotoTitle;
	private String grPhotoContent;
	private String grPhotoImg;
	private String memberId;//화면 처리를 위한 게시글 작성자
	private int memberNo;
	private int groupNo;//모임번호
}
