import Modal from "react-modal";
import "./member.css";
import { useState } from "react";
import { Button1 } from "../util/Buttons";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "../util/InputFrm";

Modal.setAppElement("#root");

const FindPw = (props) => {
  const currMail = props.currMail;
  const setCurrMail = props.setCurrMail;
  const isMail = props.isMail;
  const setIsMail = props.setIsMail;
  const isId = props.isId;
  const setIsId = props.setIsId;
  const currId = props.currId;
  const setCurrId = props.setCurrId;
  const token = window.localStorage.getItem("token");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const pwCheck = () => {
    const member = { memberMail: currMail, memberId: currId };
    axios
      .post("/member/findPw", member)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire({
            icon: "success",
            title: "새 비밀번호를 입력해주세요!",
          });
          setIsMail(true);
          setIsId(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "아이디 또는 이메일이 다릅니다!",
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const findChangePw = () => {
    if (memberPw === memberPwRe) {
      const member = { memberId: currId, memberPw: memberPw };
      axios
        .post("/member/findChangePw", member, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data === 1) {
            setIsMail(false);
            setIsId(false);
            setMemberPw("");
            setMemberPwRe("");
            setCurrId("");
            setCurrMail("");
            props.setModalState(false);

            Swal.fire({
              icon: "success",
              title: "비밀번호가 변경되었습니다.",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "비밀번호가 일치하지 않습니다.",
            });
          }
        });
    }
  };
  return (
    <div className="findIdModal">
      <Modal
        isOpen={props.modalState}
        onRequestClose={() => props.setModalState(false)} // 모달의 오버레이나 Esc 키를 클릭하면 이 함수가 호출됩니다.
        shouldCloseOnOverlayClick={true}
        style={{
          content: { width: "40vw", height: "25vh", margin: "25vh auto" },
          overlay: { zIndex: 1000 }, // zIndex를 추가하여 오버레이가 확실히 상단에 위치하도록 합니다.
        }}
      >
        <div>
          <div className="idFind-title">비밀번호 찾기</div>
          <div className="mailId-auth">
            {isMail && isId ? (
              <div className="idMail-input-wrap">
                <div>
                  <Input
                    type="password"
                    data={memberPw}
                    setData={setMemberPw}
                    content="chkId"
                    placeholder="새 비밀번호"
                  />
                  <Input
                    type="password"
                    data={memberPwRe}
                    setData={setMemberPwRe}
                    content="chkId"
                    placeholder="새 비밀번호 확인"
                  />
                </div>
                <div className="chk-id-mail">
                  <Button1 text="변경하기" clickEvent={findChangePw} />
                </div>
              </div>
            ) : (
              <div className="idMail-input-wrap">
                <div>
                  <Input
                    id="memberIdBox"
                    data={currId}
                    setData={setCurrId}
                    type="text"
                    content="chkId"
                    placeholder="아이디를 입력해주세요"
                  />
                  <Input
                    id="memberIdBox"
                    data={currMail}
                    setData={setCurrMail}
                    type="text"
                    content="chkId"
                    placeholder="이메일을 입력해주세요"
                  />
                </div>
                <div className="chk-id-mail">
                  <Button1 text="입력" clickEvent={pwCheck} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default FindPw;
