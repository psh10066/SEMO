import { useEffect, useState } from "react";
import { Button2 } from "../util/Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const GroupView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  //const groupNo = location.state.groupNo;
  const [group, setGroup] = useState({});
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/group/view/" /*+groupNo*/)
      .then((res) => {
        setGroup(res.data);
      })
      .catch((res) => {
        console.log(res.response.state);
      });
  });
  const groupJoin = () => {};
  return (
    <div>
      {isLogin ? (
        <div className="group-join-btn">
          <Button2 text="가입하기" clickEvent={groupJoin} />
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default GroupView;
