import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./mypage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MyGroup from "./MyGroup";
import MyLikeGroup from "./MyLikeGroup";
import MyInfo from "./MyInfo";
import AdminMain from "../admin/AdminMain";
import ModifyMyInfo from "./ModifyMyInfo";
import ModifyMyFeed from "./ModifyMyFeed";
import ModifyMyLike from "./ModifyMyLike";
import ModifyMyPassword from "./ModifyMyPassword";
import MypageReport from "./MypageReport";

const Mypage = (props) => {
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});

  const [menus, setMenus] = useState([
    { url: "mygroup", text: "내가 참여하고 있는 모임", active: false },
    { url: "mylikegroup", text: "내가 찜한 모임", active: false },
    { url: "myInfo", text: "관리", active: false },
  ]);

  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMember(res.data);
        document.querySelectorAll(".mysidemenu a")[0].click(); // /mypage 열리면 제일 첫번쨰메뉴 클릭

        if (res.data && res.data.memberType === 1) {
          const adminMenu = {
            url: "adminMain",
            text: "관리자 페이지",
            active: false,
          };
          setMenus([...menus, adminMenu]); //setMenus > menus참조값 복사
        }
      })
      .catch((res) => {
        if (res.response.status === 403) {
          Swal.fire({
            title: "로그인이 필요한 서비스 입니다.",
            text: "로그인 페이지로 이동합니다.",
            icon: "info",
          }).then(() => {
            navigate("/login");
          });
        }
      });
  }, []);

  if (!isLogin) {
    Swal.fire({
      title: "로그인이 필요한 서비스 입니다.",
      text: "로그인 페이지로 이동합니다.",
      icon: "info",
    }).then(() => {
      navigate("/login");
    });
  }
  const myfeed = () => {
    navigate("/feed/profile", { state: { memberNo: member.memberNo } });
  };
  const mychat = () => {
    navigate("/chat/chatInfo");
  };

  return (
    <div className="mypage-all-wrap">
      <div className="mypage-title">
        <h2>My Page</h2>
      </div>
      <div className="mypage-intro">
        <div className="mypage-name">
          <div className="material-icons">face</div>
          <div>
            <span>{member.memberName}</span>
          </div>
        </div>
        <div className="mypage-buttons">
          <div className="mypage-myfeed a" onClick={myfeed}>
            <div className="material-icons">interests</div>
            <div className="texta">내 피드</div>
          </div>
          <div className="mypage-myfeed b" onClick={mychat}>
            <div className="material-icons">chat_bubble</div>
            <div className="textb">내 채팅</div>
          </div>
        </div>
      </div>
      <div className="mypage-content">
        <MySideMenu menus={menus} setMenus={setMenus} />
        <div className="current-content">
          <Routes>
            <Route
              path="mygroup"
              element={
                <MyGroup
                  member={member}
                  setMember={setMember}
                  setIsLogin={setIsLogin}
                />
              }
            />
            <Route
              path="mylikegroup"
              element={
                <MyLikeGroup
                  member={member}
                  setMember={setMember}
                  setIsLogin={setIsLogin}
                />
              }
            />
            <Route path="myInfo" element={<MyInfo />} />
            <Route
              path="modifyMyinfo"
              element={<ModifyMyInfo member={member} setMember={setMember} />}
            />
            <Route
              path="modifyMyPassword"
              element={
                <ModifyMyPassword member={member} setMember={setMember} />
              }
            />
            <Route
              path="modifyMyFeed"
              element={<ModifyMyFeed member={member} setMember={setMember} />}
            />
            <Route
              path="modifyMyLike"
              element={<ModifyMyLike member={member} setMember={setMember} />}
            />
            <Route
              path="adminMain/*"
              element={<AdminMain isLogin={isLogin} setIsLogin={setIsLogin} />}
            />
            <Route
              path="mygroup/mypageReport"
              element={
                <MypageReport
                  member={member}
                  setMember={setMember}
                  isLogin={isLogin}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

//사이드메뉴
const MySideMenu = (props) => {
  const menus = props.menus;
  const setMenus = props.setMenus;

  const activeTab = (index) => {
    menus.forEach((item) => {
      item.active = false;
    });
    menus[index].active = true;
    setMenus([...menus]);
  };

  return (
    <div className="mysidemenu">
      <ul>
        {menus.map((menu, index) => {
          return (
            <li key={"menu" + index}>
              {menu.active ? (
                <Link
                  to={menu.url}
                  className="active-side"
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {menu.text}
                </Link>
              ) : (
                <Link
                  to={menu.url}
                  onClick={() => {
                    activeTab(index);
                  }}
                >
                  {menu.text}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { Mypage, MySideMenu };
