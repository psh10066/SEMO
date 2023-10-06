import { useState } from "react";
import NoticeFrm from "./NoticeFrm";
import "./notice.css";
import { useNavigate } from "react-router-dom";

const NoticeWrite = () => {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");

  const navigate = useNavigate();
  const write = () => {
    console.log(noticeTitle);
    console.log(noticeContent);
  };
  return (
    <div>
      <div>공지사항 작성</div>
      <NoticeFrm />
    </div>
  );
};

export default NoticeWrite;
