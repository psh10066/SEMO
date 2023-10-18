import { Avatar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const GroupMember = (props) => {
  const memberList = props.memberList;
  const setMemberList = props.setMemberList;
  const grJoinList = props.grJoinList;
  const setGrJoinList = props.setGrJoinList;
  const groupNo = props.groupNo;

  return (
    <div className="my-content-wrap">
      {/*<div className="admin-content-title">전체 회원 조회</div>*/}
      <div className="admin-member-tbl-box">
        <table>
          <thead>
            <tr>
              {/* 회원이미지*/}
              <th width={"10%"}></th>
              <th width={"15%"}>회원이름</th>
              <th width={"40%"}>회원소개</th>
              <th width={"20%"}>회원 서식지</th>
              <th width={"15%"}>회원등급</th>
            </tr>
          </thead>
          {memberList != null ? (
            <tbody>
              {memberList.map((member, index) => {
                return <MemberItem key={"member" + index} member={member} />;
              })}
            </tbody>
          ) : (
            ""
          )}
        </table>
      </div>
      {/* <div className="admin-paging-wrap">
        <Pagination
          // reqPage={reqPage}
          // setReqPage={setReqPage}
          // pageInfo={pageInfo}
          setList={setMemberList}
        />
      </div> */}
    </div>
  );
};
const MemberItem = (props) => {
  const member = props.member;
  const [memberType, setMemberType] = useState(member.memberType);
  const handleChange = (event) => {
    const obj = { memberNo: member.memberNo, memberType: event.target.value };
    const token = window.localStorage.getItem("token");
    axios
      .post("/group/update", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          setMemberType(event.target.value);
          Swal.fire("회원 등급 변경 완료!");
        } else {
          Swal.fire(
            "회원 등급 변경 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <tr>
      <td>
        {member.memberImg === null ? (
          <Avatar src="/image/default.png" sx={{ width: 50, height: 50 }} />
        ) : (
          <Avatar src={member.memberImg} sx={{ width: 50, height: 50 }} />
        )}
      </td>
      <td>{member.memberName}</td>
      <td>
        <p id="group-member-content">{member.memberContent}</p>
      </td>
      <td>{member.memberLocal}</td>
      {/* {등급은 수정해야함} */}
      <td>{member.memberType}</td>
    </tr>
  );
};

export default GroupMember;
