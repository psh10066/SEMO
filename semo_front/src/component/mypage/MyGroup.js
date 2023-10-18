import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button2 } from "../util/Buttons";

const MyGroup = (props) => {
  const member = props.member;
  const [group, setGroup] = useState([]);
  const navigate = useNavigate();
  const memberNo = member.memberNo;

  useEffect(() => {
    axios
      .get("/report/myGroup/" + memberNo)
      .then((res) => {
        console.log(res.data);
        //setGroup(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  /*
  const GroupReport = () => {
    navigate("mypagereport", {
      state: { group: group, member: member },
    });
  };
  */

  return (
    <div>
      {/* 
      내가 참여하고 있는 그룹
      <Button2 text="신고하기" clickEvent={GroupReport} />
      <div className="group-report-btn" onClick={GroupReport}>
        신고하기
      </div>
      */}
    </div>
  );
};

export default MyGroup;
