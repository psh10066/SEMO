import { Route, Routes, useNavigate } from "react-router-dom";
import "./mypage.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "../util/InputFrm";
import ModifyMyDetail from "./ModifyMyDetail";

const ModifyMyInfo = (props) => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  const member = props.member;
  const setMember = props.setMember;
  const setIsLogin = props.setIsLogin;

  //1
  const [currPw, setCurrPw] = useState("");
  //2
  const [isPwauth, setIsPwauth] = useState(false); //비밀번호 인증을 했는지 안했는지

  //현재비밀번호확인
  const pwCheck = () => {
    axios
      .post(
        "/member/pwCheck",
        { memberPw: currPw },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.data === 1) {
          //1이라는 response 가 오면 set
          setIsPwauth(true);
          navigate("/mypage/modifymyinfo/modyfyMyDetail");
        } else {
          Swal.fire({
            title: "다시입력해주세요.",
          });
        }
      });
  };

  return (
    <>
      <div>{isPwauth ? <h3>내 정보수정</h3> : <h3>비밀번호 확인</h3>}</div>
      <div className="pw-auth">
        {isPwauth ? (
          <div>
            <Routes>
              <Route
                path="modyfyMyDetail"
                element={
                  <ModifyMyDetail
                    member={member}
                    setMember={setMember}
                    setIsLogin={setIsLogin}
                  />
                }
              />
            </Routes>
          </div>
        ) : (
          <>
            <div className="pw-currPw">
              <div>
                <label htmlFor="currPw">현재비밀번호</label>
              </div>
              <div>
                <Input
                  data={currPw}
                  setData={setCurrPw}
                  type="password"
                  content="currPw"
                />
              </div>
              <div>
                <button onClick={pwCheck}>입력</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ModifyMyInfo;
