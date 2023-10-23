import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import GroupMember from "./GroupMember";

const GroupSetting = () => {
  const [group, setGroup] = useState(null);
  const [memberList, setMemberList] = useState(null);
  const location = useLocation();
  const groupNo = location.state ? location.state.groupNo : null;
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    // group 불러오기
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
  return (
    <div>
      <div className="mypage-title">
        <h2 className="">모임 관리</h2>
        <div id="group-icon">
          <Link to="/group/modify" state={group !== null ? { group } : null}>
            <span className="material-icons">article</span>
            <span>모임 글 수정</span>
          </Link>
        </div>
        <div className="current-content">
          <Routes>
            <Route
              path="groupMember"
              element={
                <GroupMember
                  memberList={memberList}
                  // setMemberList={setMemberList}
                  // grJoinList={grJoinList}
                  // setGrJoinList={setGrJoinList}
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

export default GroupSetting;
