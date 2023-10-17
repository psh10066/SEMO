import { useEffect, useState } from "react";
import { Button2 } from "../util/Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./group.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MeetingView from "../meeting/MeetingView";
import GroupSave from "./GroupSave";
import { Avatar, AvatarGroup } from "@mui/material";

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
  const [groupSave, setGroupSave] = useState(false);
  const [peopleCount, setPeopleCount] = useState(0);
  const [peopleList, setPeopleList] = useState([]);

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
        setGroupSave(res.data.groupSave);
        axios
          .get("/group/groupPeopleList/" + groupNo)
          .then((res) => {
            console.log(res.data);
            setPeopleList(res.data.peopleList);
            setPeopleCount(res.data.peopleCount);
          })
          .catch((res) => {
            console.log(res.response.status);
          });
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
                setGroupLevel(res.data);
              });
            axios
              .post("/group/joinNum", null, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
              .then((res) => {
                setJoinNum(res.data);
              });
          }
        })
        .catch((error) => {
          console.log(error.response.status);
        });
    }
  }, [changeLevel, isLogin]);
  const clickAvatarHandler = (memberNo) => {
    navigate("/feed/profile/", { state: { memberNo: memberNo } });
  };
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
  const cancelGroup = () => {
    const token = window.localStorage.getItem("token");
    Swal.fire({
      icon: "warning",
      text: "가입을 취소하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "가입취소",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
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
              icon: "success",
              text: "가입취소완료!",
            });
            setChangeLevel(!changeLevel);
          })
          .catch((res) => {
            console.log(res);
          });
      }
    });
  };
  const deleteGroup = () => {
    const token = window.localStorage.getItem("token");
    Swal.fire({
      icon: "warning",
      text: "모임을 해체하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "해산하기",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios.get("/group/deleteGroup/" + group.groupNo).then((res) => {
          if (res.data === 1) {
            Swal.fire({
              icon: "success",
              title: "모임이 사라졌습니다 ㅠㅠ",
            });
            navigate("/page");
          }
        });
      }
    });
  };

  const groupJoin = () => {
    const token = window.localStorage.getItem("token");
    const groupNo = group.groupNo;
    Swal.fire({
      icon: "warning",
      text: "모임에 가입하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "가입하기",
      cancelButtonText: "취소",
    }).then((res) => {
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
    });
    console.log(groupLevel);
  };

  const [menus, setMenus] = useState([
    {
      url: "/groupBoard",
      text: "게시판",
      active: false,
    },
    {
      url: "/groupPhoto",
      text: "사진첩",
      active: false,
    },
  ]);

  useEffect(() => {
    if (!meetingList) {
      axios
        .get("/meeting/view/" + groupNo)
        .then((res) => {
          setMeetingList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [groupNo]);

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
          <GroupSave
            groupNo={groupNo}
            groupSave={groupSave}
            setGroupSave={setGroupSave}
          />
          <div
            className="group-view-content"
            dangerouslySetInnerHTML={{ __html: group.groupContent }}
          ></div>
          <div className="group-view-member">
            <div className="feed-like-person-wrap">
              <AvatarGroup max={7} total={peopleCount}>
                {peopleList.map((people, index) => {
                  let memberNo = people.memberNo;
                  return people.peopelImg === null ? (
                    <Avatar
                      onClick={() => {
                        clickAvatarHandler(memberNo);
                      }}
                      sx={{ width: 44, height: 44 }}
                      alt="논"
                      src="/image/person.png"
                    ></Avatar>
                  ) : (
                    <Avatar
                      onClick={() => {
                        clickAvatarHandler(memberNo);
                      }}
                      sx={{ width: 44, height: 44 }}
                      alt="멤"
                      src={"/member/" + people.memberImg}
                    ></Avatar>
                  );
                })}
              </AvatarGroup>
            </div>
          </div>
          <MeetingView
            group={group}
            groupNo={groupNo}
            isLogin={isLogin}
            isJoin={isJoin}
            member={member}
            groupLevel={groupLevel}
          />
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
            <Button2 text="가입대기" clickEvent={cancelGroup} />
          </div>
        ) : groupLevel === 1 ? (
          <div className="group-join-btn">
            <Button2 text="모임해산" clickEvent={deleteGroup} />
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
