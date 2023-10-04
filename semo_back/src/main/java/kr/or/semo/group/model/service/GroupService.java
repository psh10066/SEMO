package kr.or.semo.group.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.semo.group.model.dao.GroupDao;
import kr.or.semo.group.model.vo.Group;

@Service
public class GroupService {
	@Autowired
	private GroupDao groupDao;
	
	//모임생성
	@Transactional
	public int insertGroup(Group g) {
		int result = groupDao.insertGroup(g);
		if(result>0) {
		}
		return 0;
	}

}
