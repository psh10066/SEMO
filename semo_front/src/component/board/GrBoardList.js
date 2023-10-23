import { useEffect, useState } from "react";
import "./grBoard.css";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button1 } from "../util/Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GrBoardList = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const [GrboardList, setGrBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const groupNo = location.state.groupNo;
  const [groupLevel, setGroupLevel] = useState(0);

  useEffect(() => {
    axios
      .get("/groupBoard/list/" + groupNo + "/" + reqPage)
      .then((res) => {
        setGrBoardList(res.data.groupBoardList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  useEffect(() => {
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post(
          "/group/groupLevelState",
          { groupNo },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          setGroupLevel(res.data);
        });
    }
  }, []);

  // 글쓰기 페이지 이동
  const navigate = useNavigate();
  const write = () => {
    navigate("write", { state: { groupNo: groupNo } });
  };
  return (
    <div className="my-board-wrap">
      <div className="board-write-wrap">
        {isLogin && (groupLevel === 1 || groupLevel === 2) ? (
          <div className="board-write-btn">
            <Button1 text="글쓰기" clickEvent={write} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="board-list-wrap">
        <table>
          <thead>
            <tr>
              <td width={"30px"}>번호</td>
              <td width={"400px"}>제목</td>
              <td width={"50px"}>작성자</td>
              <td width={"50px"}>작성일</td>
            </tr>
          </thead>
          <tbody>
            {GrboardList.map((grBoard, index) => {
              return (
                <BoardItem
                  key={"grBoard" + index}
                  grBoard={grBoard}
                  isLogin={isLogin}
                  groupLevel={groupLevel}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {/* 페이징 */}
      <div className="board-page">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};
const BoardItem = (props) => {
  const grBoard = props.grBoard;
  const isLogin = props.isLogin;
  const groupLevel = props.groupLevel;
  const navigate = useNavigate();
  const boardView = () => {
    if (isLogin && (groupLevel === 1 || groupLevel === 2)) {
      navigate("/group/groupBoard/view", {
        state: { grBoardNo: grBoard.grBoardNo },
      });
    } else {
      Swal.fire("가입한 멤버만 확인이 가능합니다.");
    }
  };

  return (
    <tr className="board-item" onClick={boardView}>
      <td>{grBoard.grBoardNo}</td>
      <td>{grBoard.grBoardTitle}</td>
      <td>{grBoard.memberName}</td>
      <td>{grBoard.grBoardDate}</td>
    </tr>
  );
};
export default GrBoardList;
