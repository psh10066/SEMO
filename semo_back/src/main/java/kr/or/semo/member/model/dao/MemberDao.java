package kr.or.semo.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.member.model.vo.Member;

@Mapper
public interface MemberDao {

	Member selectOneMember(String memberId);

	int insertMember(Member member);

	Member selectMember(int memberNo);

	int updateMyInfo(Member member);

	int updatePwMember(Member member);

	int updateMyFeed(Member member);

	int updateMyLike(Member member);

	List memberList(String[] memberNo);





}
