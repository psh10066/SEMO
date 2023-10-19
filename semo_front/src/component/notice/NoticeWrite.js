import { useState } from "react";
import NoticeFrm from "./NoticeFrm";
import "./notice.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const NoticeWrite = () => {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");

  const navigate = useNavigate();
  const write = () => {
    //console.log(noticeTitle);
    //console.log(noticeContent);
    if (noticeTitle !== "" && noticeContent !== "") {
      const form = new FormData();
      form.append("noticeTitle", noticeTitle);
      form.append("noticeContent", noticeContent);
      const token = window.localStorage.getItem("token");
      axios
        .post("/notice/insert", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            //상단 두 줄은 파일 첨부해야 할 경우를 위한 코드
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          //console.log(res.data);
          if (res.data > 0) {
            navigate("/notice");
          }
        })
        .catch((res) => [console.log(res.response.status)]);
    } else {
      Swal.fire({
        icon: "error",
        html: "에러가 발생했습니다.<br>잠시 후 다시 시도해주세요.",
      });
    }
  };
  return (
    <div>
      <div className="notice-frm-title">공지사항 작성</div>
      <NoticeFrm
        noticeTitle={noticeTitle}
        setNoticeTitle={setNoticeTitle}
        noticeContent={noticeContent}
        setNoticeContent={setNoticeContent}
        buttonEvent={write}
        type="write"
      />
    </div>
  );
};

export default NoticeWrite;
