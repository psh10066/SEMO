import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button2 } from "../util/Buttons";
import Swal from "sweetalert2";

const GRBoardView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const grBoardNo = location.state.grBoardNo;
  const [grBoard, setGrBoard] = useState({});
  //회원정보 가져오기 위해서
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  //게시판정보
  useEffect(() => {
    axios
      .get("/groupBoard/view/" + grBoardNo)
      .then((res) => {
        console.log(res.data);
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
          console.log(res.data);
          setMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);
  //게시판 상세정보 수정
  const modify = () => {
    navigate("/groupBoard/modify", { state: { grBoard: grBoard } });
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
              navigate("/groupBoard");
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };

  return (
    <div className="board-view-wrap">
      <table className="board-view-table">
        <thead>
          <tbody>
            <tr>
              <th className="board-view-info">제목</th>
              <td className="board-view-info-content">
                {grBoard.grBoardTitle}
              </td>
            </tr>
            <tr>
              <th className="board-view-info">작성일</th>
              <td className="board-view-info-content">{grBoard.grBoardDate}</td>
            </tr>
            <tr>
              <th className="board-view-info">내용</th>
              <td
                className="board-view-info-content"
                dangerouslySetInnerHTML={{ __html: grBoard.grBoardContent }}
              ></td>
            </tr>
          </tbody>
        </thead>
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
      </div>
    </div>
  );
};

export default GRBoardView;
