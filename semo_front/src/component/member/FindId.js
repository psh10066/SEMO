import Modal from "react-modal";
import "./member.css";
import { useState } from "react";
import { Button1 } from "../util/Buttons";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "../util/InputFrm";

Modal.setAppElement("#root");

const FindId = (props) => {
  const currMail = props.currMail;
  const setCurrMail = props.setCurrMail;
  const isMail = props.isMail;
  const setIsMail = props.setIsMail;

  const [memberId, setMemberId] = useState("");
  const mailCheck = () => {
    axios
      .post("/member/mailCheck", { memberMail: currMail })
      .then((res) => {
        if (res.data != null) {
          setIsMail(true);
          setMemberId(res.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "메일이 다릅니다!",
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <div className="findIdModal">
      <Modal
        isOpen={props.modalState}
        onRequestClose={() => props.setModalState(false)} // 모달의 오버레이나 Esc 키를 클릭하면 이 함수가 호출됩니다.
        shouldCloseOnOverlayClick={true}
        style={{
          content: { width: "40vw", height: "20vh", margin: "25vh auto" },
          overlay: { zIndex: 1000 }, // zIndex를 추가하여 오버레이가 확실히 상단에 위치하도록 합니다.
        }}
      >
        <div>
          <div className="idFind-title">아이디 찾기</div>
          <div className="mail-auth">
            {isMail ? (
              <div className="id-info">
                <span className="id-info-span">회원님의 아이디는 : </span>
                <span className="id-member-info">{memberId}</span>
                <span className="id-info-span">입니다.</span>
              </div>
            ) : (
              <div className="mail-input-wrap">
                <div>
                  <Input
                    id="memberIdBox"
                    data={currMail}
                    setData={setCurrMail}
                    type="text"
                    content="currMail"
                    placeholder="이메일을 입력해주세요"
                  />
                  <div className="find-mail-id">
                    <Button1 text="입력" clickEvent={mailCheck} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default FindId;
