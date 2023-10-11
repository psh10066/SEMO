import { useEffect, useState } from "react";
import { Button2 } from "../util/Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./group.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MeetingView from "../meeting/MeetingView";
import GroupProFile from "./GroupProfile";

const GroupView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const groupNo = location.state.groupNo;
  const [isJoin, setIsJoin] = useState(false);
  const [group, setGroup] = useState({});
  const [member, setMember] = useState(null);
  const [groupLevel, setGroupLevel] = useState(0);
  const [changeLevel, setChangeLevel] = useState(true);
  const [meetingList, setMeetingList] = useState([]);
  const navigate = useNavigate();
  const [joinNum, setJoinNum] = useState(0);

  useEffect(() => {
    axios
      .get("/group/view/" + groupNo)
      .then((res) => {
        setGroup(res.data);
      })
      .catch((error) => {
        console.log(error.response.status);
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
          setMember(res.data);
          if (res.data !== null) {
            axios
              .post(
                "/group/joinState",
                { groupNo },
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
              .then((res) => {
                if (res.data === 1) {
                  setIsJoin(true);
                }
              });
            axios
              .post(
                "/group/groupLevelState",
                { groupNo },
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
              .then((res) => {
                // console.log(res.data);
                setGroupLevel(res.data);
              });
            axios
              .post("/group/joinNum", null, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
              .then((res) => {
                // console.log(res.data);
                setJoinNum(res.data);
              });
          }
        })
        .catch((error) => {
          console.log(error.response.status);
        });
    }
  }, [changeLevel, isLogin]);

  const groupExit = () => {
    const token = window.localStorage.getItem("token");
    const groupNo = group.groupNo;
    axios
      .post(
        "/group/groupExit",
        {
          groupNo,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: "error",
          text: "탈퇴완료!",
        });
        setChangeLevel(!changeLevel);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const groupJoin = () => {
    const token = window.localStorage.getItem("token");
    const groupNo = group.groupNo;
    if (joinNum === 3) {
      Swal.fire({
        icon: "error",
        text: "최대 모임 가입 가능 수는 3개입니다",
      });
    } else {
      axios
        .post(
          "/group/groupJoin",
          {
            groupNo,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: "가입완료!",
          });
          setChangeLevel(!changeLevel);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [menus, setMenus] = useState([
    {
      url: "http://localhost:3000/groupBoard",
      text: "아름님메뉴1",
      active: false,
    },
    {
      url: "http://localhost:3000/groupPhoto",
      text: "아름님메뉴2",
      active: false,
    },
    { url: "/meeting/create", text: "정모 만들기", active: false },
  ]);

  useEffect(() => {
    // 이 부분에서 selectMeeting 함수를 호출
    selectMeetingList();
  }, [groupNo]);

  const selectMeetingList = () => {
    if (meetingList) {
      axios
        .get("/meeting/view/" + groupNo)
        .then((res) => {
          // console.log(res.data);
          setMeetingList(res.data);
          // console.log(meetingList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="group-view-wrap">
      <div>
        <MySideMenu menus={menus} setMenus={setMenus} />
      </div>
      <div className="group-view-div-content">
        <div>
          <div className="group-view-thumbnail">
            {group.groupImg ? (
              <img src={"/group/" + group.groupImg} alt="Group Thumbnail" />
            ) : (
              <img src="/image/default.png" alt="Default Thumbnail" />
            )}
          </div>
          <div className="group-view-name">{group.groupName}</div>
          <div
            className="group-view-content"
            dangerouslySetInnerHTML={{ __html: group.groupContent }}
          ></div>
          <div className="group-view-member"></div>
          {meetingList.map((meeting, index) => {
            return <MeetingView key={"meeting" + index} groupNo={groupNo} />;
          })}
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
        {isLogin && isJoin !== true && joinNum < 4 && groupLevel === 0 ? (
          <div className="group-join-btn">
            <Button2 text="가입하기" clickEvent={groupJoin} />
          </div>
        ) : groupLevel === 2 ? (
          <div className="group-join-btn">
            <Button2 text="탈퇴하기" clickEvent={groupExit} />
          </div>
        ) : groupLevel === 3 ? (
          <div className="group-join-btn">
            <Button2 text="가입대기" />
          </div>
        ) : groupLevel === 1 ? (
          <div className="group-join-btn">
            <Button2 text="모임해산" />
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
    const updatedMenus = menus.map((menu, i) => ({
      ...menu,
      active: i === index,
    }));
    setMenus(updatedMenus);
  };

  return (
    <div className="group-view-tap">
      <div>
        {menus.map((menu, index) => (
          <div key={"menu" + index}>
            <Link
              to={menu.url}
              className={menu.active ? "active-side" : ""}
              onClick={() => {
                activeTab(index);
              }}
            >
              {menu.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupView;
