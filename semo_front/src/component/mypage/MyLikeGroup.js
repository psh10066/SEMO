import { Avatar, AvatarGroup } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyLikeGroup = (props) => {
  const navigate = useNavigate();
  const member = props.member;
  const [group, setGroup] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(3); // 더보기

  useEffect(() => {
    axios
      .post("/group/myLikeGroup", member)
      .then((res) => {
        setGroup(res.data);
      })
      .catch((res) => {
        // console.log("catch2: " + res.response.status); 문제생기면 500에러 떴을때 메인페이지
      });
    // console.log(group);
  }, []);

  return (
    <div className="mylikeWrap" style={{ paddingRight: "150px" }}>
      <div className="mylikeWrap-item-wrap">
        {group.slice(0, itemsToShow).map((group, index) => {
          //그룹 3개만 보여주기
          return <MypageItem key={"GroupItem" + index} group={group} />;
        })}
        <div className="myLikeMore">
          {group.length > itemsToShow && (
            <button
              className="myLikeMore-btn"
              onClick={() => setItemsToShow(itemsToShow + 3)}
            >
              <h4>더보기</h4>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
const MypageItem = (props) => {
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
        setPeopleList(res.data.peopleList);
        setPeopleCount(res.data.peopleCount);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    //내가 찜한 그룹
    <div className="mylike-group-item" onClick={groupView}>
      <div className="mylike-group-img">
        {group.groupImg ? (
          <img src={"/group/" + group.groupImg} alt="Group Thumbnail" />
        ) : (
          <img src="/image/default.png" alt="Default Thumbnail" />
        )}
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

export default MyLikeGroup;
