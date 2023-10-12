import "./chat.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ChatMyName from "./ChatMyName";

const Chat = (props) => {
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const token = window.localStorage.getItem("token");

  //메인에서 '채팅'클릭했는데 로그인 안되있으면
  if (!isLogin) {
    Swal.fire({
      title: "로그인이 필요한 서비스 입니다.",
      text: "로그인 페이지로 이동합니다.",
      icon: "info",
    }).then(() => {
      navigate("/login");
    });
  }

  //채팅방 이름 불러오기 == 모임 이름
  const [roomName, setRoomName] = useState([]);
  useEffect(() => {
    axios
      .post(
        "/group/groupChatRoomName",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setRoomName(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  return (
    <div className="chat-wrap">
      <div className="chat-wrap2">
        <div className="chat-list">
          <ChatMyName /> {/* 유저 이름 */}
          {/* 채팅방 이름 불러오기 */}
          {roomName.map((name, index) => (
            <div key={index}>{name}</div>
          ))}
        </div>
        <div className="chat-room"></div>
      </div>
    </div>
  );
};

export default Chat;
