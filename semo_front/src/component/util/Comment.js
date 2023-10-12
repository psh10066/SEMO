import { Avatar, Stack } from "@mui/material";
import "./comment.css";
import { Button1 } from "./Buttons";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const Comment = (props) => {
  const member = props.member;
  const isLogin = props.isLogin;
  const feed = props.feed;
  const [feedCommentContent, setFeedCommentContent] = useState("");
  const [feedCommentNo2, setFeedCommentNo2] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [reCommentList, setReCommentList] = useState([]);
  //   console.log(feed.feedNo);
  const feedNo = feed.feedNo;
  //   console.log(member);

  const feedCommentSubmit = () => {
    const feedCommentInesrt = { feedNo, feedCommentContent, feedCommentNo2 };
    if (isLogin) {
      if (feedCommentContent !== "") {
        const token = window.localStorage.getItem("token");
        axios
          .post("/feed/insertComment", feedCommentInesrt, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      } else {
        Swal.fire("댓글을 입력해 주세요.");
      }
    } else {
      Swal.fire("로그인 후 이용해 주세요.");
    }
  };
  useEffect(() => {
    axios
      .get("/feed/feedCommentList/" + feedNo)
      .then((res) => {
        // console.log(res.data);
        setCommentList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [member, feedNo]);

  return (
    <div className="comment-all-wrap">
      <InputCommentBox
        member={member}
        isLogin={isLogin}
        commentContent={feedCommentContent}
        setCommentContent={setFeedCommentContent}
        feedCommentSubmit={feedCommentSubmit}
      />
      <div className="commentBox-wrap">
        {commentList.map((comment, index) => {
          return (
            <CommentItem
              key={"comment" + index}
              comment={comment}
              isLogin={isLogin}
              member={member}
            />
          );
        })}
      </div>
    </div>
  );
};
const CommentItem = (props) => {
  const comment = props.comment;
  const isLogin = props.isLogin;
  const member = props.member;
  const [commentContent, setCommentContent] = useState("");
  const textRef = useRef();
  const resizeHeight = () => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  };

  //   console.log(comment);
  function formatTime(postTime) {
    const currentTime = new Date();
    const postDate = new Date(postTime);

    const timeDifference = (currentTime - postDate) / 1000; // 초 단위로 계산
    const seconds = Math.floor(timeDifference);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);

    const year = postDate.getFullYear();
    const month = postDate.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더합니다.
    const day = postDate.getDate();
    if (years >= 1) {
      return `${year}년 ${month}월 ${day}일`;
    } else if (weeks >= 1) {
      return `${month}월 ${day}일`;
    } else if (days >= 1) {
      return `${days}일 전`;
    } else if (hours >= 1) {
      return `${hours}시간 전`;
    } else if (minutes >= 1) {
      return `${minutes}분 전`;
    } else if (seconds >= 1) {
      return `${seconds}초 전`;
    } else {
      return "방금";
    }
  }
  const loginMsg = () => {
    Swal.fire("로그인 후 이용해 주세요.");
  };
  const deleteComment = () => {
    // const token = window.localStorage.getItem("token");
    // axios
    //   .post("/feed/deleteComment", comment, {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((res) => {
    //     console.log(res.response.status);
    //   });
    console.log("삭제하기");
    console.log(comment);
  };
  return (
    <div className="comment-wrap">
      <div className="comment-top">
        {comment.memberImg === null ? (
          <div className="commentItem-profile-image">
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src="/image/person.png"
                sx={{ width: 22, height: 22 }}
              />
            </Stack>
          </div>
        ) : (
          <div className="commentItem-profile-image">
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src={"/member/" + comment.memberImg}
                sx={{ width: 22, height: 22 }}
              />
            </Stack>
          </div>
        )}
        <div className="commentItem-memberName">{comment.memberName}</div>
        <div className="commentItem-date">
          {comment.feedCommentDate ? formatTime(comment.feedCommentDate) : ""}
        </div>
      </div>
      <div className="comment-mid">
        <div className="commentItem-content">{comment.feedCommentContent}</div>
        <textarea
          name="commentContent"
          className="comment-modify-form"
          placeholder="댓글 추가..."
          ref={textRef}
          onInput={resizeHeight}
          defaultValue={comment.feedCommentContent}
          id={comment.feedCommentContent}
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
        />
      </div>
      <div className="comment-bottom">
        {isLogin ? (
          member && member.memberNo === comment.feedCommentWriter ? (
            <div className="comment-bottom-right">
              <div className="comment-modify">수정</div>
              <div className="comment-delete" onClick={deleteComment}>
                삭제
              </div>
              <div className="comment-recommentWrite">답글달기</div>
            </div>
          ) : (
            <div className="comment-bottom-right">
              <div className="comment-recommentWrite">답글달기</div>
            </div>
          )
        ) : (
          <div className="comment-bottom-right">
            <div className="comment-recommentWrite" onClick={loginMsg}>
              답글달기
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InputCommentBox = (props) => {
  const member = props.member;
  const isLogin = props.isLogin;
  const commentContent = props.commentContent;
  const setCommentContent = props.setCommentContent;
  const feedCommentSubmit = props.feedCommentSubmit;
  return (
    <div className="inputCommentBox-wrap">
      {isLogin ? (
        member === null || member.memberImg === null ? (
          <div className="comment-profile-image">
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src="/image/person.png"
                sx={{ width: 40, height: 40 }}
              />
            </Stack>
          </div>
        ) : (
          <div className="comment-profile-image">
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src={"/member/" + member.memberImg}
                sx={{ width: 40, height: 40 }}
              />
            </Stack>
          </div>
        )
      ) : (
        <div className="comment-profile-image">
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="Remy Sharp"
              src="/image/person.png"
              sx={{ width: 40, height: 40 }}
            />
          </Stack>
        </div>
      )}
      <CommentContent
        commentContent={commentContent}
        setCommentContent={setCommentContent}
      />
      <div className="comment-submit-btn">
        <Button1 text="등록" clickEvent={feedCommentSubmit} />
      </div>
    </div>
  );
};

const CommentContent = (props) => {
  const commentContent = props.commentContent;
  const setCommentContent = props.setCommentContent;
  const textRef = useRef();
  const resizeHeight = () => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  };
  return (
    <div className="comment-input-box">
      <textarea
        name="commentContent"
        className="comment-input-form"
        placeholder="댓글 추가..."
        ref={textRef}
        onInput={resizeHeight}
        defaultValue={commentContent}
        id={commentContent}
        onChange={(e) => {
          setCommentContent(e.target.value);
        }}
      />
    </div>
  );
};

export default Comment;
