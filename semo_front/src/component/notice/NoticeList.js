import { useEffect, useState } from "react";
import "./notice.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button1, Button2, Button3 } from "../util/Buttons";
import Pagination from "../common/Pagination";

const NoticeList = (props) => {
  const isLogin = props.isLogin;
  const token = window.localStorage.getItem("token");
  const [noticeList, setNoticeList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [member, setMember] = useState(null);
  useEffect(() => {
    axios
      .get("/notice/list/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setNoticeList(res.data.noticeList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [reqPage]);
  const navigate = useNavigate();
  const write = () => {
    navigate("write");
  };
  return (
    <div className="notice-content-wrap">
      <div className="notice-write-wrap">
        {isLogin ? (
          member && member.memberType === 1 ? (
            <div className="notice-write-btn">
              <Button2 text="글쓰기" clickEvent={write} />
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>

      <div className="notice-content-title">공지사항</div>
      <div className="notice-list-wrap">
        <table class="notice-tbl">
          <thead>
            <tr>
              <td width={"20%"}>번호</td>
              <td width={"40%"}>제목</td>
              <td width={"20%"}>작성자</td>
              <td width={"20%"}>작성일</td>
            </tr>
          </thead>
          <tbody>
            {noticeList.map((notice, index) => {
              return <NoticeItem key={"notice" + index} notice={notice} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="notice-page">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};
const NoticeItem = (props) => {
  const notice = props.notice;
  const navigate = useNavigate();
  const noticeView = () => {
    navigate("/notice/view", { state: { noticeNo: notice.noticeNo } });
  };
  return (
    <tr className="notice-item" onClick={noticeView}>
      <td>{notice.noticeNo}</td>
      <td>{notice.noticeTitle}</td>
      <td>{notice.memberId}</td>
      <td>{notice.noticeDate}</td>
    </tr>
  );
};
export default NoticeList;
