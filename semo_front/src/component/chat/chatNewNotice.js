import axios from "axios";
import { useEffect, useState } from "react";

const ChatNewNotice = (props) => {
  const roomId = props.roomId; //채팅방 넘버 불러오기
  const memberNo = props.memberNo; //로그인한 회원번호
  const token = window.localStorage.getItem("token");

  const [mychatTime, setMyChatTime] = useState(""); //내가 읽은 채팅 중에 가장 최근 시간
  //mychatTime은 내가 "지난대화보기"를 클릭하고 > 채팅방을 나갔을때 , 자동으로 시간(웹소켓 소실 시간) 세팅 됨
  //지난대화보기를 클릭 안했을경우 New 안사라짐.
  //웹소켓 소실 시간을 세팅해서 (내가 마지막까지 채팅한 경우는 해당 안됨 )
  const [totalChatTime, setTotalChatTime] = useState(""); //전체 채팅 타임중에 가장 최신 채팅 시간

  useEffect(() => {
    axios
      .post(
        "/chat/mychatTime",
        { roomId: roomId, memberNo: memberNo },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setMyChatTime(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [roomId]);

  useEffect(() => {
    axios
      .post(
        "/chat/totalChatTime",
        { roomId: roomId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setTotalChatTime(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [roomId]);

  return (
    <>
      {mychatTime < totalChatTime ? <span className="chatAlarm">New</span> : ""}
    </>
  );
};
export default ChatNewNotice;
