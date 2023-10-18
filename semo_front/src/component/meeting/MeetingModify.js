import { useLocation } from "react-router-dom";

const MeetingModify = () => {
  const location = useLocation();
  const meeting = location.state.meeting;
  console.log(meeting);
};

export default MeetingModify;
