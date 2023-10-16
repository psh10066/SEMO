const ChatToggle = ({
  groupAllMemberName,
  groupAllMemberType,
  isMemberVisible,
  toggleChatMember,
}) => {
  return (
    <>
      <span className="material-icons chat-Member" onClick={toggleChatMember}>
        groups
      </span>
      {isMemberVisible && (
        <div
          className={`toggle-chatMember-box ${isMemberVisible ? "show" : ""}`}
        >
          {groupAllMemberName.map((name, index) => (
            <div key={index}>{name}</div>
          ))}
          {groupAllMemberType.map((type, index) => (
            <div key={index}>{type}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default ChatToggle;
