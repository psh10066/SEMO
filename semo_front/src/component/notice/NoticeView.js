import { useLocation, useNavigate } from "react-router-dom";
import "./notice.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button2 } from "../util/Buttons";

const NoticeView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const noticeNo = location.state.noticeNo;
  const [notice, setNotice] = useState({});
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/notice/view/" + noticeNo)
      .then((res) => {
        console.log(res.data);
        setNotice(res.data);
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
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);
  const modify = () => {
    navigate("/notice/modify", { state: { notice: notice } });
  };
  const deleteNotice = () => {
    Swal.fire({
      icon: "warning",
      text: "공지사항을 삭제하겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/notice/delete/" + notice.noticeNo)
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              navigate("/notice"); //성공 시 noticeList로 이동
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };
  return (
    <div className="notice-view-wrap">
      <div className="notice-view-title">제목 : {notice.noticeTitle}</div>
      <div className="notice-view-info">
        <div>
          작성자(이름) : {notice.memberId}({notice.memberName})
        </div>
        <div>{notice.noticeDate}</div>
      </div>
      <div className="notice-view-content">
        <div>내용 : {notice.noticeContent}</div>
      </div>
      <div className="notice-view-btn-zone">
        {isLogin ? (
          member && member.memberNo === notice.memberNo ? (
            <>
              <Button2 text="수정" clickEvent={modify} />
              <Button2 text="삭제" clickEvent={deleteNotice} />
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NoticeView;
