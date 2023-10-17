import { Avatar, PopoverPaper, Stack } from "@mui/material";
import "./grComment.css";
import { Button1 } from "../util/Buttons";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import GrReComment from "./GrReComment";
import GrBoardCommentLike from "./GrCommentLike";
import { useLocation } from "react-router-dom";

const grBoardCommentRegist = (
  grBoardNo,
  grBoardCommentContent,
  grBoardCommentNo2,
  isLogin,
  changeGrBoardComment,
  setChangeGrBoardComment,
  setGrBoardCommentContent,
  setRecommentState
) => {
  const groupBoardCommentInsert = {
    grBoardNo,
    grBoardCommentContent,
    grBoardCommentNo2,
  };
  if (isLogin) {
    if (grBoardCommentContent !== "") {
      const token = window.localStorage.getItem("token");
      axios
        .post("/groupBoard/insertComment", groupBoardCommentInsert, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data === 1) {
            setChangeGrBoardComment(!changeGrBoardComment);
            setGrBoardCommentContent("");
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
  const [grBoardCommentContent, setGrBoardCommentContent] = useState("");
  const [grBoardCommentNo2, setGrBoardCommentNo2] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [reCommentList, setReCommentList] = useState([]);
  const [grBoardRecommentContent, setGrBoardRecommentContent] = useState("");
  const [changeGrBoardComment, setChangeGrBoardComment] = useState([true]); //모임게시판 댓글 새로고침
  const grBoardNo = props.grBoardNo;

  //댓글 작성하기
  const grBoardCommentSubmit = () => {
    grBoardCommentRegist(
      grBoardNo,
      grBoardCommentContent,
      grBoardCommentNo2,
      isLogin,
      changeGrBoardComment,
      setChangeGrBoardComment,
      setGrBoardCommentContent,
      null
    );
  };
  //댓글 리스트 불러오기
  useEffect(() => {
    axios
      .get("/groupBoard/groupBoardCommentList/" + grBoardNo)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [member, grBoardNo, changeGrBoardComment]);

  return (
    <div className="comment-all-wrap">
      <InputCommentBox
        member={member}
        isLogin={isLogin}
        commentContent={grBoardCommentContent}
        setCommentContent={setGrBoardCommentContent}
        grBoardCommentSubmit={grBoardCommentSubmit}
      />
      <div className="commentBox-wrap">
        {commentList.map((comment, index) => {
          return (
            <CommentItem
              key={"comment" + index}
              comment={comment}
              isLogin={isLogin}
              member={member}
              grBoardNo={grBoardNo}
              changeGrBoardComment={changeGrBoardComment}
              setChangeGrBoardComment={setChangeGrBoardComment}
              grBoardCommentSubmit={grBoardCommentSubmit}
              grBoardRecommentContent={grBoardRecommentContent}
              setGrBoardRecommentContent={setGrBoardRecommentContent}
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
  const changeGrBoardComment = props.changeGrBoardComment;
  const setChangeGrBoardComment = props.setChangeGrBoardComment;
  const grBoardRecommentContent = props.grBoardRecommentContent;
  const setGrBoardRecommentContent = props.setGrBoardRecommentContent;
  const reCommentList = props.reCommentList;
  const setReCommentList = props.setReCommentList;
  const grBoardNo = props.grBoardNo;
  const [grBoardCommentContent, setGrBoardCommentContent] = useState(
    comment.grBoardCommentContent
  ); //댓글 내용
  const [grBoardCommentNo, setGrBoardCommentNo] = useState(
    comment.grBoardCommentNo
  );
  const [modifyState, setModifyState] = useState(true); //수정 눌렀을 때 확인
  const [recommentState, setRecommentState] = useState(true); //답글 눌렀을 때 확인
  const [groupBoardCommentLike, setGroupBoardCommentLike] = useState(false); //댓글 좋아요
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
      icon: "warning",
      text: "댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/groupBoard/deleteComment/" + comment.grBoardCommentNo)
          .then((res) => {
            if (res.data === 1) {
              setChangeGrBoardComment(!changeGrBoardComment);
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
    setGrBoardCommentContent(comment.grBoardCommentContent);
    setModifyState(true);
  };
  //댓글 수정
  const modifyComment = () => {
    if (grBoardCommentContent !== "") {
      axios
        .get("/groupBoard/modifyComment", {
          params: { grBoardCommentNo, grBoardCommentContent },
        })
        .then((res) => {
          if (res.data === 1) {
            setChangeGrBoardComment(!changeGrBoardComment);
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
  const grBoardCommentSubmit = () => {
    grBoardCommentRegist(
      comment.grBoardNo,
      grBoardRecommentContent,
      comment.grBoardCommentNo,
      isLogin,
      changeGrBoardComment,
      setChangeGrBoardComment,
      setGrBoardRecommentContent,
      setRecommentState
    );
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
          {comment.grBoardCommentDate
            ? formatTime(comment.grBoardCommentDate)
            : ""}
        </div>
      </div>
      <div className="comment-mid">
        {modifyState ? (
          <div className="commentItem-content">
            {comment.grBoardCommentContent}
          </div>
        ) : (
          <textarea
            name="commentContent"
            className="comment-modify-form"
            placeholder="댓글 추가..."
            ref={textRef}
            onInput={resizeHeight}
            value={grBoardCommentContent}
            id={grBoardCommentContent}
            onChange={(e) => {
              setGrBoardCommentContent(e.target.value);
            }}
          />
        )}
      </div>
      <div className="comment-bottom">
        <div className="comment-like">
          <GrBoardCommentLike
            grBoardCommentNo={grBoardCommentNo}
            groupBoardCommentLike={groupBoardCommentLike}
            setGroupBoardCommentLike={setGroupBoardCommentLike}
          />
        </div>
        {isLogin ? (
          member && member.memberNo === comment.grBoardCommentWriter ? (
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
            commentContent={grBoardRecommentContent}
            setCommentContent={setGrBoardRecommentContent}
            grBoardCommentSubmit={grBoardCommentSubmit}
          />
        )}
      </div>
      <GrReComment
        isLogin={isLogin}
        member={member}
        grBoardNo={grBoardNo}
        grBoardCommentNo={comment.grBoardCommentNo}
        reCommentList={reCommentList}
        setReCommentList={setReCommentList}
        changeGrBoardComment={changeGrBoardComment}
        setChangeGrBoardComment={setChangeGrBoardComment}
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
  const grBoardCommentSubmit = props.grBoardCommentSubmit;
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
        <Button1 text="등록" clickEvent={grBoardCommentSubmit} />
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
