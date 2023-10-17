import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { format } from "date-fns";
import axios from "axios";
import ChatToggle from "./ChatToggle";
import ChatPrevious from "./ChatPrevious";

const ChatRoom = (props) => {
  const { roomId, senderName, memberNo, groupName } = props;
  const groupAllMemberName = props.groupAllMemberName;
  const groupAllMemberType = props.groupAllMemberType;
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const clientRef = useRef(null);

  //메세지 받기
  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:9999/ws",

      onConnect: () => {
        console.log("WebSocket connected");
        client.subscribe(`/chat/rooms/${roomId}`, (message) => {
          const receivedMsg = JSON.parse(message.body); // JSON 형식의 문자열을 JavaScript 객체로 변환
          console.log("Received message:", receivedMsg);
          onMessageReceive(receivedMsg, `/chat/rooms/${roomId}`);
        });
      },
      onDisconnect: () => {
        console.log("WebSocket disconnected");
      },
    });

    client.onStompError = (frame) => {
      console.error("STOMP error", frame);
    };

    //roomId 가 바뀌면  current clinet active  / 이전 client 웹소켓 종료
    client.activate();
    clientRef.current = client;
    return () => {
      sendLastAccessTime(); // 웹소켓 종료 전 마지막 접속 시간 전송
      client.deactivate();
    };
  }, [roomId]);

  //마지막 접속 시간 전송 함수
  const sendLastAccessTime = () => {
    const now = new Date();
    const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
    const token = window.localStorage.getItem("token");
    const lastAccessTime = {
      roomId: roomId,
      memberNo: memberNo,
      chatMyLastTime: formattedDate,
    };
    axios
      .post("/chat/insertAccessTime", lastAccessTime, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(roomId + "번 마지막 접속시간 저장 성공");
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  //
  //
  //화면에 메세지 띄우기
  const onMessageReceive = (msg, index) => {
    setMessages((prevMessages) => {
      const currentRoomMessages = prevMessages[roomId] || [];
      return {
        ...prevMessages,
        [roomId]: [...currentRoomMessages, msg],
      };
    });
  };

  //메세지 전송
  const sendMessage = () => {
    if (clientRef.current && newMessage) {
      const now = new Date();
      const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
      const token = window.localStorage.getItem("token");

      const messagePayload = {
        message: newMessage,
        senderName: senderName,
        roomId: roomId,
        memberNo: memberNo,
        chatTime: formattedDate,
      };
      clientRef.current.publish({
        destination: "/app/chat/" + roomId,
        body: JSON.stringify(messagePayload), //메세지 객체를 json 문자열로 바꿔줌
      });
      setNewMessage(""); // 메세지 보내고 입력창은 비워줌
      //
      //메세지는 전송되고 , 메세지 받기 전에  db에 채팅메세지 저장
      axios
        .post("/chat/insert", messagePayload, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log("메세지 저장 성공");
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  };

  //지난대화불러오기
  const chatPreviousWrapRef = useRef(null);
  const chatSpanRef = useRef(null);
  const [showPreviousChat, setShowPreviousChat] = useState(false); //이전대화 보여주기

  const previousChatClick = () => {
    if (chatPreviousWrapRef.current) {
      chatPreviousWrapRef.current.style.display = "block";
    }
    if (chatSpanRef.current) {
      chatSpanRef.current.style.display = "none";
    }
    setShowPreviousChat(true); // showPreviousChat 상태를 true로 변경
  };
  // roomId가 변경될 때마다 showPreviousChat를 초기화
  useEffect(() => {
    setShowPreviousChat(false);
    // 이전 채팅 내역을 담고 있는 컨테이너를 다시 숨기기
    if (chatPreviousWrapRef.current) {
      chatPreviousWrapRef.current.style.display = "none";
    }
    // "지난 대화 불러오기" 버튼을 다시 보여주기.
    if (chatSpanRef.current) {
      chatSpanRef.current.style.display = "flex";
    }
  }, [roomId]);

  return (
    <>
      <div className="chat-header">
        <h2>{groupName}</h2>
        <ChatToggle
          groupAllMemberName={groupAllMemberName}
          groupAllMemberType={groupAllMemberType}
        />
      </div>
      {/* 메세지 출력 */}
      <div className="chat-content">
        <span
          className="previous-chat-btn"
          onClick={previousChatClick}
          ref={chatSpanRef}
        >
          지난대화불러오기
        </span>
        {/* showPreviousChat 값이 true일 때만 ChatPrevious 컴포넌트 렌더링 */}
        {showPreviousChat && (
          <div className="chatPrevious-wrap" ref={chatPreviousWrapRef}>
            <ChatPrevious roomId={roomId} />
          </div>
        )}

        {messages[roomId]?.map((msg, idx) => (
          <div key={idx}>
            {msg.senderName}: {msg.message}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
};

export default ChatRoom;
