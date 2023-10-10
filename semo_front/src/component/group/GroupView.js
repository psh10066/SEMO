import { useEffect, useState } from "react";
import { Button2 } from "../util/Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./group.css";
import { Link } from "react-router-dom";

const GroupView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const groupNo = location.state.groupNo;
  const [group, setGroup] = useState({});
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/group/view/" + groupNo)
      .then((res) => {
        setGroup(res.data);
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
          console.log(res.data);
          setMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);
  const groupJoin = (props) => {
    const token = window.localStorage.getItem("token");
    axios.post(
      "/group/GroupJoin",
      { member, group },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  const [menus, setMenus] = useState([
    { url: "#", text: "아름님메뉴1", active: false },
    { url: "#", text: "아름님메뉴2", active: false },
    { url: "#", text: "성준님메뉴", active: false },
  ]);
  return (
    <div className="group-view-wrap">
      <div>
        <MySideMenu menus={menus} setMenus={setMenus} />
      </div>
      <div className="group-view-div-content">
        <div>
          <div className="group-view-thumbnail">
            {group.groupImg ? (
              <img src={"/group/" + group.groupImg} />
            ) : (
              <img src="/image/default.png" />
            )}
          </div>
          <div className="group-view-name">{group.groupName}</div>
          <div
            className="group-view-content"
            dangerouslySetInnerHTML={{ __html: group.groupContent }}
          ></div>
          <div className="group-view-meeting">
            <p>성준님 미팅 만든거 넣어주시면 됩니다</p>
          </div>
          <div className="group-view-category">
            <Link to="#">
              {group.groupCategory === 1
                ? "#문화·예술"
                : group.groupCategory === 2
                ? "#운동·액티비티"
                : "#푸드·드링크"}
            </Link>
            <Link to="#">
              {group.groupLocal === 1
                ? "#서울"
                : group.groupCategory === 2
                ? "#경기"
                : "#부산"}
            </Link>
          </div>
        </div>
        {isLogin ? (
          <div className="group-join-btn">
            <Button2 text="가입하기" clickEvent={groupJoin} />
          </div>
        ) : (
          " "
        )}
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
    <div className="group-view-tap">
      <div>
        {menus.map((menu, index) => {
          return (
            <div key={"menu" + index}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupView;
