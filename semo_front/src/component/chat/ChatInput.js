const ChatInput = (props) => {
  //함수 전달
  const { newMessage, setNewMessage, sendMessage } = props;

  // 엔터키가 눌렸을 때 sendMessage 호출
  const onKeyDownHandler = (e) => {
    
    // 조합 중이면 동작을 막기.
    if (e.nativeEvent.isComposing) {
      return;
    }
  
    // [Enter] 치면 메시지 보내기
    if (e.key === 'Enter') {
      e.preventDefault();  // 엔터 두번 눌리는거 방지 
      sendMessage();
    }
  };
  return (
    <div className="chat-input">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={onKeyDownHandler} // 엔터키 감지 핸들러 추가
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;
