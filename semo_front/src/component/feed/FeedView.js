import { Avatar, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FeedView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const feedNo = location.state.feedNo;
  const [feed, setFeed] = useState({});
  const [member, setMember] = useState(null);
  useEffect(() => {
    axios
      .get("/feed/view/" + feedNo)
      .then((res) => {
        // console.log(res.data);
        setFeed(res.data);
      })
      .catch((res) => {
        console.log(res.response.state);
      });
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          //   console.log(res.data);
          setMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);
  function formatTime(postTime) {
    const currentTime = new Date();
    const postDate = new Date(postTime);

    const timeDifference = (currentTime - postDate) / 1000; // 초 단위로 계산
    const seconds = Math.floor(timeDifference);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);

    const year = postDate.getFullYear();
    const month = postDate.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더합니다.
    const day = postDate.getDate();
    if (years >= 1) {
      return `${year}년 ${month}월 ${day}일`;
    } else if (weeks >= 1) {
      return `${month}월 ${day}일`;
    } else if (days >= 1) {
      return `${days}일 전`;
    } else if (hours >= 1) {
      return `${hours}시간 전`;
    } else if (minutes >= 1) {
      return `${minutes}분 전`;
    } else if (seconds >= 1) {
      return `${seconds}초 전`;
    } else {
      return "방금";
    }
  }
  return (
    <div className="feed-view-wrap">
      <div className="feed-view-top">
        <div className="feed-writerImg">
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="Remy Sharp"
              src={"/member/" + feed.memberImg}
              sx={{ width: 70, height: 70 }}
            />
          </Stack>
        </div>
        <div className="feed-writerName">{feed.memberName}</div>
        <div className="feed-write-date">
          {feed.feedDate ? formatTime(feed.feedDate) : ""}
        </div>
      </div>
    </div>
  );
};

export default FeedView;
