import "./page.css";
import { Route, Routes } from "react-router-dom";
import PageList from "./PageList";
import GroupView from "../group/GroupView";

const PageMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <div className="page-all-wrap">
      <div className="page-title">
        <h2>소셜링</h2>
        <div className="socialing-explain">소셜링 설명</div>
      </div>
      <Routes>
        <Route path="view" element={<GroupView isLogin={isLogin} />} />
        <Route path="*" element={<PageList isLogin={isLogin} />} />
      </Routes>
    </div>
  );
};

export default PageMain;
