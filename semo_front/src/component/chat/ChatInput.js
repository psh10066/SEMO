const ChatInput = (props) => {
  //함수 전달
  const { newMessage, setNewMessage, sendMessage } = props;

  // 엔터키가 눌렸을 때 sendMessage 호출
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      sendMessage();
    }
  };
  return (
    <div className="chat-input">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown} // 엔터키 감지 핸들러 추가
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;
