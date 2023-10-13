package kr.or.semo.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.semo.member.model.vo.Member;

@Mapper
public interface MemberDao {

	Member selectOneMember(String memberId);

	int insertMember(Member member);

	Member selectMember(int memberNo);

	int updateMemberName(Member member);

	int updateMemberMail(Member member);

	int updateMemberPhone(Member member);

	Member selectByOauthLogin(Member accessMember);



}
