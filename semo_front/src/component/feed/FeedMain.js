import { Route, Routes } from "react-router-dom";
import "./feed.css";
import FeedProfile from "./FeedProfile";

const FeedMain = (props) => {
  return (
    <div className="feed-all-wrap">
      <Routes>
        <Route path="profile" element={<FeedProfile />} />
      </Routes>
    </div>
  );
};

export default FeedMain;
