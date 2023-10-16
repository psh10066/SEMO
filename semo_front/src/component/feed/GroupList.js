import { Link, useNavigate } from "react-router-dom";

const GroupList = (props) => {
  const groupList = props.groupList;
  console.log(groupList);
  return (
    <div className="groupList-wrap">
      <div className="group-item-wrap">
        {groupList.map((group, index) => {
          return <GroupItem key={"feedGroup" + index} group={group} />;
        })}
      </div>
    </div>
  );
};

const GroupItem = (props) => {
  const group = props.group;
  const navigate = useNavigate();
  const groupView = () => {
    navigate("/group/view", { state: { groupNo: group.groupNo } });
  };
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
          <span class="material-icons">location_on</span>
          {group.groupLocal === 1
            ? "서울"
            : group.groupLocal === 2
            ? "경기"
            : "부산"}
        </div>
        <div className="feed-group-maxNum">
          <span class="material-icons">groups</span>
          {group.groupMaxnum}
        </div>
      </div>
    </div>
  );
};

export default GroupList;
