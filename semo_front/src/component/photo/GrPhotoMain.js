import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./grPhoto.css";
import GrPhotoList from "./GrPhotoList";
import GrPhotoWrite from "./GrPhotoWrite";
import GrPhotoView from "./GrPhotoView";
import GrPhotoModify from "./GrPhotoModify";

const GrPhotoMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;

  const [menus, setMenus] = useState([
    {
      url: "/group/groupBoard",
      text: "게시판",
      active: false,
    },
    {
      url: "/group/groupPhoto",
      text: "사진첩",
      active: true,
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
              <Link to={menu.url} className={menu.active ? "active-side" : ""}>
                {menu.text}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="photo-all-wrap">
      <MySideMenu menus={menus} setMenus={setMenus} />
      <div className="photo-title">나의 모임 사진첩</div>
      <Routes>
        <Route path="view" element={<GrPhotoView isLogin={isLogin} />} />
        <Route path="write" element={<GrPhotoWrite />} />
        <Route path="modify" element={<GrPhotoModify />} />
        <Route path="*" element={<GrPhotoList isLogin={isLogin} />}></Route>
      </Routes>
    </div>
  );
};

export default GrPhotoMain;
