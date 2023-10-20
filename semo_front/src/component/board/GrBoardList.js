import { useEffect, useState } from "react";
import "./grBoard.css";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button1 } from "../util/Buttons";
import { useLocation, useNavigate } from "react-router-dom";

const GrBoardList = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const [GrboardList, setGrBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const groupNo = location.state.groupNo;

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

  // 글쓰기 페이지 이동
  const navigate = useNavigate();
  const write = () => {
    navigate("write", { state: { groupNo: groupNo } });
  };
  return (
    <div className="my-board-wrap">
      <div className="board-write-wrap">
        {isLogin ? (
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
              return <BoardItem key={"grBoard" + index} grBoard={grBoard} />;
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
  const navigate = useNavigate();
  const boardView = () => {
    navigate("/group/groupBoard/view", {
      state: { grBoardNo: grBoard.grBoardNo },
    });
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
