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
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);
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
      <div className="group-view-wrap">
        <div className="group-name">{group.name}</div>
        <div className="group-thumbnail">
          {group.groupImg ? (
            <img src={"/group/" + group.group.Img} />
          ) : (
            <img src="/image/default.png" />
          )}
        </div>
        <div className="group-content">{group.content}</div>
      </div>
    </div>
  );
};

export default GroupView;
