import { Route, Routes } from "react-router-dom";
import "./lounge.css";
import LoungeList from "./LoungeList";

const LoungeMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <div className="lounge-all-wrap">
      <Routes>
        <Route path="*" element={<LoungeList isLogin={isLogin} />} />
      </Routes>
    </div>
  );
};

export default LoungeMain;
