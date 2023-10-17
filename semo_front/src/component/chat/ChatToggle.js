import { useState } from "react";
import ChatToggleModal from "./ChatToggleModal";

const ChatToggle = (props) => {
  const groupAllMemberName = props.groupAllMemberName;
  const groupAllMemberType = props.groupAllMemberType;

  const [modalState, setModalState] = useState(false); //모달창의 상태를 보관해 둘 useState입니다.

  function OnOffModal() {
    setModalState(!modalState);
  }

  return (
    <div>
      <span className="material-icons chat-Member" onClick={OnOffModal}>
        groups
      </span>
      <ChatToggleModal
        modalState={modalState}
        setModalState={setModalState}
        groupAllMemberName={groupAllMemberName}
        groupAllMemberType={groupAllMemberType}
      />
    </div>
  );
};

export default ChatToggle;
