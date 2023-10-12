import "./chat.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Chat = (props) => {
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");

  const [member, setMember] = useState({});

  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMember(res.data);
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

  return (
    <div className="chat-wrap">
      <div className="chat-wrap2">
        <div className="chat-list">
          <div className="chat-myname">
            <span className="chat-myname-text">{member.memberName}</span>
          </div>
        </div>
        <div className="chat-room"></div>
      </div>
    </div>
  );
};

export default Chat;
