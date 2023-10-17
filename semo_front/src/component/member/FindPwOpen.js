import "./member.css";
import React, { useState } from "react";
import FindPw from "./FindPw";

const FindPwOpen = (props) => {
  const [modalState, setModalState] = useState(false); //모달창의 상태를 보관해 둘 useState입니다.
  const [isMail, setIsMail] = useState(false);
  const [isId, setIsId] = useState(false);
  const [currMail, setCurrMail] = useState("");
  const [currId, setCurrId] = useState("");
  function OnOffModal() {
    if (modalState === false) {
      setIsMail(false);
      setCurrMail("");
      setCurrId("");
      setIsId(false);
    }
    setModalState(!modalState);
  }

  return (
    <div className="findIdBox">
      <span className="findIdTitle" onClick={OnOffModal}>
        비밀번호 찾기
      </span>
      <FindPw
        modalState={modalState}
        setModalState={setModalState}
        isMail={isMail}
        setIsMail={setIsMail}
        currMail={currMail}
        setCurrMail={setCurrMail}
        currId={currId}
        setCurrId={setCurrId}
        isId={isId}
        setIsId={setIsId}
      />
    </div>
  );
};
export default FindPwOpen;
