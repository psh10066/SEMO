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

  //비밀변호 변경하기

  const modifyMyPassword = () => {
    if (member.memberId.includes("@")) {
      Swal.fire({
        icon: "warning",
        title: "카카오 회원은 비밀번호 수정이 불가능합니다.",
      });
      return;
    } else {
      navigate("/mypage/modifyMyPassword");
    }
  };

  // 상태 업데이트
  function handleInputChange1(event) {
    const newValue = event.target.value;
    setMemberName(newValue);
  }
  function handleInputChange2(event) {
    const newValue = event.target.value;
    setMemberPhone(newValue);
  }
  function handleInputChange3(event) {
    const newValue = event.target.value;
    setMemberMail(newValue);
  }

  //상태 수정
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

  //저장버튼
  const updateMember = () => {
    const token = window.localStorage.getItem("token");

    //알림 뜨게하기
    if (!member.memberName || member.memberName.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "이름을 입력해주세요.",
      });
      return;
    }

    if (!member.memberPhone || member.memberPhone.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "전화번호를 입력해주세요.",
      });
      return;
    }

    if (!member.memberMail || member.memberMail.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "이메일을 입력해주세요.",
      });
      return;
    }

    {
      member.memberName != null &&
        member.memberPhone != null &&
        member.memberMail != null &&
        axios
          .post("/member/updateMyInfo", member, {
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
              Swal.fire({
                title: "로그인이 필요한 서비스 입니다.",
                text: "로그인 페이지로 이동합니다.",
                icon: "info",
              }).then(() => {
                navigate("/login");
              });
            }
          });
    }
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
              <button onClick={modifyMyPassword}>변경하기</button>
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <input
                type="text"
                content="memberName"
                value={member.memberName}
                className="input-style"
                onChange={handleInputChange1}
              />
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <input
                type="text"
                content="memberPhone"
                value={member.memberPhone}
                className="input-style"
                onChange={handleInputChange2}
              />
            </td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>
              <input
                type="text"
                id="memberMail"
                value={member.memberMail}
                className="input-style"
                onChange={handleInputChange3}
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
