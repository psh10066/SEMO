package kr.or.semo.groupBoard.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.PageInfo;
import kr.or.semo.Pagination;
import kr.or.semo.groupBoard.model.dao.GroupBoardDao;
import kr.or.semo.groupBoard.model.vo.GroupBoard;
import kr.or.semo.groupBoard.model.vo.GroupBoardComment;
import kr.or.semo.groupBoard.model.vo.GroupBoardCommentLike;
import kr.or.semo.member.model.dao.MemberDao;
import kr.or.semo.member.model.vo.Member;
@Service
public class GroupBoardService {
	@Autowired
	private GroupBoardDao groupBoardDao;
	@Autowired
	private Pagination pagination;
	@Autowired
	private MemberDao memberDao;
	
	public Map groupBoardList(int groupNo, int reqPage) {
		int numPerPage = 8;	//한페이지당 게시물 수
		int pageNaviSize = 5; 	//페이지 네비게이션 길이
		int totalCount = groupBoardDao.totalCount(groupNo); // 전체게시물 수
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List groupBoardList = groupBoardDao.selectgroupBoardList(groupNo, pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("groupBoardList", groupBoardList);
		map.put("pi", pi);
		return map;
	}
	@Transactional
	public int insertGroupBoard(GroupBoard gb) {
		Member member = memberDao.selectOneMember(gb.getMemberId());
		gb.setGrBoardWriter(member.getMemberNo());
		int result = groupBoardDao.insertGroupBoard(gb);
		return result;		
	}
	public GroupBoard selectOneGroupBoard(int grBoardNo) {
		GroupBoard gb = groupBoardDao.selectOneGroupBoard(grBoardNo);
		return gb;
	}
	@Transactional
	public int updateGroupBoard(GroupBoard gb) {
		Member member = memberDao.selectOneMember(gb.getMemberId());
		gb.setGrBoardWriter(member.getMemberNo());
		int result = groupBoardDao.updateGroupBoard(gb);
		return result;
	}
	public int deleteGroupBoard(int grBoardNo) {
		int result = groupBoardDao.deleteGroupBoard(grBoardNo);
		return result;
	}
	@Transactional
	public int insertComment(GroupBoardComment gbc, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		gbc.setGrBoardCommentWriter(member.getMemberNo());
		String grBoardCommentRef = gbc.getGrBoardCommentNo2()==0?null:String.valueOf(gbc.getGrBoardCommentNo2());
		gbc.setGrBoardCommentRef(grBoardCommentRef);
		return groupBoardDao.insertComment(gbc);
	}
	public List groupBoardCommentList(int grBoardNo) {
		return groupBoardDao.groupBoardCommentList(grBoardNo);
	}
	@Transactional
	public int deleteComment(int grBoardCommentNo) {
		return groupBoardDao.deleteComment(grBoardCommentNo);
	}
	@Transactional
	public int modifyComment(int grBoardCommentNo, String grBoardCommentContent) {
		GroupBoardComment gbc = new GroupBoardComment();
		gbc.setGrBoardCommentContent(grBoardCommentContent);
		gbc.setGrBoardCommentNo(grBoardCommentNo);
		return groupBoardDao.modifyComment(gbc);
	}
	public List groupBoardReCommentList(int grBoardNo) {
		return groupBoardDao.groupBoardReCommentList(grBoardNo);
	}
	@Transactional
	public int groupBoardCommentLike(int grBoardCommentNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		GroupBoardCommentLike groupBoardCommentLike = groupBoardDao.selectOneGroupBoardCommentLike(grBoardCommentNo, member.getMemberNo());
		if(groupBoardCommentLike != null) {
			groupBoardDao.deleteGroupBoardCommentLike(grBoardCommentNo, member.getMemberNo());
			return 0;
		}else { 
			groupBoardDao.insertGroupBoardCommentLike(grBoardCommentNo, member.getMemberNo());
			return 1;
		}
	}
	public int groupBoardCommentLikeCount(int grBoardCommentNo) {
		return groupBoardDao.groupBoardCommentLikeCount(grBoardCommentNo);
	}
	public int groupBoardCommentLikeState(int grBoardCommentNo, String memberId) {
		Member member = memberDao.selectOneMember(memberId);
		return groupBoardDao.groupBoardCommentLikeState(grBoardCommentNo, member.getMemberNo());
	}
}


