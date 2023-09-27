import { Route, Routes, useNavigate } from "react-router";
import "./admin.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminMember = (props) => {
  const adminMember = props.adminMember;
  //const navigation = useNavigate();
  //const [memberList, setMemberList] = useState([]);
  return (
    <div className="my-content-wrap">
      <div className="my-content-title">회원목록</div>
      <table>
        <thead>
          <tr>
            <td>회원번호</td>
            <td>아이디</td>
            <td>이름</td>
            <td>전화번호</td>
            <td>회원등급</td>
          </tr>
        </thead>
        <tbody>
          {adminMember.map((member, index) => {
            return (
              <tr key={"m" + index}>
                <td>{member.memberNo}</td>
                <td>{member.memberId}</td>
                <td>{member.memberName}</td>
                <td>{member.memberEmail}</td>
                <td>{member.memberPhone}</td>
                <td>{member.memberType}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMember;
