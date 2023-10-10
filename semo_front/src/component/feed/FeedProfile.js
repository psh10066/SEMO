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

const FeedProfile = (props) => {
  const isLogin = props.isLogin;
  const [member, setMember] = useState({});
  const [loginMember, setLoginMember] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [feedList, setFeedList] = useState([]);
  const [changeFeed, setChangeFeed] = useState(true);
  const location = useLocation();
  const memberNo = location.state.memberNo;
  const feedWriter = memberNo;

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
      const token = window.localStorage.getItem("token");
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
        console.log(res.data);
        setFeedList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [changeFeed]);
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
                  <th>123</th>
                  <th>123</th>
                  <th>123</th>
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
              ) : (
                <Button1 text="팔로우" />
              )
            ) : (
              <Button1 text="팔로우" />
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
