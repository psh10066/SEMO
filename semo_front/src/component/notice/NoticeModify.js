import { useLocation, useNavigate } from "react-router-dom";
import "./notice.css";
import { useState } from "react";
import NoticeFrm from "./NoticeFrm";
import axios from "axios";
import Swal from "sweetalert2";

const NoticeModify = () => {
  const location = useLocation();
  //console.log(location);
  const notice = location.state.notice;
  //console.log(notice);

  const [noticeTitle, setNoticeTitle] = useState(notice.noticeTitle);
  const [noticeContent, setNoticeContent] = useState(notice.noticeContent);

  const navigate = useNavigate();

  const modify = () => {
    if (
      noticeTitle !== "" &&
      noticeContent !== "" &&
      noticeContent !== "<p><br></p>"
    ) {
      const form = new FormData();
      form.append("noticeNo", notice.noticeNo);
      form.append("noticeTitle", noticeTitle);
      form.append("noticeContent", noticeContent);
      //console.log(noticeContent);
      const token = window.localStorage.getItem("token");
      axios
        .post("/notice/modify", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            //상단 두 줄은 파일 첨부해야 할 경우를 위한 코드
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          //console.log(res.data);
          if (res.data === 1) {
            navigate("/notice");
          } else {
            Swal.fire("잠시 후 다시 시도해주세요.");
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({
        icon: "warning",
        html: "내용을 입력해주세요.",
      });
    }
  };

  return (
    <div className="notice-frm-wrap">
      <div className="notice-frm-title">공지사항 수정</div>
      <NoticeFrm
        noticeTitle={noticeTitle}
        setNoticeTitle={setNoticeTitle}
        noticeContent={noticeContent}
        setNoticeContent={setNoticeContent}
        buttonEvent={modify}
        type="modify"
      />
    </div>
  );
};

export default NoticeModify;
