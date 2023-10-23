package kr.or.semo.groupPhoto.model.service;

import java.lang.annotation.Target;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.PageInfo;
import kr.or.semo.Pagination;
import kr.or.semo.groupPhoto.model.dao.GroupPhotoDao;
import kr.or.semo.groupPhoto.model.vo.GroupPhoto;
import kr.or.semo.member.model.dao.MemberDao;
import kr.or.semo.member.model.vo.Member;

@Service
public class GroupPhotoService {
	@Autowired
	private GroupPhotoDao groupPhotoDao;
	@Autowired
	private Pagination pagination;
	@Autowired
	private MemberDao memberDao;
	
	public Map groupPhotoList(int groupNo, int reqPage) {
		int numPerPage = 8;	//한페이지당 게시물 수
		int pageNaviSize = 5; 	//페이지 네비게이션 길이
		int totalCount = groupPhotoDao.totalCount(groupNo); // 전체게시물 수
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List groupPhotoList = groupPhotoDao.selectgroupPhotoList(groupNo, pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("groupPhotoList", groupPhotoList);
		map.put("pi", pi);
		return map;
	}

	public GroupPhoto selectOneGroupPhoto(int grPhotoNo) {
		GroupPhoto gp = groupPhotoDao.selectOneGroupPhoto(grPhotoNo);
		return gp;
	}
	@Transactional
	public int insertGroupPhoto(GroupPhoto gp) {
		Member member = memberDao.selectOneMember(gp.getMemberId());
		gp.setMemberNo(member.getMemberNo());
		int result = groupPhotoDao.insertGroupPhoto(gp);
		return result;
	}
	@Transactional
	public int updateGroupPhoto(GroupPhoto gp) {
		int result = groupPhotoDao.updateGroupPhoto(gp);
		return result;
	}
	@Transactional
	public String delete(int grPhotoNo) {
		GroupPhoto gp = groupPhotoDao.selectOneGroupPhoto(grPhotoNo);
		String grPhotoImg = gp.getGrPhotoImg();
		int result = groupPhotoDao.deleteGroupPhoto(grPhotoNo);
		if(result > 0) {
			return grPhotoImg;
		}
		return null;
	}
}
