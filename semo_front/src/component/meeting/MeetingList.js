import axios from "axios";
import { useEffect, useState } from "react";
import Kakao from "../util/Kakao";
import { Button1, Button2, Button3 } from "../util/Buttons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MeetingList = (props) => {
  const meeting = props.meeting;
  const index = props.index;
  const join = props.join;
  const member = props.member;
  const isLogin = props.isLogin;
  const isJoin = props.isJoin;
  const meetingJoin = props.meetingJoin;

  const [joinMember, setJoinMember] = useState(0);
  // const [meetingJoin, setMeetingJoin] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/meeting/countMember/" + meeting.meetingNo)
      .then((res) => {
        setJoinMember(res.data);
      })
      .catch((error) => {
        console.log(error.response.status);
      });
    // if (meetingJoin != null) {
    //   axios
    //     .get("/meeting/meetingMember/" + meeting.meetingNo)
    //     .then((res) => {
    //       setMeetingJoin(res.data);
    //       console.log(res.data);
    //     })
    //     .catch((error) => {
    //       console.log(error.response.status);
    //     });
    // }
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("/meeting/meetingJoin/" + meeting.meetingNo)
  //     .then((res) => {
  //       setMeetingJoin(res.data);
  //       // console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.status);
  //     });
  // }, []);

  //약속 참여 취소하기
  const cancelJoin = (meetingNo) => {
    Swal.fire({
      icon: "question",
      text: "모임 참석을 취소 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (member.memberNo != null) {
        if (res.confirmed) {
          axios
            .get("/meeting/cancel/" + meetingNo)
            .then((res) => {
              if (res.data === 1) {
              }
            })
            .catch((res) => {
              console.log(res.response.status);
            });
        }
      }
    });
  };

  // D-Day설정 함수
  const calculateDDay = (targetDate) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // 현재 날짜의 시간을 00:00:00으로 설정
    targetDate.setHours(0, 0, 0, 0); // 대상 날짜의 시간을 00:00:00으로 설정
    const timeDiff = targetDate - currentDate;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

  //UTC 시간정보를 현지시간으로 변환하는 함수
  const formatUtcDate = (targetDate) => {
    const localDate = new Date(targetDate);
    const year = localDate.getFullYear() % 100;
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();
    const hours = localDate.getHours();
    const minutes = localDate.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}:${formattedMinutes}`;
  };

  //날짜만 보이게(형식: xx월 xx일)
  const justDate = (targetDate) => {
    const localDate = new Date(targetDate);
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();
    return `${month}월 ${day}일`;
  };
  return (
    <div className="meetingView-frm">
      <div className="meetingView-content">
        <div>
          <h3 className="meeting-Dday">
            날짜 : {justDate(new Date(meeting.meetingDate))}
            <span>D - {calculateDDay(new Date(meeting.meetingDate))}</span>
          </h3>
          <div className="meeting-content">
            모임내용 : {meeting.meetingName}
          </div>
        </div>
        <div className="meeting-date">
          일시 : {formatUtcDate(new Date(meeting.meetingDate))}{" "}
        </div>
        <div className="meeting-price">금액 :{meeting.meetingPrice} </div>
        <div className="meeting-memberNum">
          참여수 : {joinMember} / {meeting.meetingMaxnum}
        </div>
        <div className="meeting-place">
          장소 : {meeting.meetingPlace}
          <Kakao data={meeting.meetingPlace} index={index} />
        </div>
        {isLogin && isJoin ? (
          <Button1
            text="모임참가"
            clickEvent={() => {
              join(meeting.meetingNo);
            }}
          />
        ) : (
          <Button2
            text="취소"
            clickEvent={() => {
              cancelJoin(meeting.meetingNo);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MeetingList;
