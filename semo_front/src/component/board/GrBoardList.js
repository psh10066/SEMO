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
      .get("/groupBoard/list/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setGrBoardList(res.data.groupBoardList);
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
        {GrboardList.map((grBoard, index) => {
          return <BoardItem key={"grBoard" + index} GrBoard={grBoard} />;
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
  const grBoard = props.grBoard;
  const navigate = useNavigate();
  const boardView = () => {
    navigate("/groupBoard/view", {
      state: { grBoardNo: grBoard.grBoardNo },
    });
  };
  return (
    <div className="board-item" onClick={boardView}>
      {/* 게시글정보 */}
      <div className="board-item-info">
        <div className="board-item-title">{grBoard.grBoardTitle}</div>
        <div className="board-item-writer">{grBoard.memberId}</div>
        <div className="board-item-date">{grBoard.grBoardDate}</div>
      </div>
    </div>
  );
};
export default GrBoardList;
