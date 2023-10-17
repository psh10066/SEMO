import { Avatar, PopoverPaper, Stack } from "@mui/material";
import "./comment.css";
import { Button1 } from "./Buttons";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReComment from "./ReComment";
import { useNavigate } from "react-router-dom";
import CommentLike from "./CommentLIke";

const feedCommentRegist = (
  feedNo,
  feedCommentContent,
  feedCommentNo2,
  isLogin,
  changeFeedComment,
  setChangeFeedComment,
  setFeedCommentContent,
  setRecommentState
) => {
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
          if (res.data === 1) {
            setChangeFeedComment(!changeFeedComment);
            setFeedCommentContent("");
            if (setRecommentState) {
              setRecommentState(true);
            }
          }
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

//댓글 전체
const Comment = (props) => {
  const member = props.member;
  const isLogin = props.isLogin;
  const [feedCommentContent, setFeedCommentContent] = useState("");
  const [feedCommentNo2, setFeedCommentNo2] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [reCommentList, setReCommentList] = useState([]);
  const [feedReCommentContent, setFeedRecommentContent] = useState("");
  const changeFeedComment = props.changeFeedComment;
  const setChangeFeedComment = props.setChangeFeedComment;
  const feedNo = props.feedNo;

  //댓글 작성하기
  const feedCommentSubmit = () => {
    feedCommentRegist(
      feedNo,
      feedCommentContent,
      feedCommentNo2,
      isLogin,
      changeFeedComment,
      setChangeFeedComment,
      setFeedCommentContent,
      null
    );
  };
  //댓글 리스트 불러오기
  useEffect(() => {
    axios
      .get("/feed/feedCommentList/" + feedNo)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [member, feedNo, changeFeedComment]);

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
              feedNo={feedNo}
              changeFeedComment={changeFeedComment}
              setChangeFeedComment={setChangeFeedComment}
              feedCommentSubmit={feedCommentSubmit}
              feedReCommentContent={feedReCommentContent}
              setFeedRecommentContent={setFeedRecommentContent}
              reCommentList={reCommentList}
              setReCommentList={setReCommentList}
            />
          );
        })}
      </div>
    </div>
  );
};
//작성한 댓글 불러오기
const CommentItem = (props) => {
  const comment = props.comment;
  const isLogin = props.isLogin;
  const member = props.member; //로그인된 회원정보
  const changeFeedComment = props.changeFeedComment;
  const setChangeFeedComment = props.setChangeFeedComment;
  const feedReCommentContent = props.feedReCommentContent;
  const setFeedRecommentContent = props.setFeedRecommentContent;
  const reCommentList = props.reCommentList;
  const setReCommentList = props.setReCommentList;
  const feedNo = props.feedNo;
  const [feedCommentContent, setFeedCommentContent] = useState(
    comment.feedCommentContent
  ); //댓글 내용
  const [feedCommentNo, setFeedCommentNo] = useState(comment.feedCommentNo);
  const [modifyState, setModifyState] = useState(true); //수정 눌렀을 때 확인
  const [recommentState, setRecommentState] = useState(true); //답글 눌렀을 때 확인
  //댓글 textarea 크기 조절
  const textRef = useRef();
  const resizeHeight = () => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  };

  //댓글 작성 시간
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
  //로그인 안되었을 때 메세지
  const loginMsg = () => {
    Swal.fire("로그인 후 이용해 주세요.");
  };
  //댓글 삭제
  const deleteComment = () => {
    Swal.fire({
      icon: "question",
      text: "댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/feed/deleteComment/" + comment.feedCommentNo)
          .then((res) => {
            if (res.data === 1) {
              setChangeFeedComment(!changeFeedComment);
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };
  //댓글 수정버튼 눌렀을 때
  const modifyClick = () => {
    setModifyState(false);
  };
  //댓글 수정취소 버튼 눌렀을 때
  const modifyCancel = () => {
    setFeedCommentContent(comment.feedCommentContent);
    setModifyState(true);
  };
  //댓글 수정
  const modifyComment = () => {
    if (feedCommentContent !== "") {
      axios
        .get("/feed/modifyComment", {
          params: { feedCommentNo, feedCommentContent },
        })
        .then((res) => {
          if (res.data === 1) {
            setChangeFeedComment(!changeFeedComment);
          }
          setModifyState(true);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire("댓글을 입력해 주세요.");
    }
  };
  const feedCommentSubmit = () => {
    feedCommentRegist(
      comment.feedNo,
      feedReCommentContent,
      comment.feedCommentNo,
      isLogin,
      changeFeedComment,
      setChangeFeedComment,
      setFeedRecommentContent,
      setRecommentState
    );
  };
  const navigate = useNavigate();
  const naviFeedProfile = () => {
    navigate("/feed/profile", {
      state: { memberNo: comment.feedCommentWriter },
    });
  };
  return (
    <div className="comment-wrap">
      <div className="comment-top">
        {comment.memberImg === null ? (
          <div className="commentItem-profile-image">
            <Stack direction="row" spacing={2} onClick={naviFeedProfile}>
              <Avatar
                alt="Remy Sharp"
                src="/image/person.png"
                sx={{ width: 22, height: 22 }}
              />
            </Stack>
          </div>
        ) : (
          <div className="commentItem-profile-image">
            <Stack direction="row" spacing={2} onClick={naviFeedProfile}>
              <Avatar
                alt="Remy Sharp"
                src={"/member/" + comment.memberImg}
                sx={{ width: 22, height: 22 }}
              />
            </Stack>
          </div>
        )}
        <div className="commentItem-memberName" onClick={naviFeedProfile}>
          {comment.memberName}
        </div>
        <div className="commentItem-date">
          {comment.feedCommentDate ? formatTime(comment.feedCommentDate) : ""}
        </div>
      </div>
      <div className="comment-mid">
        {modifyState ? (
          <div className="commentItem-content">
            {comment.feedCommentContent}
          </div>
        ) : (
          <textarea
            name="commentContent"
            className="comment-modify-form comment-input-form"
            placeholder="댓글 추가..."
            ref={textRef}
            onInput={resizeHeight}
            value={feedCommentContent}
            id={feedCommentContent}
            onChange={(e) => {
              setFeedCommentContent(e.target.value);
            }}
          />
        )}
      </div>
      <div className="comment-bottom">
        <div className="comment-like">
          <CommentLike commentNo={comment.feedCommentNo} isLogin={isLogin} />
        </div>
        {isLogin ? (
          member && member.memberNo === comment.feedCommentWriter ? (
            modifyState ? (
              <div className="comment-bottom-right">
                <div className="comment-modify" onClick={modifyClick}>
                  수정
                </div>
                <div className="comment-delete" onClick={deleteComment}>
                  삭제
                </div>
                <ReCommentWrite
                  recommentState={recommentState}
                  setRecommentState={setRecommentState}
                />
              </div>
            ) : (
              <div className="comment-bottom-right">
                <div className="comment-modify" onClick={modifyComment}>
                  수정
                </div>
                <div className="comment-delete" onClick={modifyCancel}>
                  취소
                </div>
              </div>
            )
          ) : (
            <div className="comment-bottom-right">
              <ReCommentWrite
                recommentState={recommentState}
                setRecommentState={setRecommentState}
              />
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
      <div className="recomment-input-all-wrap">
        {recommentState ? (
          ""
        ) : (
          <InputCommentBox
            member={member}
            isLogin={isLogin}
            commentContent={feedReCommentContent}
            setCommentContent={setFeedRecommentContent}
            feedCommentSubmit={feedCommentSubmit}
          />
        )}
      </div>
      <ReComment
        isLogin={isLogin}
        member={member}
        feedNo={feedNo}
        feedCommentNo={comment.feedCommentNo}
        reCommentList={reCommentList}
        setReCommentList={setReCommentList}
        changeFeedComment={changeFeedComment}
        setChangeFeedComment={setChangeFeedComment}
      />
    </div>
  );
};
//답글달기 버튼 변경
const ReCommentWrite = (props) => {
  const recommentState = props.recommentState;
  const setRecommentState = props.setRecommentState;
  const recommentClick = () => {
    setRecommentState(false);
  };
  const recommentCancelClick = () => {
    setRecommentState(true);
  };
  return (
    <>
      {recommentState ? (
        <div className="comment-recommentWrite" onClick={recommentClick}>
          답글달기
        </div>
      ) : (
        <div className="comment-recommentWrite" onClick={recommentCancelClick}>
          답글취소
        </div>
      )}
    </>
  );
};
//댓글폼
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
//댓글 inputform
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
        value={commentContent}
        id={commentContent}
        onChange={(e) => {
          setCommentContent(e.target.value);
        }}
      />
    </div>
  );
};

export default Comment;
