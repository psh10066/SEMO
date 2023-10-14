import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Button1 } from "../util/Buttons";
import FeedList from "./FeedList";
import GroupList from "./GroupList";
import { useEffect } from "react";
import axios from "axios";
import FeedModal from "../util/FeedModal";
import Swal from "sweetalert2";

const FeedProfile = (props) => {
  const isLogin = props.isLogin;
  const [member, setMember] = useState({});
  const [loginMember, setLoginMember] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [feedList, setFeedList] = useState([]);
  const [changeFeed, setChangeFeed] = useState(true);
  const [feedCount, setFeedCount] = useState(0);
  const location = useLocation();
  const memberNo = location.state.memberNo;
  const feedWriter = memberNo;
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollow, setIsFollow] = useState(0);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/feed/profile/" + memberNo)
      .then((res) => {
        // console.log(res.data);
        setMember(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    if (isLogin) {
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          // console.log(res.data);
          setLoginMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
      axios
        .post(
          "/member/isFollow",
          { memberNo },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          setIsFollow(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [isLogin]);
  const [menus, setMenus] = useState([
    { url: "feedList", text: "피드", active: true },
    { url: "groupList", text: "모임", active: false },
  ]);
  const handelClick = () => {
    //모달오픈
    setIsOpen(true);
  };
  const onSubmit = () => {
    // 특정 로직
    setIsOpen(false);
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    axios
      .get("/feed/list/" + feedWriter)
      .then((res) => {
        // console.log(res.data);
        setFeedList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    axios
      .get("/feed/feedCount/" + feedWriter)
      .then((res) => {
        setFeedCount(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [changeFeed]);
  const loginMsg = () => {
    Swal.fire("로그인 후 이용해 주세요.");
  };
  const follow = () => {
    axios
      .post(
        "/member/follow",
        { memberNo },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsFollow(1);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  const unfollow = () => {
    axios
      .post(
        "/member/unfollow",
        { memberNo },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsFollow(0);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div className="feed-profile-all-wrap">
      <div className="feed-profile-wrap">
        <div className="profile-top">
          {member.memberImg === null ? (
            <div className="profile-image">
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt="Remy Sharp"
                  src="/image/person.png"
                  sx={{ width: 100, height: 100 }}
                />
              </Stack>
            </div>
          ) : (
            <div className="profile-image">
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt="Remy Sharp"
                  src={"/member/" + member.memberImg}
                  sx={{ width: 100, height: 100 }}
                />
              </Stack>
            </div>
          )}

          <div className="feed-follow">
            <table>
              <tbody>
                <tr>
                  <td>피드</td>
                  <td>팔로워</td>
                  <td>팔로잉</td>
                </tr>
                <tr>
                  <th>{feedCount}</th>
                  <th>{followerCount}</th>
                  <th>{followingCount}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="feed-memberName">{member.memberName}</div>
        <div className="feed-memberContent">
          <div>{member.memberContent}</div>
        </div>
        <div className="profile-bottom">
          <div className="profile-category">
            <Link to="#">
              {member.memberCategory1 === 1
                ? "#문화·예술"
                : member.memberCategory1 === 2
                ? "#운동·액티비티"
                : "#푸드·드링크"}
            </Link>
            <Link to="#">
              {member.memberCategory2 === 1
                ? "#문화·예술"
                : member.memberCategory2 === 2
                ? "#운동·액티비티"
                : "#푸드·드링크"}
            </Link>
          </div>
          <div className="profile-button">
            <FeedModal
              isOpen={isOpen}
              onSubmit={onSubmit}
              onCancel={onCancel}
              member={member}
              changeFeed={changeFeed}
              setChangeFeed={setChangeFeed}
              type="write"
            />
            {isLogin ? (
              loginMember && loginMember.memberNo === member.memberNo ? (
                <Button1 text="피드 작성" clickEvent={handelClick} />
              ) : isFollow === 1 ? (
                <Button1 text="팔로잉" clickEvent={unfollow} />
              ) : (
                <Button1 text="팔로우" clickEvent={follow} />
              )
            ) : (
              <Button1 text="팔로우" clickEvent={loginMsg} />
            )}
          </div>
        </div>
      </div>
      <div className="feed-profile-bottom-wrap">
        <ProfileMenu menus={menus} setMenus={setMenus} />
        <div className="feed-current-content">
          <Routes>
            <Route path="groupList" element={<GroupList />} />
            <Route path="*" element={<FeedList feedList={feedList} />} />
            <Route
              path="*"
              element={
                <FeedList feedList={feedList} setFeedList={setFeedList} />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const ProfileMenu = (props) => {
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
    <div className="profile-menu">
      <ul>
        {menus.map((menu, index) => {
          return (
            <li key={"profileMenu" + index}>
              {menu.active ? (
                <Link
                  to={menu.url}
                  className="active-profile-menu"
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
export default FeedProfile;
