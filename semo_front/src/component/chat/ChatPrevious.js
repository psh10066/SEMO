import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChatPrevious = (props) => {
  const roomId = props.roomId; //채팅방 넘버 불러오기
  const navigate = useNavigate();

  //채팅 메세지 불러오기
  const [previousMessage, setPreviousMessage] = useState([]);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    axios
      .post(
        "/chat/chatMessage",
        { roomId: roomId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setPreviousMessage(res.data);
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
  }, [roomId]);

  console.log(previousMessage);

  return (
    <div>
      {previousMessage.map((msg, idx) => (
        <div key={idx}>
          <strong>{msg.senderName}</strong>: {msg.message}{" "}
          <span>({msg.chatTime})</span>
        </div>
      ))}
    </div>
  );
};

export default ChatPrevious;
