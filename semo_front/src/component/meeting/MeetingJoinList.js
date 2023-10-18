import axios from "axios";
import { useEffect, useState } from "react";

const MeetingJoinList = (props) => {
  const member = props.member;
  const meeting = props.meeting;
  // console.log(meeting.meetingNo);
  const [meetingJoinNo, setMeetingJoinNo] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("/meeting/selectMember/" + meeting.meetingNo)
  //     .then((res) => {
  //       console.log(res.data);
  //       setMeetingJoinNo(res.data);
  //     })
  //     .catch((res) => {
  //       console.log(res.response.error);
  //     });
  // }, [meeting.meetingNo]);
};

export default MeetingJoinList;
