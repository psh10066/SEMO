import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import * as React from "react";

const ModifyMyInfo = (props) => {
  const navigate = useNavigate();
  const member = props.member;
  const setMember = props.setMember;

  const token = window.localStorage.getItem("token");
  const setIsLogin = props.setIsLogin;

  const setMemberName = (data) => {
    member.memberName = data;
    setMember({ ...member });
  };

  const setMemberPhone = (data) => {
    member.memberPhone = data;
    setMember({ ...member });
  };

  const setMemberMail = (data) => {
    member.memberMail = data;
    setMember({ ...member });
  };

  const updateMember = () => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/member/update", member, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "회원정보가 수정되었습니다.",
        });
      })
      .catch((res) => {
        if (res.response.status === 403) {
          navigate("/login");
        }
      });
  };

  return (
    <div className="modifyMyInfo-wrap">
      <div className="modifyMyInfo-title">내 정보 수정</div>
      <table className="my-info-tbl">
        <tbody>
          <tr>
            <td>아이디</td>
            <td>
              <input type="text" placeholder={member.memberId} readOnly />
            </td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <input type="password" placeholder="••••••••" readOnly />
              <button>변경하기</button>
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <input
                type="text"
                data={member.memberName}
                setData={setMemberName}
                content="memberName"
                value={member.memberName}
                className="input-style"
              />
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <input
                type="text"
                data={member.memberPhone}
                setData={setMemberPhone}
                content="memberPhone"
                value={member.memberPhone}
                className="input-style"
              />
            </td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>
              <input
                type="text"
                data={member.memberMail}
                setData={setMemberMail}
                id="memberMail"
                value={member.memberMail}
                className="input-style"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="modifyMyInfo-saveBtn">
        <button onClick={updateMember}>저장</button>
      </div>
    </div>
  );
};

export default ModifyMyInfo;
