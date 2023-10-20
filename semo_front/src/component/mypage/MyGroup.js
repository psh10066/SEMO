import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3 } from "../util/Buttons";
import { Avatar, AvatarGroup } from "@mui/material";

const MyGroup = (props) => {
  const member = props.member;
  const memberNo = member.memberNo;
  const [groupList, setGroupList] = useState([]);

  //내가 참여하고있는 그룹
  useEffect(() => {
    axios
      .get("/report/mygroup/" + memberNo)
      .then((res) => {
        setGroupList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [member]);

  return (
    <div className="mylikeWrap">
      <div className="mylikeWrap-item-wrap">
        {groupList.map((group, index) => {
          return (
            <GroupItem key={"group" + index} group={group} member={member} />
          );
        })}
      </div>
    </div>
  );
};

const GroupItem = (props) => {
  const group = props.group;
  const member = props.member;
  const navigate = useNavigate();

  const [peopleList, setPeopleList] = useState([]);
  const [peopleCount, setPeopleCount] = useState(0);
  const groupView = () => {
    navigate("/group/view", { state: { groupNo: group.groupNo } });
  };
  useEffect(() => {
    axios
      .get("/group/groupPeopleList/" + group.groupNo)
      .then((res) => {
        setPeopleList(res.data.peopleList);
        setPeopleCount(res.data.peopleCount);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  //그룹신고
  const GroupReport = () => {
    navigate("mypageReport", {
      state: { group: group, member: member },
    });
  };
  return (
    <div className="mygroup-wrap">
      <div className="mylike-group-item" onClick={groupView}>
        <div className="mylike-group-img">
          <img src={"/group/" + group.groupImg} />
        </div>
        <div className="feed-group-right">
          <div className="feed-group-category">
            <Link to="#">
              {group.groupCategory === 1
                ? "#문화·예술"
                : group.groupCategory === 2
                ? "#운동·액티비티"
                : "#푸드·드링크"}
            </Link>
          </div>
          <div className="feed-group-name">{group.groupName}</div>
          <div className="feed-group-local">
            <span className="material-icons">location_on</span>
            {group.groupLocal === 1
              ? "서울"
              : group.groupLocal === 2
              ? "경기"
              : "부산"}
          </div>
          <div className="feed-group-member" style={{ width: "516px" }}>
            <div style={{ display: "flex", width: "82.5%" }}>
              <div
                className="feed-like-person-wrap"
                style={{ justifyContent: "flex-end" }}
              >
                <AvatarGroup max={7} total={peopleCount}>
                  {peopleList.map((people, index) => {
                    return people.peopelImg === null ? (
                      <Avatar
                        key={"groupAvatar" + index}
                        sx={{ width: 22, height: 22 }}
                        alt="Remy Sharp"
                        src="/image/person.png"
                      />
                    ) : (
                      <Avatar
                        key={"groupAvatar" + index}
                        sx={{ width: 22, height: 22 }}
                        alt="Remy Sharp"
                        src={"/member/" + people.memberImg}
                      />
                    );
                  })}
                </AvatarGroup>
              </div>
              <div className="feed-group-maxNum">
                <span className="material-icons">groups</span>
                {peopleCount}/{group.groupMaxnum}
              </div>
            </div>
            <div className="reportzone">
              <button className="reportBtn" onClick={GroupReport}>
                모임 신고하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyGroup;
