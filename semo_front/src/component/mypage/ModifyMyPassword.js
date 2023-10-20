import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModifyMyPassword = () => {
  const navigate = useNavigate();
  //1
  const token = window.localStorage.getItem("token");
  const [currPw, setCurrPw] = useState("");
  //2
  const [isPwauth, setIsPwauth] = useState(false); //비밀번호 인증을 했는지 안했는지

  //3
  const [memberPw, setMemberPw] = useState(""); //새 비밀번호
  const [memberPwRe, setMemberPwRe] = useState("");
  const [checkPwOmsg, setCheckPwOmsg] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState(""); //새비밀번호시, 일치하는지 안하는지 메세지

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
          setIsPwauth(true);
        } else {
          Swal.fire({
            title: "다시입력해주세요.",
          });
        }
      });
    console.log(currPw);
  };

  //새 비밀번호 체크 메세지
  const pwCheckMsg = () => {
    if (memberPw !== memberPwRe) {
      setCheckPwMsg("비밀번호가 일치하지 않습니다");
    } else {
      setCheckPwMsg("");
    }
  };

  // 비밀번호 정규표현식
  const pwOCheck = () => {
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{8,12}$/;
    if (!pwReg.test(memberPw)) {
      setCheckPwOmsg(
        "비밀번호는 영어 대소문자,숫자,특수문자 혼합사용가능 8~12글자입니다."
      );
    } else {
      setCheckPwOmsg("");
    }
  };

  const changePw = () => {
    if (checkPwMsg === "") {
      axios
        .post(
          "/member/updatePwMember",
          { memberPw: memberPw },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.data === 1) {
            Swal.fire({
              icon: "success",
              title: "비밀번호가 수정되었습니다.",
            });
            navigate("/mypage/myInfo");
          } else {
            Swal.fire("에러가 발생했습니다. 잠시후 다시 시도해주세요");
          }
        })
        .catch((res) => {
          if (res.response.status === 403) {
            navigate("/login");
          }
        });
    } else {
      Swal.fire("입력값을 확인하세요");
    }
  };

  return (
    <div className="my-content-wrap">
      <div className="my-content-title">비밀번호 변경</div>
      <div className="pw-auth">
        {isPwauth ? (
          <>
            <div className="new-pw-input-wrap">
              <div className="pw-input-wrap">
                <div>
                  <label htmlFor="memberPw">새 비밀번호</label>
                  <input
                    type="password"
                    value={memberPw}
                    content="memberPw"
                    checkMsg={checkPwOmsg}
                    onBlur={pwOCheck}
                    onChange={(e) => {
                      // onChange prop으로 변경하고 pwCheckMsg도 호출
                      setMemberPw(e.target.value);
                      setCheckPwOmsg();
                    }}
                  />
                  {/* 비밀번호 정규표현식 메세지*/}
                  <span>{checkPwOmsg}</span>
                </div>
                <div>
                  <label htmlFor="memberPw">새 비밀번호 확인</label>
                  <input
                    type="password"
                    value={memberPwRe}
                    content="memberPwRe"
                    checkMsg={checkPwMsg}
                    onBlur={pwCheckMsg}
                    onChange={(e) => {
                      // onChange prop으로 변경하고 pwCheckMsg도 호출
                      setMemberPwRe(e.target.value);
                      pwCheckMsg();
                    }}
                  />
                </div>
              </div>
              <div className="check-msg">{checkPwMsg}</div>
              <div className="change-btn-box">
                <button onClick={changePw}>변경하기</button>
              </div>
            </div>
          </>
        ) : (
          <div className="pw-input-wrap">
            <div>
              <label htmlFor="currPw">현재비밀번호</label>
              <input
                value={currPw}
                onChange={(e) => setCurrPw(e.target.value)}
                type="password"
                content="currPw"
              />
              <button onClick={pwCheck}>입력</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyMyPassword;
