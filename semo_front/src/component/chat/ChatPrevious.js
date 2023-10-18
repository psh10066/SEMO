import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChatPrevious = (props) => {
  const navigate = useNavigate();
  const roomId = props.roomId; //채팅방 넘버 불러오기
  const memberNo = props.memberNo; //로그인한 회원번호

  //채팅 메세지 불러오기
  const [previousMessage, setPreviousMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 변수 추가
  const token = window.localStorage.getItem("token");

  //렌더링될때 자동으로 스크롤이 아래에 위치하는 방법
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [previousMessage]);

  useEffect(() => {
    setIsLoading(true); // API 호출 전에 로딩 상태를 true로 설정

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
      })
      .finally(() => {
        setIsLoading(false); // API 호출이 끝나면 로딩 상태를 false로 설정
      });
  }, [roomId]);

  //초 빼고 출력
  const formatDate = (timeString) => {
    return timeString.substr(0, 16);
  };

  return (
    <div>
      <div>
        {isLoading ? (
          <div className="loadingMessage">메세지 로딩 중...</div>
        ) : previousMessage.length > 0 ? (
          previousMessage.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.memberNo === memberNo ? "message-left" : "message-right"
              }
            >
              <div className="chat-message-name">
                <strong>{msg.senderName}</strong>
              </div>
              <div className="chat-message-box">{msg.message}</div>
              <span className="chat-message-time">
                {formatDate(msg.chatTime)}
              </span>
            </div>
          ))
        ) : (
          <div className="noMessage">지난 대화가 없습니다</div>
        )}
      </div>

      <div ref={endOfMessagesRef}></div>
    </div>
  );
};
<div className="noMessage">지난 대화가 없습니다</div>;

export default ChatPrevious;
