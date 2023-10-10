import { Route, Routes } from "react-router-dom";
import MeetingCreate from "./MeetingCreate";
import MeetingView from "./MeetingView";

const MeetingMain = (props) => {
  const isLogin = props.isLogin;
  return (
    <Routes>
      <Route path="create" element={<MeetingCreate />} />
      <Route path="view" element={<MeetingView />} />
    </Routes>
  );
};

export default MeetingMain;
