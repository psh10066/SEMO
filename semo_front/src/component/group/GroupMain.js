import { Route, Routes } from "react-router-dom";
import "./group.css";
import GroupCreate from "./GroupCreate";

const GroupMain = (props) => {
  return (
    <div className="group-all-wrap">
      <Routes>
        <Route path="create" element={<GroupCreate />} />
      </Routes>
    </div>
  );
};

export default GroupMain;
