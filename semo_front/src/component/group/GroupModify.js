import { useLocation, useNavigate } from "react-router-dom";
import GroupFrm from "./GroupFrm";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import React from "react";

const GroupModify = () => {
  const location = useLocation();
  const group = location.state.group;
  const groupNo = group.groupNo;
  const [groupName, setGroupName] = useState(group.groupName);
  const [thumbnail, setThumbnail] = useState(group.thumbnail);
  const [groupImg, setGroupImg] = useState(group.groupImg);
  const [groupMaxnum, setGroupMaxnum] = useState(group.groupMaxnum);
  const [groupContent, setGroupContent] = useState(group.groupContent);
  const [groupCategory, setGroupCategory] = useState(group.groupCategory);
  const [groupLocal, setGroupLocal] = useState(group.groupLocal);
  const [chkGroupNameMsg, setChkGroupNameMsg] = useState("");
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  //그룹 맴버 관리 페이지로 이동
  const gotoSetting = () => {
    navigate(`/group/setting/groupMember/`, { state: { groupNo } });
  };
  const modify = () => {
    if (
      groupImg !== null &&
      groupName !== "" &&
      groupContent !== "" &&
      groupMaxnum !== 0 &&
      groupCategory !== 0 &&
      groupLocal !== 0 &&
      chkGroupNameMsg === "" &&
      groupContent !== "<p><br></p>"
    ) {
      const form = new FormData();
      form.append("groupNo", group.groupNo);
      form.append("groupName", groupName);
      form.append("thumbnail", thumbnail);
      form.append("groupMaxnum", groupMaxnum);
      form.append("groupContent", groupContent);
      form.append("groupCategory", groupCategory);
      form.append("groupLocal", groupLocal);
      form.append("groupImg", groupImg);
      axios
        .post("/group/modify", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data === 1) {
            Swal.fire({
              icon: "success",
              text: "수정이 완료되었습니다",
            });
            navigate("/group/view", { state: { groupNo } });
          } else {
            Swal.fire({
              icon: "warning",
              text: "수정 중 문제가 발생했습!",
            });
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({
        icon: "warning",
        text: "입력값을 확인해 주세요.",
      });
    }
  };
  return (
    <div className="groupcreate-all-wrap">
      <div className="page-title">
        <h2>모임 수정</h2>
      </div>
      <div id="icon-area">
        <span className="material-icons" onClick={gotoSetting}>
          settings
        </span>
      </div>
      <GroupFrm
        groupName={groupName}
        setGroupName={setGroupName}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        groupImg={groupImg}
        setGroupImg={setGroupImg}
        groupMaxnum={groupMaxnum}
        setGroupMaxnum={setGroupMaxnum}
        groupContent={groupContent}
        setGroupContent={setGroupContent}
        groupCategory={groupCategory}
        setGroupCategory={setGroupCategory}
        groupLocal={groupLocal}
        setGroupLocal={setGroupLocal}
        buttonEvent={modify}
        chkGroupNameMsg={chkGroupNameMsg}
        setChkGroupNameMsg={setChkGroupNameMsg}
        type="modify"
      />
    </div>
  );
};

export default GroupModify;
