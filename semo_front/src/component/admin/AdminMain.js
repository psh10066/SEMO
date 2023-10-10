import { useEffect, useState } from "react";
import "./admin.css";
import { Route, Routes } from "react-router";
import AdminMember from "./AdminMember";
import AdminReport from "./AdminReport";
import { Link, useNavigate } from "react-router-dom";
import { MySideMenu } from "../mypage/Mypage";
import axios from "axios";
import Swal from "sweetalert2";

const AdminMain = (props) => {
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});
  const [menus, setMenus] = useState([
    { url: "list", text: "회원 목록 조회", active: false },
    { url: "report", text: "신고 내역 조회", active: false },
  ]);

  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMember(res.data);
        document.querySelectorAll(".mysidemenu a")[0].click();
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
  }, []);

  if (!isLogin) {
    Swal.fire({
      title: "로그인이 필요한 서비스 입니다.",
      text: "로그인 페이지로 이동합니다.",
      icon: "info",
    }).then(() => {
      navigate("/login");
    });
  }
  const myfeed = () => {
    navigate("/feed");
  };

  return (
    <div className="mypage-all-wrap">
      <div className="mypage-title">
        <h2>Admin Page</h2>
      </div>
      <div className="mypage-intro">
        <div className="mypage-name">
          <div className="material-icons">face</div>
          <div>
            <span>{member.memberName}</span>
          </div>
        </div>
        <div className="mypage-buttons">
          <div className="mypage-myfeed a" onClick={myfeed}>
            <div className="material-icons">interests</div>
            <div className="texta">내 피드</div>
          </div>
          <div className="mypage-myfeed b">
            <div className="material-icons">chat_bubble</div>
            <div className="textb">내 채팅</div>
          </div>
        </div>
      </div>
      <div className="mypage-content">
        <MySideMenu menus={menus} setMenus={setMenus} />
        <div className="current-content">
          <Routes>
            <Route path="list" element={<AdminMember />} />
            <Route path="report" element={<AdminReport />} />
          </Routes>
          {/*
        <div className="links">
          <Link to="list">회원 목록 조회</Link>
          <Link to="report">신고 내역 조회</Link>
        </div>
        */}
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
