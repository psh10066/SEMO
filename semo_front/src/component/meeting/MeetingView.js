import axios from "axios";
import { useEffect, useState } from "react";
import Kakao from "../util/Kakao";
import { Button1, Button2, Button3 } from "../util/Buttons";
import { useNavigate } from "react-router";

const MeetingView = (props) => {
  const group = props.group;
  const groupNo = props.groupNo;
  const isLogin = props.isLogin;
  const isJoin = props.isJoin;
  const groupLevel = props.groupLevel;

  const [meetingList, setMeetingList] = useState([]);
  const navigate = useNavigate();
  const meetingCreate = () => {
    navigate("/meeting/create", { state: { groupNo: group.groupNo } });
  };

  useEffect(() => {
    axios
      .get("/meeting/view/" + groupNo)
      .then((res) => {
        setMeetingList(res.data);
      })
      .catch((res) => {
        // 오류 처리
      });
  }, [groupNo]);

  const calculateDDay = (targetDate) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // 현재 날짜의 시간을 00:00:00으로 설정
    targetDate.setHours(0, 0, 0, 0); // 대상 날짜의 시간을 00:00:00으로 설정

    const timeDiff = targetDate - currentDate;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

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

  const formatUtcDateSemi = (targetDate) => {
    const localDate = new Date(targetDate);
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();
    return `${month}월 ${day}일`;
  };

  return (
    <div>
      {meetingList.length > 0
        ? meetingList.map((meeting, index) => (
            <div className="meetingView-frm" key={index}>
              <h2 className="meetingView-title">정기 모임</h2>
              <div className="meetingView-content">
                <div>
                  <h3 className="meeting-Dday">
                    날짜 : {formatUtcDateSemi(new Date(meeting.meetingDate))}
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
