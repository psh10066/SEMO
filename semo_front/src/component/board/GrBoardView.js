import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button2, Button1 } from "../util/Buttons";
import Swal from "sweetalert2";
import GrComment from "../board/GrComment";

const GrBoardView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const grBoardNo = location.state.grBoardNo;
  const [grBoard, setGrBoard] = useState({});
  //회원정보 가져오기 위해서
  const [member, setMember] = useState(null);
  const [changeGrBoardComment, setChangeGrBoardComment] = useState([true]); //댓글 새로고침
  const navigate = useNavigate();
  //게시판정보
  useEffect(() => {
    axios
      .get("/groupBoard/view/" + grBoardNo)
      .then((res) => {
        setGrBoard(res.data);
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
  }, []);
  //게시판 상세정보 수정
  const modify = () => {
    navigate("/group/groupBoard/modify", { state: { grBoard: grBoard } });
  };
  //게시판 상세정보 삭제
  const deleteBoard = () => {
    Swal.fire({
      icon: "warning",
      text: "게시글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/groupBoard/delete/" + grBoard.grBoardNo)
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              Swal.fire("삭제가 완료되었습니다.");
              navigate("/group/groupBoard", {
                state: { groupNo: grBoard.groupNo },
              });
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };
  //목록
  const list = () => {
    navigate("/group/groupBoard", { state: { groupNo: grBoard.groupNo } });
  };
  return (
    <div className="board-view-wrap">
      <table className="board-view-table">
        <tbody>
          <tr>
            <th className="board-view-info">제목</th>
            <td className="board-view-info-content board-view-info-title">
              {grBoard.grBoardTitle}
            </td>
            <th className="board-view-info board-view-info-title2">작성일</th>
            <td className="board-view-info-content board-view-info-date">
              {grBoard.grBoardDate}
            </td>
          </tr>
          <tr>
            <th className="board-view-info">내용</th>
            <td
              colSpan={3}
              className="board-view-info-content board-view-info-content2"
              dangerouslySetInnerHTML={{ __html: grBoard.grBoardContent }}
            ></td>
          </tr>
        </tbody>
      </table>
      <div className="board-view-btn-zone">
        {isLogin ? (
          member && member.memberNo === grBoard.grBoardWriter ? (
            <>
              <Button2 text="수정" clickEvent={modify} />
              <Button2 text="삭제" clickEvent={deleteBoard} />
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <div className="board-view-btn-zone-list">
          <Button1 text="목록" clickEvent={list} />
        </div>
      </div>
      <div className="board-view-bottom">
        <GrComment
          isLogin={isLogin}
          member={member}
          grBoardNo={grBoardNo}
          changeGrBoardComment={changeGrBoardComment}
          setChangeGrBoardComment={setChangeGrBoardComment}
        />
      </div>
    </div>
  );
};

export default GrBoardView;
