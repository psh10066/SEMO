import { useState } from "react";
import "./admin.css";
import { Route, Routes, useNavigate } from "react-router";
import AdminMember from "./AdminMember";
import AdminReport from "./AdminReport";
import { Link } from "react-router-dom";

const AdminMain = () => {
  return (
    <div>
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
        <Route path="/list" element={<AdminMember />} />
        <Route path="/report" element={<AdminReport />} />
      </Routes>
    </div>
  );
};

export default AdminMain;
