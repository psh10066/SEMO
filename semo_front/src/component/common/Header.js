import { Link, useLocation, useNavigate } from "react-router-dom";
import MainSearch from "../mainpage/search/MainSearch";
import ChatNewNotice from "../chat/chatNewNotice";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { yellow } from "@mui/material/colors";

const Header = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const location = useLocation();

  let headerStyle = {};
  let headerBackgroundColor = {};
  let headerWrapHeight = {};
  let headerPosition = {};

  if (location.pathname.includes("/login")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/admin")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/login")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/join")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/group")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/groupBoard")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/notice")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/meeting")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/feed")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/page")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/mypage")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/chat")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/searchresult")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/lounge")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }
  if (location.pathname.includes("/local")) {
    headerStyle = { color: "#220895" };
    headerBackgroundColor = { backgroundColor: "#fff" };
    headerWrapHeight = { height: "60px" };
    headerPosition = { position: "absolute" };
  }

  return (
    <header style={headerWrapHeight}>
      <div className="header" style={(headerBackgroundColor, headerPosition)}>
        <div className="main-logo">
          <Link to="/" style={headerStyle}>
            SEMOMO
          </Link>
        </div>
        <Navi isLogin={isLogin} />
        <div className="header-leftside">
          <div className="chatTotal">
            <div className="chat groupCreate">
              {isLogin ? (
                <Link to="/group/create" title="모임 만들기">
                  <span className="material-icons" style={headerStyle}>
                    group_add
                  </span>
                </Link>
              ) : null}
            </div>
            <div className="chat">
              {isLogin ? (
                <Link to="/chat/chatInfo" title="채팅">
                  <span className="material-icons" style={headerStyle}>
                    chat_bubble
                  </span>
                </Link>
              ) : null}
            </div>
            <div className="chatNew" style={{ marginLeft: "2px" }}>
              {/* 새로운 채팅 있을때, New 뜨게하기*/}
              {isLogin ? (
                <Link to="/chat/chatInfo">
                  <Chatalert />
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
  if (location.pathname.includes("/lounge")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/local")) {
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
          <Link to="/lounge" style={naviStyle}>
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

//
//채팅 뉴 띄우기
const Chatalert = () => {
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});
  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMember(res.data);
      })
      .catch((res) => {});
  }, []);

  //나의 가장 최신 채팅 시간 확인 (완료)
  const [myLatestChatTime, setMyLatestChatTime] = useState("");
  useEffect(() => {
    axios
      .post("/chat/myLatestChatTime", member, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      .then((res) => {
        setMyLatestChatTime(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [member]);

  //내 모든 채팅방 total 채팅 시간 확인 (완료)
  const [totalLatestChatTime, setTotalLatestChatTime] = useState("");
  useEffect(() => {
    axios
      .post("/chat/totalLatestChatTime", member, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setTotalLatestChatTime(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [member]);

  return (
    <>{myLatestChatTime < totalLatestChatTime ? <strong> New</strong> : ""}</>
  );
};

export default Header;
