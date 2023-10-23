import { Avatar, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";

const GroupMember = (props) => {
  const memberList = props.memberList;
  const groupNo = props.groupNo;
  const [memberStateNum, setMemberStateNum] = useState(0);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (groupNo !== null) {
      axios
        .get("/group/selectMemberState/" + groupNo, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMemberStateNum(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  });

  return (
    <div className="my-content-wrap">
      <div className="group-member-setting">
        {memberStateNum === 0 ? (
          <div>모임에 가입된 회원이 없습니다.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th width={"10%"}></th>
                <th width={"20%"}>회원이름</th>
                <th width={"40%"}>회원소개</th>
                <th width={"30%"}>회원 서식지</th>
                <th width={"15%"}>가입현황</th>
              </tr>
            </thead>
            {memberList != null ? (
              <tbody>
                {memberList.map((member, index) => {
                  return (
                    <MemberItem
                      groupNo={groupNo}
                      key={"member" + index}
                      member={member}
                    />
                  );
                })}
              </tbody>
            ) : (
              ""
            )}
          </table>
        )}
      </div>
    </div>
  );
};
const MemberItem = (props) => {
  const member = props.member;
  const [grJoinType, setGrJoinType] = useState(member.grJoinType);
  //모임원 가입 승인
  const changeJoinType = (event) => {
    const token = window.localStorage.getItem("token");
    const obj = { memberNo: member.memberNo, grJoinType: event.target.value };
    const grJoinType = obj.grJoinType;
    if (grJoinType === 1) {
      Swal.fire({
        icon: "error",
        text: "모임장은 변경이 불가능합니다!",
      });
    } else {
      axios
        .post("/group/changeType", obj, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          Swal.fire("회원 등급 변경 완료!");
          setGrJoinType(event.target.value);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  };
  return (
    <>
      {member.grJoinType !== 1 ? (
        <tr>
          <td>
            {member.memberImg === null ? (
              <Avatar src="/image/default.png" sx={{ width: 50, height: 50 }} />
            ) : (
              <Avatar src={member.memberImg} sx={{ width: 50, height: 50 }} />
            )}
          </td>
          <td id="group-member-name">{member.memberName}</td>
          <td>
            <p id="group-member-content">{member.memberContent}</p>
          </td>
          <td>
            {member.memberLocal === 1
              ? "서울"
              : member.memberLocal === 2
              ? "경기"
              : "부산"}
          </td>
          {/* {등급은 수정해야함} */}
          <td>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <Select value={grJoinType} onChange={changeJoinType}>
                <MenuItem value={2}>일반회원</MenuItem>
                <MenuItem value={3}>가입대기</MenuItem>
              </Select>
            </FormControl>
          </td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
};

export default GroupMember;
