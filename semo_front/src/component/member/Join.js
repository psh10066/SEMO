import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  return (
    <>
      <div>회원가입</div>
    </>
  );
};
export default Join;
