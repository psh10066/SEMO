import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "../util/InputFrm";
import "./member.css";

const Join = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberMail, setMemberMail] = useState("");
  const [memberContent, setMemberConTent] = useState("");
  const [memberCategory1, setMemberCategory1] = useState("");
  const [memberCategory2, setMemberCategory2] = useState("");
  const [memberLocal, setMemberLocal] = useState("");
  const [checkIdMsg, setCheckIdMsg] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState("");
  const navigate = useNavigate();
  const idCheck = () => {
    const idReg = /^[a-zA-Z0-9]{1,100}&/;
    if (!idReg.test(memberId)) {
      setCheckIdMsg("아이디는 영어 대/소문자/숫자로 &&글자 입니다.");
    } else {
      axios
        .get("/member/checkId/" + memberId)
        .then((res) => {
          if (res.data === 0) {
            setCheckIdMsg("");
          } else {
            setCheckIdMsg("이미 사용중인 아이디입니다.");
          }
        })
        .catch((res) => {
          console.log(res);
        });
      setCheckIdMsg("사용가능한 아이디 입니다.");
    }
  };
  const pwCheck = () => {
    if (memberPw !== memberPwRe) {
      setCheckPwMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setCheckPwMsg("");
    }
  };
  const join = () => {
    if (checkIdMsg === "" && checkPwMsg === "") {
      const member = {
        memberId,
        memberPw,
        memberName,
        memberPhone,
        memberMail,
        memberContent,
        memberCategory1,
        memberCategory2,
        memberLocal,
      };
      axios
        .post("/member/join", member)
        .then((res) => {
          if (res.data === 1) {
            navigate("/login");
          } else {
            console.log("에러");
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    } else {
      Swal.fire({
        icon: "info",
        text: "입력값을 확인하세요!",
      });
    }
  };
  return (
    <div className="join-wrap">
      <div className="join-title">회원가입</div>
      <JoinInputWrap
        data={memberId}
        setData={setMemberId}
        type="text"
        content="memberId"
        placeholder="아이디"
        checkMsg={checkIdMsg}
        blurEvent={idCheck}
      />
      <JoinInputWrap
        data={memberPw}
        setData={setMemberPw}
        type="password"
        content="memberPw"
        placeholder="비밀번호"
      />
      <JoinInputWrap
        data={memberPwRe}
        setData={setMemberPwRe}
        type="password"
        content="memberPwRe"
        placeholder="비밀번호 확인"
        checkMsg={checkPwMsg}
        blurEvent={pwCheck}
      />
      <JoinInputWrap
        data={memberName}
        setData={setMemberName}
        type="text"
        content="memberName"
        placeholder="이름"
      />
      <JoinInputWrap
        data={memberPhone}
        setData={setMemberPhone}
        type="text"
        content="memberPhone"
        placeholder="010-1234-1234"
      />
      <JoinInputWrap
        data={memberMail}
        setData={setMemberMail}
        type="text"
        content="memberPhone"
        placeholder="abc@naver.com"
      />
    </div>
  );
};
const JoinInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const blurEvent = props.blurEvent;
  const checkMsg = props.checkMsg;
  const placeholder = props.placeholder;
  return (
    <div className="join-input-wrap">
      <div>
        <div className="input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className="check-msg">{checkMsg}</div>
    </div>
  );
};
export default Join;
