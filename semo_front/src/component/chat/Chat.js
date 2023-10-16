import "./chat.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ChatRoom from "./ChatRoom";
import ChatInfo from "./ChatInfo";

const Chat = (props) => {
  const navigate = useNavigate();
  const isLogin = props.isLogin;
  const token = window.localStorage.getItem("token");

  //로그인한 유저 (이름) 불러오기
  const [member, setMember] = useState({});
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

  //채팅방이름 불러오기 == 그룹이름
  const [roomName, setRoomName] = useState([]);
  //채팅방 주소(랩핑) == 그룹넘버
  const [chatHostAddress, setChatHostAddress] = useState([]);
  useEffect(() => {
    axios
      .post(
        "/group/groupChatRoomName", //객체로 그룹이름,그룹넘버 불러옴
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setRoomName(res.data.map((item) => item.groupName));
        setChatHostAddress(res.data.map((item) => item.groupNo));
        setSelectedGroupNumber(res.data.map((item) => item.groupNo)[0]);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  //그룹에 있는 모든 멤버들 불러오기
  const [groupAllMemberNo, setGroupAllMemberNo] = useState([]); //모든 멤버 번호
  const [groupAllMemberName, setGroupAllMemberName] = useState([]); //모든 멤버 이름
  const [selectedGroupNumber, setSelectedGroupNumber] = useState(0); //탭 클릭시 전달받은 그룹번호

  const groupNumber = (number) => {
    setSelectedGroupNumber(number);
  };

  useEffect(() => {
    axios
      .post(
        "/group/groupAllMember",
        { groupNo: selectedGroupNumber },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setGroupAllMemberNo(res.data.map((item) => item.memberNo));
        setGroupAllMemberName(res.data.map((item) => item.memberName));
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [selectedGroupNumber]); //탭한 그룹이 바뀔때마다
  const chatTap = () => {
    navigate("/chat/rooms");
  };

  return (
    <div className="chat-wrap">
      <div className="chat-wrap2">
        <div className="chat-list">
          <div className="chat-myname">
            <span className="chat-myname-text">{member.memberName}</span>
          </div>
          {/*채팅방 주소 연결*/}
          {roomName.map((name, index) => (
            <div
              className="chatEnter"
              key={index}
              onClick={(e) => {
                groupNumber(chatHostAddress[index]);
                chatTap(e);
              }}
            >
              {name}
            </div>
          ))}
        </div>
        <div className="chat-room">
          <Routes>
            <Route path="chatInfo" element={<ChatInfo />} />
            <Route
              path="rooms/*"
              element={
                <ChatRoom
                  groupAllMemberNo={groupAllMemberNo}
                  groupAllMemberName={groupAllMemberName}
                  senderName={member.memberName}
                  roomId={selectedGroupNumber}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Chat;
