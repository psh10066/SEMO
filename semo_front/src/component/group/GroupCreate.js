import { useState } from "react";
import GroupFrm from "./GroupFrm";
import axios from "axios";
import Swal from "sweetalert2";

const GroupCreate = () => {
  const [groupName, setGroupName] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const [groupImg, setGroupImg] = useState(null);
  const [groupMaxnum, setGroupMaxnum] = useState(0);
  const [groupContent, setGroupContent] = useState("");
  const [groupCategory, setGroupCategory] = useState(0);
  const [groupLocal, setGroupLocal] = useState(0);

  const create = () => {
    if (
      groupName !== "" &&
      groupContent != "" &&
      groupMaxnum !== 0 &&
      groupCategory !== 0 &&
      groupLocal !== 0
    ) {
      const form = new FormData();
      form.append("groupName", groupName);
      form.append("thumbnail", thumbnail);
      form.append("groupMaxnum", groupMaxnum);
      form.append("groupContent", groupContent);
      form.append("groupCategory", groupCategory);
      form.append("groupLocal", groupLocal);
      axios
        .post("/group/create", form)
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire("입력값을 확인하세요.");
    }
  };

  return (
    <div>
      <div className="group-frm-title">모임 생성</div>
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
        type="write"
      />
    </div>
  );
};
export default GroupCreate;
