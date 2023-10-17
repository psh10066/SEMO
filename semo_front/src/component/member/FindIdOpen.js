import "./member.css";
import React, { useState } from "react";
import FindId from "./FindId";

const FindIdOpen = (props) => {
  const [modalState, setModalState] = useState(false); //모달창의 상태를 보관해 둘 useState입니다.
  const [isMail, setIsMail] = useState(false);
  const [currMail, setCurrMail] = useState("");
  function OnOffModal() {
    if (modalState === false) {
      setIsMail(false);
      setCurrMail("");
    }
    setModalState(!modalState);
  }

  return (
    <div className="findIdBox">
      <span className="findIdTitle" onClick={OnOffModal}>
        아이디 찾기
      </span>
      <FindId
        modalState={modalState}
        setModalState={setModalState}
        isMail={isMail}
        setIsMail={setIsMail}
        currMail={currMail}
        setCurrMail={setCurrMail}
      />
    </div>
  );
};
export default FindIdOpen;
