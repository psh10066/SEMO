import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../util/InputFrm";
import { Button1, Button2 } from "../util/Buttons";
import "./member.css";
import Swal from "sweetalert2";
import axios from "axios";
import ReactModal from "react-modal";

const Login = (props) => {
  const setIsLogin = props.setIsLogin;
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const navigate = useNavigate();
  const join = () => {
    navigate("/join");
  };
  const login = () => {
    const member = { memberId, memberPw };
    axios
      .post("/member/login", member)
      .then((res) => {
        if (res.data === "실패") {
          console.log(res);
          Swal.fire("아이디 또는 비밀번호를 확인하세요");
        } else {
          window.localStorage.setItem("token", res.data);
          setIsLogin(true);
          navigate("/");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <div className="login-wrap">
      <div className="login-title">LOGIN</div>
      <div className="login-input-wrap">
        <Input
          type="text"
          data={memberId}
          setData={setMemberId}
          content="memberId"
          placeholder="아이디"
        />
      </div>
      <div className="login-input-wrap">
        <Input
          type="text"
          data={memberPw}
          setData={setMemberPw}
          placeholder="비밀번호"
        />
      </div>
      <div className="login-icon-box">
        <Link to="#">
          <img src="/image/ico-kakao.png" />
        </Link>
        <Link to="#">
          <img src="/image/ico-naver.png" />
        </Link>
      </div>
      <div className="find-box">
        <Link to="#">아이디 찾기</Link>
        <span className="material-icons">horizontal_rule</span>
        <Link to="#">비밀번호 찾기</Link>
        <span className="material-icons">horizontal_rule</span>
        <Link to="/join">회원가입</Link>
      </div>
      <div className="login-btn-box">
        <Button1 text="로그인" clickEvent={login} />
      </div>
    </div>
  );
};
export default Login;
