import "./notice.css";
import Input from "../util/InputFrm";
import NoticeTextEditor from "../util/NoticeTextEditor";
import { Button2 } from "../util/Buttons";
import NoticeWrite from "./NoticeWrite";

const NoticeFrm = (props) => {
  const noticeTitle = props.noticeTitle;
  const setNoticeTitle = props.setNoticeTitle;
  const noticeContent = props.noticeContent;
  const setNoticeContent = props.setNoticeContent;

  const buttonEvent = props.buttonEvent;
  const type = props.type;

  return (
    <table className="notice-frm-tbl">
      <tbody>
        <tr className="notice-frm-titles">
          <td className="notice-frm-title-label">
            <label htmlFor="noticeTitle">제목</label>
          </td>
          <td className="notice-frm-title-input">
            <Input
              type="text"
              data={noticeTitle}
              setData={setNoticeTitle}
              content="noticeTitle" //상단 라벨과 연결
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2" className="notice-content-box">
            <NoticeTextEditor data={noticeContent} setData={setNoticeContent} />
          </td>
        </tr>
        <tr className="notice-btn-box">
          <td colSpan="2">
            {type === "modify" ? (
              <Button2 text="수정하기" clickEvent={buttonEvent} />
            ) : (
              <Button2 text="작성하기" clickEvent={buttonEvent} />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default NoticeFrm;
