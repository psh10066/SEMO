import { useEffect, useState } from "react";
import "./grBoard.css";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button1 } from "../util/Buttons";
import { useNavigate } from "react-router-dom";

const GrBoardList = (props) => {
  const isLogin = props.isLogin;
  const [GrboardList, setGrBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    axios
      .get("/board/list/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setGrBoardList(res.data.boardList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  // 글쓰기 페이지 이동
  const navigate = useNavigate();
  const write = () => {
    navigate("write");
  };
  return (
    <div>
      <div className="board-write-btn">
        <Button1 text="글쓰기" clickEvent={write} />
      </div>

      <div className="board-list-wrap">
        {GrboardList.map((board, index) => {
          return <BoardItem key={"board" + index} board={board} />;
        })}
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
  const board = props.board;
  const navigate = useNavigate();
  const boardView = () => {
    navigate("/board/view", { state: { boardNo: board.boardNo } });
  };
  return (
    <div className="board-item" onClick={boardView}>
      {/* 이미지없으므로 삭제 예정 */}
      <div className="board-item-img">
        {board.boardImg === null ? (
          <img src="/img/default.png" />
        ) : (
          <img src={"/board/" + board.boardImg} />
        )}
      </div>
      {/* 게시글정보 */}
      <div className="board-item-info">
        <div className="board-item-title">{board.boardTitle}</div>
        <div className="board-item-writer">{board.memberId}</div>
        <div className="board-item-date">{board.boardDate}</div>
      </div>
    </div>
  );
};
export default GrBoardList;
