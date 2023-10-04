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
@Service
public class GroupBoardService {
	@Autowired
	private GroupBoardDao groupBoardDao;
	@Autowired
	private Pagination pagination;
//	@Autowired
//	private MemberDao memberDao;
	
	public Map groupBoardList(int reqPage) {

		//게시물 조회, 페이징에 필요한 데이터를 취합
		int numPerPage = 12;	//한페이지당 게시물 수
		int pageNaviSize = 5; 	//페이지 네비게이션 길이
		int totalCount = groupBoardDao.totalCount(); // 전체게시물 수
		//페이징조회 및 페이지네비 제작에 필요한 데이터를 객체로 받아옴
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List groupBoardList = groupBoardDao.selectgroupBoardList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("groupBoardList", groupBoardList);
		map.put("pi", pi);
		return map;
	}
	@Transactional
	public int insertGroupBoard(GroupBoard gb) {
		//작성자 정보를 현재 아이디만 알고 있음 -> Board테이블에는 회원번호가 외래키로 설정되어있음
		//아이디를 이용해서 번호를 구해옴(회원정보를 조회해서 회원정보 중 번호를  사용)
//		Member member = memberDao.selectOneMember(gb.getMemberId());
//		gb.setGrBoardWriter(member.getMemberNo());
		gb.setGrBoardWriter(1); // 임시
		int result = groupBoardDao.insertGroupBoard(gb);
		return result;		
	}
	public GroupBoard selectOneGroupBoard(int grBoardNo) {
		GroupBoard gb = groupBoardDao.selectOneGroupBoard(grBoardNo);
		return gb;
	}
	
}

