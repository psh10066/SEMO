import { Route, Routes } from "react-router-dom";
import "./group.css";
import GroupCreate from "./GroupCreate";
import GroupView from "./GroupView";
import GroupSetting from "./GroupSetting";
import GrBoardMain from "../board/GrBoardMain";
import GrPhotoMain from "../photo/GrPhotoMain";

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
        <Route path="setting" element={<GroupSetting />} />
        <Route
          path="/groupBoard/*"
          element={<GrBoardMain isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        <Route
          path="/groupPhoto/*"
          element={<GrPhotoMain isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
      </Routes>
    </div>
  );
};

export default GroupMain;
