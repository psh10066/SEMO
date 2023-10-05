import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "../util/InputFrm";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./member.css";
import { Button1 } from "../util/Buttons";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Join = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberContent, setMemberConTent] = useState("");
  const [memberMail, setMemberMail] = useState("");
  const [memberCategory1, setMemberCategory1] = useState(0);
  const [memberCategory2, setMemberCategory2] = useState(0);
  const [memberLocal, setMemberLocal] = useState(0);
  const [memberImg, setMemberImg] = useState("");
  const [memberThumbnail, setMemberThumbnail] = useState("");
  const [checkIdMsg, setCheckIdMsg] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState("");

  const navigate = useNavigate();
  const idCheck = () => {
    const idReg = /^[a-zA-Z0-9]{1,8}$/;
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
      /*
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
        memberImg,
        memberThumbnail,
      };
      */
      const form = new FormData();
      form.append("memberId", memberId);
      form.append("memberPw", memberPw);
      form.append("memberName", memberName);
      form.append("memberPhone", memberPhone);
      form.append("memberContent", memberContent);
      form.append("memberMail", memberMail);
      form.append("memberCategory1", memberCategory1);
      form.append("memberCategory2", memberCategory2);
      form.append("memberLocal", memberLocal);
      form.append("memberThumbnail", memberThumbnail);
      axios
        .post("/member/join", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
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
  const handleChange1 = (event) => {
    setMemberLocal(event.target.value);
  };
  const handleChange2 = (event) => {
    setMemberCategory1(event.target.value);
  };
  const handleChange3 = (event) => {
    setMemberCategory2(event.target.value);
  };
  const Emails = [
    "@naver.com",
    "@gmail.com",
    "@daum.net",
    "@hanmail.net",
    "@yahoo.com",
    "@outlook.com",
    "@nate.com",
    "@kakao.com",
  ];
  //이메일
  const [emailList, setEmailList] = useState(Emails);
  const [selected, setSelected] = useState(-1);
  const [isDrobBox, setIsDropbox] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsDropbox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [inputRef]);
  const onChangeEmail = (e) => {
    setMemberMail(e.target.value);

    if (e.target.value.includes("@")) {
      setIsDropbox(true);
      setEmailList(
        Emails.filter((el) => el.includes(e.target.value.split("@")[1]))
      );
    } else {
      setIsDropbox(false);
      setSelected(-1);
    }
  };
  const handleDropDownClick = (first, second) => {
    setMemberMail(`${first.split("@")[0]}${second}`);
    setIsDropbox(false);
    setSelected(-1);
  };
  const handleKeyUp = (e) => {
    if (isDrobBox) {
      if (e.key === "ArrowDown" && emailList.length - 1 > selected) {
        setSelected(selected + 1);
      }
      if (e.key === "ArrowUp" && selected >= 0) {
        setSelected(selected - 1);
      }
      if (e.key === "Enter" && selected >= 0) {
        handleDropDownClick(memberMail, emailList[selected]);
      }
    }
  };
  const thumbnailChange = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setMemberThumbnail(files[0]); //썸네일 파일 전송을위한 state에 값 파일객체 저장
      //화면에 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setMemberImg(reader.result);
      };
    } else {
      setMemberThumbnail({});
      setMemberImg(null);
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
      <div ref={inputRef} className="join-mail-wrap">
        <input
          type="text"
          placeholder="이메일 입력"
          value={memberMail}
          name={memberMail}
          id="memberMail"
          onChange={(e) => {
            onChangeEmail(e);
          }}
          onKeyUp={handleKeyUp}
        />
        {isDrobBox && (
          <div>
            {emailList.map((item, idx) => (
              <div
                key={idx}
                onMouseOver={() => setSelected(idx)}
                onClick={() => handleDropDownClick(memberMail, item)}
                selected={selected === idx}
              >
                {memberMail.split("@")[0]}
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="join-category-title">피드 설정</div>
      <div className="member-thumbnail">
        <input
          type="file"
          id="memberThumbnail"
          accept="image/*"
          onChange={thumbnailChange}
        />
        <div>
          {memberImg === null ? (
            <Avatar src="/image/default.png" sx={{ width: 56, height: 56 }} />
          ) : (
            <Avatar src={memberImg} sx={{ width: 108, height: 108 }} />
          )}
          <textarea
            value={memberContent}
            id={memberContent}
            placeholder="피드 소개글"
            onChange={(e) => {
              setMemberConTent(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="join-category">
        <div className="join-category-title">관심 카테고리</div>
        <div>
          <FormControl sx={{ m: 0.5, width: 400 }}>
            <Select value={memberCategory1} onChange={handleChange2}>
              <MenuItem value={1}>문화·예술</MenuItem>
              <MenuItem value={2}>운동·액티비티</MenuItem>
              <MenuItem value={3}>푸드·드링크</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 0.5, width: 400 }}>
            <Select value={memberCategory2} onChange={handleChange3}>
              <MenuItem value={1}>문화·예술</MenuItem>
              <MenuItem value={2}>운동·액티비티</MenuItem>
              <MenuItem value={3}>푸드·드링크</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl sx={{ m: 0.5, width: 400 }}>
            <Select value={memberLocal} onChange={handleChange1}>
              <MenuItem value={1}>서울</MenuItem>
              <MenuItem value={2}>경기</MenuItem>
              <MenuItem value={3}>부산</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="join-btn-box">
        <Button1 text="회원가입" clickEvent={join} />
      </div>
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
