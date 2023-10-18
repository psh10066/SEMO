import "./chat.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ChatRoom from "./ChatRoom";
import ChatInfo from "./ChatInfo";
import ChatToggle from "./ChatToggle";

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

  //모든 채팅방이름 불러오기 == 그룹이름 : 내가 속해있는 모임
  const [roomName, setRoomName] = useState([]);
  //모든 채팅방 넘버 == 그룹넘버 : 내가 속해있는 모임
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
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  ///////////////////////////////////////////////////
  const [groupAllMemberName, setGroupAllMemberName] = useState([]); //모든 멤버 이름
  const [groupAllMemberType, setGroupAllMemberType] = useState([]); //모든 멤버 등급

  const [selectedGroupNumber, setSelectedGroupNumber] = useState(0); //내가 탭한 그룹 번호
  const [selectedgroupName, selectedGroupName] = useState(""); //내가 탭한 그룹 이름

  useEffect(() => {
    //그룹에 있는 모든 멤버들 불러오기
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
        // grJoinType이 3인 회원은 모임승인대기상태
        // grJoinType이 3이 아닌 회원만 필터링
        const filteredMembers = res.data.filter(
          (item) => item.grJoinType !== 3
        );
        setGroupAllMemberName(filteredMembers.map((item) => item.memberName));
        setGroupAllMemberType(filteredMembers.map((item) => item.grJoinType));

        // 로그인한 사용자의 grJoinType 값이 3인지 확인
        const loggedInUserType = res.data.find(
          (item) => item.memberName === member.memberName
        )?.grJoinType;
        if (loggedInUserType === 3) {
          Swal.fire({
            title: "모임 가입 대기 상태입니다.",
            text: "메인 페이지로 이동합니다.",
            icon: "info",
          }).then(() => {
            navigate("/");
          });
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [selectedGroupNumber]);

  //탭 안했으면 채팅-메인으로 이동
  useEffect(() => {
    if (selectedGroupNumber === 0) {
      navigate("/chat/chatInfo", { replace: true });
    }
  }, []);

  //탭 클릭이벤트
  const groupNumber = (number) => {
    setSelectedGroupNumber(number);
  };
  const groupName = (name) => {
    selectedGroupName(name);
  };

  //탭한 그룹이 바뀔때마다
  const chatTap = () => {
    navigate("/chat/rooms");
  };

  return (
    <div className="chat-wrap">
      <div className="chat-wrap2">
        <div className="chat-list">
          <div className="chat-myname">
            <div className="chat-myname-text">{member.memberName}</div>
          </div>
          {/*채팅방 주소 연결*/}
          {roomName.map((name, index) => (
            <div
              className="chatEnter"
              key={index}
              onClick={(e) => {
                groupNumber(chatHostAddress[index]);
                groupName(roomName[index]);
                chatTap(e);
              }}
            >
              <div>{name}</div>
            </div>
          ))}
        </div>
        <div className="chat-room">
          <Routes>
            <Route path="chatInfo" element={<ChatInfo />} />
            {selectedGroupNumber !== 0 && (
              <Route
                path="rooms/*"
                element={
                  <ChatRoom
                    groupAllMemberName={groupAllMemberName}
                    groupAllMemberType={groupAllMemberType}
                    senderName={member.memberName}
                    roomId={selectedGroupNumber}
                    memberNo={member.memberNo}
                    groupName={selectedgroupName}
                  />
                }
              />
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Chat;
