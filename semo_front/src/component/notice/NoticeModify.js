import { useLocation } from "react-router-dom";
import "./notice.css";

const NoticeModify = () => {
  const location = useLocation();
  //console.log(location);
  const notice = location.state.notice;
  console.log(notice);

  return <div>NoticeModify</div>;
};

export default NoticeModify;
