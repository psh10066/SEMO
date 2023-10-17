import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import MainSearch from "../mainpage/search/MainSearch";

const Header = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const location = useLocation();

  let headerStyle = {};

  if (location.pathname.includes("/login")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/admin")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/login")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/join")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/group")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/groupBoard")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/notice")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/meeting")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/feed")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/page")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/mypage")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/chat")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/searchresult")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/listall")) {
    headerStyle = { color: "#220895" };
  }

  return (
    <header>
      <div className="header">
        <div className="main-logo">
          <Link to="/" style={headerStyle}>
            SEMOMO
          </Link>
        </div>
        <Navi isLogin={isLogin} />
        <div className="header-leftside">
          <div className="chatTotal">
            <div className="chat">
              {isLogin ? (
                <Link to="/chat" title="채팅">
                  <span className="material-icons" style={headerStyle}>
                    chat_bubble
                  </span>
                </Link>
              ) : null}
            </div>
            <div className="chatNew">
              {isLogin ? (
                <Link to="/chat" title="채팅">
                  <span className="chatNew" style={headerStyle}>
                    N
                  </span>
                  {/* 새로운 채팅 있을때, N 뜨게하기*/}
                </Link>
              ) : null}
            </div>
          </div>
          <MainSearch />
          <button>
            <HeaderLink isLogin={isLogin} setIsLogin={setIsLogin} />
          </button>
        </div>
      </div>
    </header>
  );
};

const Navi = (props) => {
  const location = useLocation();
  const isLogin = props.isLogin;

  let naviStyle = {};

  if (location.pathname.includes("/login")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/admin")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/login")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/join")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/group")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/groupBoard")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/notice")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/meeting")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/feed")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/page")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/mypage")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/chat")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/searchresult")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/listall")) {
    naviStyle = { color: "#220895" };
  }

  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/page" style={naviStyle}>
            소셜링
          </Link>
        </li>
        <li>
          <Link to="/listall" style={naviStyle}>
            라운지
          </Link>
        </li>
        <li>
          {isLogin ? (
            <Link to="/mypage/mygroup" title="마이페이지" style={naviStyle}>
              마이페이지
            </Link>
          ) : null}
        </li>
      </ul>
    </div>
  );
};

const HeaderLink = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const logout = () => {
    window.localStorage.removeItem("token");
    setIsLogin(false);
  };
  return (
    <div>
      {isLogin ? (
        <>
          <Link to="/" title="로그아웃" onClick={logout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" title="로그인">
            Login
          </Link>
        </>
      )}
    </div>
  );
};
export default Header;
