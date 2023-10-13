import { useParams } from "react-router-dom";
import useChat from "../../useChat";
import { useState } from "react";

const ChatRoom = (props) => {
  const { roomId } = useParams();
  console.log(roomId);
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleSendMessage = () => {
    setNewMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chatting-wrap">
      <h1>Room : {roomId} </h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item
            ${message.ownedByCurrentUser ? "my-message" : "received-message"}`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="메세지를 입력해주세요"
        className="new-message-input-field"
      ></textarea>
      <button onClick={handleSendMessage} className="send-message-btn" />
    </div>
  );
};

export default ChatRoom;
