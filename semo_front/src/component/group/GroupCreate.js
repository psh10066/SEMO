import { useEffect, useState } from "react";
import GroupFrm from "./GroupFrm";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const GroupCreate = (props) => {
  const [groupName, setGroupName] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const [groupImg, setGroupImg] = useState(null);
  const [groupMaxnum, setGroupMaxnum] = useState(0);
  const [groupContent, setGroupContent] = useState("");
  const [groupCategory, setGroupCategory] = useState(0);
  const [groupLocal, setGroupLocal] = useState(0);
  const [joinNum, setJoinNum] = useState(0);
  const [chkGroupNameMsg, setChkGroupNameMsg] = useState("");
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .post("/group/joinNum", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setJoinNum(res.data);
      })
      .catch((res) => {
        if (res.response.status === 403) {
          Swal.fire({
            title: "로그인이 필요한 서비스 입니다.",
            text: "로그인 페이지로 이동합니다.",
            icon: "info",
          }).then(() => {
            navigate("/login");
          });
        }
      });
  }, []);
  const create = () => {
    if (
      groupImg !== null &&
      groupName !== "" &&
      groupContent != "" &&
      groupContent != "<p><br></p>" &&
      groupMaxnum !== 0 &&
      groupCategory !== 0 &&
      groupLocal !== 0
      //&& chkGroupNameMsg == ""
    ) {
      const form = new FormData();
      form.append("groupName", groupName);
      form.append("thumbnail", thumbnail);
      form.append("groupMaxnum", groupMaxnum);
      form.append("groupContent", groupContent);
      form.append("groupCategory", groupCategory);
      form.append("groupLocal", groupLocal);

      if (joinNum === 3) {
        Swal.fire({
          icon: "error",
          text: "최대 모임 가입 가능 수는 3개입니다",
        });
      } else {
        axios
          .post("/group/create", form, {
            headers: {
              contentType: "multipart/form-data",
              processData: false,
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            navigate("/page");
          })
          .catch((res) => {
            if (res.response.status === 403) {
              Swal.fire({
                title: "로그인이 필요한 서비스 입니다.",
                text: "로그인 페이지로 이동합니다.",
                icon: "info",
              }).then(() => {
                navigate("/login");
              });
            }
          });
      }
    } else {
      Swal.fire({
        icon: "warning",
        text: "입력값을 확인해 주세요.",
      });
    }
  };

  return (
    <>
      <div className="groupcreate-all-wrap">
        <div className="page-title">
          <h2>모임 생성</h2>
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
          buttonEvent={create}
          chkGroupNameMsg={chkGroupNameMsg}
          setChkGroupNameMsg={setChkGroupNameMsg}
          type="write"
        />
      </div>
    </>
  );
};
export default GroupCreate;
