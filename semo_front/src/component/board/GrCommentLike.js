import { colors } from "@mui/material";
import axios from "axios";

const GrBoardCommentLike = (props) => {
  const grBoardCommentNo = props.grBoardCommentNo;
  const groupBoardCommentLike = props.groupBoardCommentLike;
  const setGroupBoardCommentLike = props.setGroupBoardCommentLike;
  const groupBoardCommentLikeClick = (e) => {
    e.stopPropagation(); // 부모 컴포넌트의 onClick 막기

    const token = window.localStorage.getItem("token");
    axios
      .post("/groupBoard/commentLike/" + grBoardCommentNo, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setGroupBoardCommentLike(true);
        } else {
          setGroupBoardCommentLike(false);
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <>
      {groupBoardCommentLike ? (
        <span
          className="material-icons"
          style={{ color: "red" }}
          onClick={groupBoardCommentLikeClick}
        >
          favorite
        </span>
      ) : (
        <span className="material-icons" onClick={groupBoardCommentLikeClick}>
          favorite_border
        </span>
      )}
    </>
  );
};
export default GrBoardCommentLike;
