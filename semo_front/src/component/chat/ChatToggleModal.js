import Modal from "react-modal";
Modal.setAppElement("#root");

const ChatToggleModal = (props) => {
  const groupAllMemberName = props.groupAllMemberName;
  const groupAllMemberType = props.groupAllMemberType;

  return (
    <div>
      <Modal
        isOpen={props.modalState}
        onRequestClose={() => props.setModalState(false)} // 모달의 오버레이나 Esc 키를 클릭하면 이 함수가 호출
        shouldCloseOnOverlayClick={true}
        style={{
          content: { width: "200px", height: "200px", margin: "25vh auto" },
          overlay: { zIndex: 1000 }, // zIndex를 추가하여 오버레이가 확실히 상단에 위치하도록 하기
        }}
      >
        <div className="chat-modal-wrap">
          <div className="chat-modal-close">
            <span
              className="material-icons"
              onClick={() => props.setModalState(false)}
            >
              close
            </span>
          </div>
          <div className="chat-modal-member">
            <h3>우리 모임 멤버</h3>
            <div className="chat-modal-member-detail">
              <div>
                {groupAllMemberName.map((name, index) => (
                  <div key={index}>{name}</div>
                ))}
              </div>
              <div>
                {groupAllMemberType.map((type, index) => (
                  <div key={index}>
                    {type === 1 ? "모임장" : type === 2 ? "회원" : type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChatToggleModal;
