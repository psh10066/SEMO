import { Route, Routes } from "react-router-dom";
import "./grBoard.css";
import GrBoardList from "./GrBoardList";
import GrBoardWrite from "./GrBoardWrite";
import GrBoardView from "./GrBoardView";
import GrBoardModify from "./GrBoardModify";

const GrBoardMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <div className="board-all-wrap">
      <div className="board-title">나의 모임 게시판</div>
      <Routes>
        <Route path="view" element={<GrBoardView isLogin={isLogin} />} />
        <Route path="write" element={<GrBoardWrite />} />
        <Route path="modify" element={<GrBoardModify />} />
        <Route path="*" element={<GrBoardList isLogin={isLogin} />}></Route>
      </Routes>
    </div>
  );
};

export default GrBoardMain;
