import { useState } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import "./grBoard.css";
import GrBoardList from "./GrBoardList";
import GrBoardWrite from "./GrBoardWrite";
import GrBoardView from "./GrBoardView";
import GrBoardModify from "./GrBoardModify";

const GrBoardMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const location = useLocation();
  const [groupNo, setGroupNo] = useState(location.state.groupNo);

  const [menus, setMenus] = useState([
    {
      url: "/group/groupBoard",
      text: "게시판",
      active: true,
    },
    {
      url: "/group/groupPhoto",
      text: "사진첩",
      active: false,
    },
  ]);

  const MySideMenu = (props) => {
    const menus = props.menus;
    const setMenus = props.setMenus;

    return (
      <div className="group-view-tap">
        <div>
          {menus.map((menu, index) => (
            <div key={"menu" + index}>
              <Link
                to={menu.url}
                state={{ groupNo: groupNo }}
                className={menu.active ? "active-side" : ""}
              >
                {menu.text}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="board-all-wrap">
      <MySideMenu menus={menus} setMenus={setMenus} />
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
