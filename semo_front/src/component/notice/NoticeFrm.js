import "./notice.css";

const NoticeFrm = (props) => {
  const noticeTitle = props.noticeTitle;
  const setNoticeTitle = props.setNoticeTitle;
  const noticeContent = props.noticeContent;
  const setNoticeContent = props.setNoticeContent;

  return (
    <div className="notice-frm-wrap">
      <div className="notice-frm-top">
        <div className="notice-title"></div>
      </div>
    </div>
  );
};

export default NoticeFrm;
