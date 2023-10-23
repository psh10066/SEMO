import "./page.css";
import { Route, Routes } from "react-router-dom";
import PageList from "./PageList";
import GroupView from "../group/GroupView";

const PageMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <div className="page-all-wrap">
      <Routes>
        <Route path="view" element={<GroupView isLogin={isLogin} />} />
        <Route path="*" element={<PageList isLogin={isLogin} />} />
      </Routes>
    </div>
  );
};

export default PageMain;
