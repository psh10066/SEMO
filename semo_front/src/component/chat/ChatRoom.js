import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

const ChatRoom = (props) => {
  const roomId = props.roomId;
  const senderName = props.senderName;
  const setGroupAllMemberName = props.setGroupAllMemberName;
  const setGroupAllMemberNo = props.setGroupAllMemberNo;

  const [groupchats, setGroupchats] = useState(new Map());
  const [tab, setTab] = useState("채팅방");
  const [userData, setUserData] = useState({
    username: "",
    recievername: "",
    connected: false,
    message: "",
  });

  useEffect(() => {
    setUserData((prevData) => ({ ...prevData, username: senderName }));
  }, [senderName]);

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData((prevData) => ({ ...prevData, message: value }));
  };

  const registerUser = () => {
    const socket = new SockJS("http://localhost:9999/ws");
    stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
    });

    stompClient.onConnect = (frame) => {
      setUserData((prevData) => ({ ...prevData, connected: true }));
      stompClient.subscribe(`/chat/rooms/${roomId}`, onGroupMessageReceived);
      userJoin();
    };

    stompClient.onStompError = (frame) => {
      console.error(
        "Broker reported error: " + frame.headers["message"],
        "Additional details: " + frame.body
      );
    };

    stompClient.activate();
  };

  const onGroupMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
    setGroupchats((prevGroupChats) => {
      const updatedGroupChats = new Map(prevGroupChats);
      if (updatedGroupChats.get(payloadData.senderName)) {
        updatedGroupChats.get(payloadData.senderName).push(payloadData);
      } else {
        updatedGroupChats.set(payloadData.senderName, [payloadData]);
      }
      return updatedGroupChats;
    });
  };

  const onError = (error) => {
    console.log("Error:", error);
  };

  const userJoin = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        message: "",
        status: "JOIN",
      };
      stompClient.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify(chatMessage),
      });
    }
  };

  const sendGroupChatMessage = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        recievername: tab,
        message: userData.message,
        status: "MESSAGE",
      };
      stompClient.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify(chatMessage),
      });
      setUserData((prevData) => ({ ...prevData, message: "" }));
    }
  };

  return (
    <div className="chat-container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="chat-member-list">
            <ul>
              <li
                onClick={() => {
                  setTab("채팅방");
                }}
                className={`member ${tab === "채팅방" && "active"}`}
              >
                채팅방
              </li>
              {[...groupchats.keys()].map((name, index) => (
                <li
                  className={`member ${tab === name && "active"}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab !== "채팅방" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {[...groupchats.get(tab)].map((chat, index) => (
                  <li className="chat-message" key={index}>
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="chat-message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="메세지를 입력하세요"
                  name="message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendGroupChatMessage}
                >
                  전송
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="chatting-regist"></div>
      )}
    </div>
  );
};

export default ChatRoom;
