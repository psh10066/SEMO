import { Route, Routes } from "react-router-dom";
import "./group.css";
import GroupCreate from "./GroupCreate";

const GroupMain = (props) => {
  return (
    <div className="group-all-wrap">
      <GroupCreate />
    </div>
  );
};

export default GroupMain;
