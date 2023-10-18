import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import GroupMember from "./GroupMember";

const GroupSetting = () => {
  // const [group, setGroup] = useState({});
  // const group = props.group;
  // console.log(group);
  // const groupNo = group.groupNo;
  const [grJoinList, setGrJoinList] = useState(null);
  const [memberList, setMemberList] = useState(null);
  const location = useLocation();
  // const group = location.state.group;
  // console.log(group);

  // const groupNo = group.groupNo;
  const groupNo = location.state ? location.state.groupNo : null;

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    //group 불러오기
    // axios
    //   .get("/group/view/" + groupNo, {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   })
    //   .then((res) => {
    //     setGroup(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.response.status);
    //   });
    //gr_join 불러오기
    axios
      .get("/group/grJoinList/" + groupNo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setGrJoinList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    //그룹에 가입된 회원리스트
    axios
      .get("/group/memberList/" + groupNo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMemberList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  const [menus, setMenus] = useState([
    {
      url: "groupMember",
      text: "모임 회원 관리",
      active: true,
    },
    {
      url: "/",
      text: "모임 정보 수정",
      active: false,
    },
  ]);

  return (
    <div className="mypage-content">
      <div className="mypage-title">
        <h2 className="">모임 수정</h2>
        <MySideMenu menus={menus} setMenus={setMenus} />
        <div className="current-content">
          <Routes>
            <Route
              path="groupMember"
              element={
                <GroupMember
                  memberList={memberList}
                  setMemberList={setMemberList}
                  grJoinList={grJoinList}
                  setGrJoinList={setGrJoinList}
                  groupNo={groupNo}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
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
export default GroupSetting;
