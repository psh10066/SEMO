import { Avatar, AvatarGroup } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GroupList = (props) => {
  const groupList = props.groupList;
  // console.log(groupList);
  return groupList.length === 0 ? (
    <div className="none-groupList-wrap">
      <div className="none-msg">
        <span className="material-icons">extension</span>
        <div className="none-msg-content">진행하는 모임이 없어요.</div>
      </div>
    </div>
  ) : (
    <div className="groupList-wrap">
      <div className="group-item-wrap">
        {groupList.map((group, index) => {
          return <GroupItem key={"feedGroupItem" + index} group={group} />;
        })}
      </div>
    </div>
  );
};

const GroupItem = (props) => {
  const group = props.group;
  const [peopleList, setPeopleList] = useState([]);
  const [peopleCount, setPeopleCount] = useState(0);
  const navigate = useNavigate();
  const groupView = () => {
    navigate("/group/view", { state: { groupNo: group.groupNo } });
  };
  useEffect(() => {
    axios
      .get("/group/groupPeopleList/" + group.groupNo)
      .then((res) => {
        // console.log(res.data);
        setPeopleList(res.data.peopleList);
        setPeopleCount(res.data.peopleCount);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    <div className="feed-group-item" onClick={groupView}>
      <div className="feed-group-img">
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
        <div className="feed-group-member">
          <div className="feed-like-person-wrap">
            <AvatarGroup max={7} total={peopleCount}>
              {peopleList.map((people, index) => {
                return people.peopelImg === null ? (
                  <Avatar
                    sx={{ width: 22, height: 22 }}
                    alt="Remy Sharp"
                    src="/image/person.png"
                  />
                ) : (
                  <Avatar
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
      </div>
    </div>
  );
};

export default GroupList;
