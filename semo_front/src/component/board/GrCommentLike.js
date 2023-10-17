import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const GrBoardCommentLike = (props) => {
  const isLogin = props.isLogin;
  const grBoardCommentNo = props.grBoardCommentNo;
  const [grBoardCommentLike, setGrBoardCommentLike] = useState(false);
  const [grBoardcommentLikeCount, setGrBoardCommentLikeCount] = useState(0);
  useEffect(() => {
    axios
      .get("/groupBoard/commentLikeCount/" + grBoardCommentNo)
      .then((res) => {
        // console.log(res.data);
        setGrBoardCommentLikeCount(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/groupBoard/commentLikeState/" + grBoardCommentNo, null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          //   console.log(res.data);
          if (res.data === 1) {
            setGrBoardCommentLike(true);
          } else {
            setGrBoardCommentLike(false);
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [grBoardCommentLike]);

  const loginMsg = () => {
    Swal.fire("로그인 후 이용해 주세요.");
  };

  const grBoardCommentLikeClick = (e) => {
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
          setGrBoardCommentLike(true);
        } else {
          setGrBoardCommentLike(false);
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <>
      {isLogin ? (
        grBoardCommentLike ? (
          <span
            className="material-icons"
            style={{ color: "red" }}
            onClick={grBoardCommentLikeClick}
          >
            favorite
          </span>
        ) : (
          <span className="material-icons" onClick={grBoardCommentLikeClick}>
            favorite_border
          </span>
        )
      ) : (
        <span className="material-icons" onClick={loginMsg}>
          favorite_border
        </span>
      )}
      <span className="commentLikeCount">{grBoardcommentLikeCount}</span>
    </>
  );
};
export default GrBoardCommentLike;
