import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CommentLike = (props) => {
  const commentNo = props.commentNo;
  const isLogin = props.isLogin;
  //   console.log(isLogin);
  const [commentLike, setCommentLike] = useState(false); //댓글 좋아요
  const [commentLikeCount, setCommentLikeCount] = useState(0);
  useEffect(() => {
    axios
      .get("/feed/commentLikeCount/" + commentNo)
      .then((res) => {
        // console.log(res.data);
        setCommentLikeCount(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/feed/commentLikeState/" + commentNo, null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          //   console.log(res.data);
          if (res.data === 1) {
            setCommentLike(true);
          } else {
            setCommentLike(false);
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [commentLike]);
  const loginMsg = () => {
    Swal.fire({ icon: "info", text: "로그인 후 이용해 주세요." });
  };
  const commentLikeClick = (e) => {
    // console.log(commentNo);
    // e.stopPropagation(); // 부모 컴포넌트의 onClick 막기
    const token = window.localStorage.getItem("token");
    axios
      .post("/feed/commentLike/" + commentNo, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          setCommentLike(true);
        } else {
          setCommentLike(false);
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <>
      {isLogin ? (
        commentLike ? (
          <span
            className="material-icons"
            style={{ color: "red" }}
            onClick={commentLikeClick}
          >
            favorite
          </span>
        ) : (
          <span className="material-icons" onClick={commentLikeClick}>
            favorite_border
          </span>
        )
      ) : (
        <span className="material-icons" onClick={loginMsg}>
          favorite_border
        </span>
      )}
      <span className="commentLikeCount">{commentLikeCount}</span>
    </>
  );
};

export default CommentLike;
