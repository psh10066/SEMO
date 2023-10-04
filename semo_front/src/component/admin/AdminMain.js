import { useState } from "react";
import "./admin.css";
import { Route, Routes, useNavigate } from "react-router";
import AdminMember from "./AdminMember";
import AdminReport from "./AdminReport";
import { Link } from "react-router-dom";

const AdminMain = () => {
  const [adminMember, setAdminMember] = useState([
    //회원번호, 회원아이디, 회원이름, 이메일, 연락처, 회원등급
    {
      memberNo: 1,
      memberId: "user01",
      memberName: "방수현",
      memberEmail: "bangsh@naver.com",
      memberPhone: "010-1111-1111",
      memberType: 1,
    },
    {
      memberNo: 2,
      memberId: "user02",
      memberName: "김유민",
      memberEmail: "ymkim@naver.com",
      memberPhone: "010-2222-2222",
      memberType: 2,
    },
    {
      memberNo: 3,
      memberId: "user03",
      memberName: "이아름",
      memberEmail: "lar@naver.com",
      memberPhone: "010-3333-3333",
      memberType: 2,
    },
    {
      memberNo: 4,
      memberId: "user04",
      memberName: "한정아",
      memberEmail: "jeongahHan@naver.com",
      memberPhone: "010-4444-4444",
      memberType: 2,
    },
  ]);
  return (
    <div className="wrap">
      <h1>SEMOMO 관리자 마이페이지</h1>
      <hr></hr>
      <div>여기는 AdminMain입니다.</div>
      <hr></hr>
      <div className="links">
        <Link to="list">회원 목록 조회</Link>
        <Link to="report">신고 내역 조회</Link>
      </div>
      <hr></hr>
      <Routes>
        <Route
          path="/list"
          element={<AdminMember adminMember={adminMember} />}
        />
        <Route path="/report" element={<AdminReport />} />
      </Routes>
    </div>
  );
};

export default AdminMain;
