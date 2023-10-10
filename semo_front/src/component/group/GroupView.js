import { useEffect, useState } from "react";
import { Button2 } from "../util/Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./group.css";

const GroupView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const groupNo = location.state.groupNo;
  const [group, setGroup] = useState({});
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/group/view/" + groupNo)
      .then((res) => {
        setGroup(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
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
          console.log(res.data);
          setMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);
  const groupJoin = (props) => {
    const token = window.localStorage.getItem("token");
    axios.post(
      "/group/GroupJoin",
      { member, group },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <div className="group-view-wrap">
      <div>
        <div className="group-view-name">{group.groupName}</div>
        <div className="group-view-thumbnail">
          {group.groupImg ? (
            <img src={"/group/" + group.groupImg} />
          ) : (
            <img src="/image/default.png" />
          )}
        </div>
        <div
          className="group-view-content"
          dangerouslySetInnerHTML={{ __html: group.groupContent }}
        ></div>
      </div>
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
