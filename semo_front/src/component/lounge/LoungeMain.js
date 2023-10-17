import { Route, Routes } from "react-router-dom";
import "./lounge.css";
import LoungeList from "./LoungeList";

const LoungeMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <div className="lounge-all-wrap">
      <div className="lounge-title">
        <h2>라운지</h2>
        <div className="lounge-explain">라운지(피드) 설명</div>
      </div>
      <Routes>
        <Route path="*" element={<LoungeList isLogin={isLogin} />} />
      </Routes>
    </div>
  );
};

export default LoungeMain;
