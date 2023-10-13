import axios from "axios";
import { useEffect, useState } from "react";
import Kakao from "../util/Kakao";
import { Button1, Button2, Button3 } from "../util/Buttons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MeetingView = (props) => {
  const group = props.group;
  const groupNo = props.groupNo;
  const isLogin = props.isLogin;
  const isJoin = props.isJoin;
  const member = props.member;
  const groupLevel = props.groupLevel;

  // const memberNo = member.memberNo;
  const [meetingList, setMeetingList] = useState([]);
  const [meetingJoin, setMeetingJoin] = useState([]);
  const navigate = useNavigate();

  // 모임 생성
  const meetingCreate = () => {
    navigate("/meeting/create", { state: { groupNo: group.groupNo } });
  };

  // const join = (meetingNo) => {
  //   console.log(meetingNo);
  //   Swal.fire({
  //     icon: "question",
  //     text: "모임에 가입하시겠습니까?",
  //     showCancelButton: true,
  //     confirmButtonText: "확인",
  //     cancelButtonText: "취소",
  //   }).then((res) => {
  //     if (res.isConfirmed) {
  //       const token = window.localStorage.getItem("token");
  //       axios
  //         .post(
  //           `/meeting/join`,
  //           { meetingNo, memberNo },
  //           {
  //             headers: {
  //               Authorization: "Bearer " + token,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           console.log(res.data);
  //         })
  //         .catch((error) => {
  //           console.log(error.response.status);
  //         });
  //     }
  //   });
  // };

  // 모임 보이기
  useEffect(() => {
    axios
      .get("/meeting/view/" + groupNo)
      .then((res) => {
        setMeetingList(res.data);
      })
      .catch((res) => {
        // 오류 처리
        console.log(res.response.error);
      });
    // axios
    //   .get("/meeting/select/")
    //   .then((res) => {
    //     setMeetingJoin(res.data);
    //   })
    //   .catch((res) => {
    //     console.log(res.response.error);
    //   });
  }, [groupNo]);

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
    <div className="meetingView-wrap">
      <h2 className="meetingView-title">정기 모임</h2>
      {meetingList.length > 0
        ? meetingList.map((meeting, index) => (
            <div className="meetingView-frm" key={index}>
              <div className="meetingView-content">
                <div>
                  <h3 className="meeting-Dday">
                    날짜 : {justDate(new Date(meeting.meetingDate))}
                    <span>
                      D - {calculateDDay(new Date(meeting.meetingDate))}
                    </span>
                  </h3>
                  <div className="meeting-content">
                    모임내용 : {meeting.meetingName}
                  </div>
                </div>
                <div className="meeting-date">
                  일시 : {formatUtcDate(new Date(meeting.meetingDate))}{" "}
                </div>
                <div className="meeting-price">
                  금액 :{meeting.meetingPrice}{" "}
                </div>
                <div className="meeting-memberNum">
                  참여수 : {meeting.meetingMember} / {meeting.meetingMaxnum}
                </div>
                <div className="meeting-place">
                  장소 : {meeting.meetingPlace}
                  <Kakao data={meeting.meetingPlace} index={index} />
                </div>
                {/* {memberNo != null ? (
                  <Button1
                    text="모임참가"
                    clickEvent={() => {
                      // join(meeting.meetingNo);
                    }}
                  />
                ) : (
                  ""
                )} */}
              </div>
            </div>
          ))
        : ""}
      {groupLevel == 1 ? (
        <div id="meeting-btn-area">
          <Button3 text="정모 만들기" clickEvent={meetingCreate} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MeetingView;
