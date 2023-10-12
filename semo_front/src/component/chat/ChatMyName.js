import "./chat.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ChatMyName = () => {
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});

  //멤버 이름 불러오기
  useEffect(() => {
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
        if (res.response.status === 403) {
          console.log(res.response.status);
        }
      });
  }, []);

  return (
    <div className="chat-myname">
      <span className="chat-myname-text">{member.memberName}</span>
    </div>
  );
};
export default ChatMyName;
