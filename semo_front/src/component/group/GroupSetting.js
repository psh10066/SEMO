import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const GroupSetting = () => {
  const [group, setGroup] = useState({});
  const [grJoin, setGrJoin] = useState({});
  const location = useLocation();
  const groupNo = location.state.groupNo;

  console.log(group);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .get("/group/view/" + groupNo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setGroup(res.data);
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  }, []);

  const [menus, setMenus] = useState([
    {
      url: "/",
      text: "회원관리",
      active: false,
    },
    {
      url: "/",
      text: "모임정보 수정",
      active: false,
    },
  ]);

  return (
    <div className="mypage-title">
      <h2 className="">모임 수정</h2>
      <MySideMenu menus={menus} setMenus={setMenus} />
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
