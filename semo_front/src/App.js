import { useEffect, useState } from "react";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import "./component/common/default.css";
import { Button1 } from "./component/util/Buttons";
import MyModal from "./component/util/MyModal";
import { Route, Routes } from "react-router";
import AdminMain from "./component/admin/AdminMain";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import GroupMain from "./component/group/GroupMain";
import Mainpage from "./component/mainpage/MainPage";
import NoticeMain from "./component/notice/NoticeMain";
import MeetingCreate from "./component/meeting/MeetingCreate";
import FeedMain from "./component/feed/FeedMain";
import PageMain from "./component/page/PageMain";
import { Mypage } from "./component/mypage/Mypage";
import Chat from "./component/chat/Chat";
import MeetingMain from "./component/meeting/MeetingMain";
import KakaoCallBack from "./component/member/KakaoCallback";
import SearchResult from "./component/searchresult/SearchResult";
import LoungeMain from "./component/lounge/LoungeMain";
import MypageReport from "./component/mypage/MypageReport";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      setIsLogin(false);
      console.log(1);
    } else {
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <div className="wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="content">
        <Routes>
          <Route
            path="/admin/*"
            element={<AdminMain isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route
            path="/oauth2/kakao"
            element={<KakaoCallBack setIsLogin={setIsLogin} />}
          />
          <Route path="/join" element={<Join />} />
          <Route
            path="/group/*"
            element={<GroupMain isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/notice/*"
            element={<NoticeMain isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/meeting/*"
            element={<MeetingMain />}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
          <Route
            path="/feed/*"
            element={<FeedMain isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/page/*"
            element={<PageMain isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/mypage/*"
            element={<Mypage isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/chat/*"
            element={<Chat isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/searchresult/*"
            element={<SearchResult isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/lounge/*"
            element={<LoungeMain isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route path="/" element={<Mainpage />} />
        </Routes>
      </div>

      <Footer setIsLogin={setIsLogin} isLogin={isLogin} />
    </div>
  );
}

export default App;
