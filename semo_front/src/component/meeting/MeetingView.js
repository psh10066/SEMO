import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MeetingView = (props) => {
  const groupNo = props.groupNo;
  const [meeting, setMeeting] = useState({});
  const location = useLocation();

  // const meetingNo = location.state.meetingNo;
  // console.log("meetingNo : " + meetingNo);
  // console.log(meeting);
  console.log(meeting);
  useEffect(() => {
    axios
      .get("/meeting/view/" + groupNo)
      .then((res) => {
        setMeeting(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  // D-day 계산을 위한 함수
  const calculateDDay = (targetDate) => {
    const currentDate = new Date();
    const timeDiff = targetDate - currentDate;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };
  // D-day를 계산하고 표시

  const dDay = calculateDDay(new Date(meeting.meetingDate));
  console.log(dDay);
  return (
    <div className="meetingView-frm">
      <h2 className="meetingView-title">정기 모임</h2>
      <div className="meetingView-content">
        <div>
          <h3 className="meeting-Dday">
            날짜 : {meeting.meetingDate} <span>D - {dDay} </span>{" "}
          </h3>
          <div className="meeting-content">모임내용 : </div>
        </div>
        <div className="meeting-date">일시 : </div>
        <div className="meeting-price">금액 : </div>
        <div className="meeting-memberNum">참여수 : </div>
        <div className="meeting-place">장소API</div>
      </div>
    </div>
  );
};

export default MeetingView;
