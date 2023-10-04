package kr.or.semo.admin.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.PageInfo;
import kr.or.semo.admin.model.vo.Admin;

@Mapper
public interface AdminDao {

	int totalCount();

	List memberList(PageInfo pi);

	int changeType(Admin admin);

}
