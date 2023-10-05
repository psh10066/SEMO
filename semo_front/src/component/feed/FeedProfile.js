import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Button1 } from "../util/Buttons";
import FeedList from "./FeedList";
import GroupList from "./GroupList";

const FeedProfile = (props) => {
  const [menus, setMenus] = useState([
    { url: "feedList", text: "피드", active: true },
    { url: "groupList", text: "모임", active: false },
  ]);
  return (
    <div className="feed-profile-all-wrap">
      <div className="feed-profile-wrap">
        <div className="profile-top">
          <div className="profile-image">
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </Stack>
          </div>
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
        <div className="feed-memberName">이름</div>
        <div className="feed-memberContent">
          <div>
            ㄴㅁ어리넝러니얼넝히ㅓ니어허ㅑㅐ댜ㅜ파이ㅏㅓㄴㄹ
            니ㅏㅇ러ㅐㄴ얼ㄴ이ㅏㄹ낭힌어힌ㅇ
            ㄴㅇ허닝허ㅐ낻ㄱ헞두히ㅏㅟ어ㅠㅏ너이 ㄴㅇ허ㅐㄴㅇ랑
            ㄴㅁ어리넝러니얼넝히ㅓ니어허ㅑㅐ댜ㅜ파이ㅏㅓㄴㄹ
            니ㅏㅇ러ㅐㄴ얼ㄴ이ㅏㄹ낭힌어힌ㅇ
            ㄴㅇ허닝허ㅐ낻ㄱ헞두히ㅏㅟ어ㅠㅏ너이 ㄴㅇ허ㅐㄴㅇ랑
            ㄴㅁ어리넝러니얼넝히ㅓ니어허ㅑㅐ댜ㅜ파이ㅏㅓㄴㄹ
            니ㅏㅇ러ㅐㄴ얼ㄴ이ㅏㄹ낭힌어힌ㅇ
            ㄴㅇ허닝허ㅐ낻ㄱ헞두히ㅏㅟ어ㅠㅏ너이 ㄴㅇ허ㅐㄴㅇ랑
            ㄴㅁ어리넝러니얼넝히ㅓ니어허ㅑㅐ댜ㅜ파이ㅏㅓㄴㄹ
            니ㅏㅇ러ㅐㄴ얼ㄴ이ㅏㄹ낭힌어힌ㅇ
            ㄴㅇ허닝허ㅐ낻ㄱ헞두히ㅏㅟ어ㅠㅏ너이 ㄴㅇ허ㅐㄴㅇ랑
            ㄴㅁ어리넝러니얼넝히ㅓ니어허ㅑㅐ댜ㅜ파이ㅏㅓㄴㄹ
            니ㅏㅇ러ㅐㄴ얼ㄴ이ㅏㄹ낭힌어힌ㅇ
            ㄴㅇ허닝허ㅐ낻ㄱ헞두히ㅏㅟ어ㅠㅏ너이 ㄴㅇ허ㅐㄴㅇ랑
          </div>
        </div>
        <div className="profile-bottom">
          <div className="profile-category">
            <Link to="#">#카테고리</Link>
            <Link to="#">#카테고리</Link>
          </div>
          <div className="profile-button">
            <Button1 text="팔로우" />
          </div>
        </div>
      </div>
      <div className="feed-profile-bottom-wrap">
        <ProfileMenu menus={menus} setMenus={setMenus} />
        <div className="feed-profile-current-content">
          <Routes>
            <Route path="feedList" element={<FeedList />} />
            <Route path="groupList" element={<GroupList />} />
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
