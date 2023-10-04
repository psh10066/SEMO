import { Route, Routes } from "react-router";
import "./notice.css";
import NoticeModify from "./NoticeModify";
import NoticeWrite from "./NoticeWrite";
import NoticeView from "./NoticeView";
import NoticeList from "./NoticeList";

const NoticeMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <div>
      <div>NOTICE</div>
      <Routes>
        <Route path="view" element={<NoticeView isLogin={isLogin} />} />
        <Route path="write" element={<NoticeWrite />} />
        <Route path="modify" element={<NoticeModify />} />
        <Route path="*" element={<NoticeList />} />
      </Routes>
    </div>
  );
};

export default NoticeMain;
