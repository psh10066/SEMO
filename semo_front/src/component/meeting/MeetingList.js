import axios from "axios";
import { useEffect, useState } from "react";
import Kakao from "../util/Kakao";
import { Button1, Button2 } from "../util/Buttons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MeetingList = (props) => {
  const meeting = props.meeting;
  const index = props.index;
  const join = props.join;
  const member = props.member;
  const isLogin = props.isLogin;
  const isJoin = props.isJoin;
  const isAddMeet = props.isAddMeet;
  const setIsAddMeet = props.setIsAddMeet;
  const groupLevel = props.groupLevel;
  const groupNo = props.groupNo;
  const [joinMember, setJoinMember] = useState(0); //참여자 숫자
  const [joinStatus, setJoinStatus] = useState(-1); //참여 현황
  const [joinMemberNo, setJoinMemberNo] = useState([]); //참여한 맴버 번호
  const navigate = useNavigate();
  //모임의 약속에 참여하는 memberNo[] 조회
  useEffect(() => {
    if (member != null) {
      const token = window.localStorage.getItem("token");
      if (isLogin) {
        axios
          .post("/meeting/meetingMember", meeting, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setJoinMemberNo(res.data);
            if (res.data.length > 0) {
              const indexOf = res.data.indexOf(member.memberNo);
              setJoinStatus(indexOf);
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
    }
  }, [isAddMeet]);
  //참여수 보이기
  useEffect(() => {
    axios
      .get("/meeting/countMember/" + meeting.meetingNo)
      .then((res) => {
        setJoinMember(res.data);
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  }, [isAddMeet]);
  // 모임 약속 수정하기
  const modifyMeeting = () => {
    navigate("/meeting/modify", {
      state: { meeting: meeting },
      groupNo: groupNo,
    });
  };
  //모임 약속 참여 취소하기
  const cancelJoin = (meetingNo) => {
    Swal.fire({
      icon: "question",
      text: "모임 참석을 취소 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        const token = window.localStorage.getItem("token");
        axios
          .post(
            "/meeting/cancelJoin/",
            { meetingNo },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            if (res.data === 1) {
              setIsAddMeet(!isAddMeet);
              setJoinStatus(-1);
              Swal.fire({
                icon: "success",
                text: "취소 완료!",
              });
            }
          })
          .catch((error) => {
            console.log(error.response.status);
          });
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
  if (calculateDDay(new Date(meeting.meetingDate)) > -1) {
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
            <span className="material-icons">calendar_today</span>일시 :{" "}
            {formatUtcDate(new Date(meeting.meetingDate))}{" "}
          </div>
          <div className="meeting-price">
            <span className="price-icon">￦</span>금액 :{meeting.meetingPrice}{" "}
          </div>
          <div className="meeting-memberNum">
            <span className="material-icons">people</span>참여수 : {joinMember}{" "}
            / {meeting.meetingMaxnum}
          </div>
          <div className="meeting-place">
            <span className="material-icons">location_on</span>장소 :{" "}
            {meeting.meetingPlace}
            <p id="meeting-place-detail">{meeting.meetingPlaceDetail}</p>
            <Kakao data={meeting.meetingPlace} index={index} />
          </div>
          <div id="meeting-btn-area2">
            {isLogin &&
            isJoin &&
            (groupLevel === 1 || groupLevel === 2) &&
            joinStatus === -1 &&
            meeting.meetingMaxnum > joinMember ? (
              <Button1
                text="모임참가"
                clickEvent={() => {
                  join(meeting.meetingNo);
                }}
              />
            ) : isLogin &&
              isJoin &&
              (groupLevel === 1 || groupLevel === 2) &&
              meeting.meetingMaxnum > joinMember ? (
              <Button2
                text="취소"
                clickEvent={() => {
                  cancelJoin(meeting.meetingNo);
                }}
              />
            ) : (
              ""
            )}
            {isLogin && isJoin && groupLevel === 1 ? (
              <Button2
                text="모임수정"
                clickEvent={() => {
                  modifyMeeting(meeting.meetingNo);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default MeetingList;
