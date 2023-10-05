import { Route, Routes } from "react-router-dom";
import "./group.css";
import GroupCreate from "./GroupCreate";
import GroupView from "./GroupView";

const GroupMain = (props) => {
  const groupName = props.groupName;
  const setGroupName = props.setGroupName;
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <div className="group-all-wrap">
      <Routes>
        <Route path="create" element={<GroupCreate />} />
        <Route path="view" element={<GroupView isLogin={isLogin} />} />
      </Routes>
    </div>
  );
};

export default GroupMain;
