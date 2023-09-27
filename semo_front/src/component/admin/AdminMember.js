import { Route, Routes, useNavigate } from "react-router";
import "./admin.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { MenuItem, Select } from "@mui/material";

const AdminMember = (props) => {
  const adminMember = props.adminMember;
  //const navigation = useNavigate();
  //const [memberList, setMemberList] = useState([]);
  return (
    <div className="my-content-wrap">
      <div className="my-content-title">전체 회원 조회(AdminMember)</div>
      <table>
        <thead>
          <tr>
            <td width={"10%"}>회원번호</td>
            <td width={"15%"}>회원아이디</td>
            <td width={"15%"}>회원이름</td>
            <td width={"25%"}>이메일</td>
            <td width={"20%"}>연락처</td>
            <td width={"15%"}>회원등급</td>
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
                {/*<td>{member.memberType}</td>*/}
                <td>
                  <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <Select value={member.memberType}>
                      <MenuItem value={1}>관리자</MenuItem>
                      <MenuItem value={2}>일반회원</MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMember;
