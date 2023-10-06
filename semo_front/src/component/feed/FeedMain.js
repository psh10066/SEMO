import { Route, Routes } from "react-router-dom";
import "./feed.css";
import FeedProfile from "./FeedProfile";
import { is } from "date-fns/locale";

const FeedMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  // console.log("main : " + isLogin);
  return (
    <div className="feed-all-wrap">
      <Routes>
        <Route
          path="profile/*"
          element={<FeedProfile isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
      </Routes>
    </div>
  );
};

export default FeedMain;
