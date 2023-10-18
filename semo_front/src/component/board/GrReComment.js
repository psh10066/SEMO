import { Avatar, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GrBoardCommentLike from "./GrCommentLike";

const ReComment = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;
  const grBoardNo = props.grBoardNo;
  const grBoardCommentNo = props.grBoardCommentNo;
  const reCommentList = props.reCommentList;
  const setReCommentList = props.setReCommentList;
  const changeGrBoardReComment = props.changeGrBoardComment;
  const setChangeGrBoardReComment = props.setChangeGrBoardComment;
  useEffect(() => {
    axios
      .get("/groupBoard/groupBoardReCommentList/" + grBoardNo)
      .then((res) => {
        // console.log(res.data);
        setReCommentList(res.data);
        // console.log(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [changeGrBoardReComment]);
  return (
    <div className="reCommentBox-wrap">
      {reCommentList.map((recomment, index) => {
        return (
          <ReCommentItem
            key={"recomment" + index}
            recomment={recomment}
            isLogin={isLogin}
            member={member}
            grBoardNo={grBoardNo}
            changeGrBoardReComment={changeGrBoardReComment}
            setChangeGrBoardReComment={setChangeGrBoardReComment}
            grBoardCommentNo={grBoardCommentNo}
          />
        );
      })}
    </div>
  );
};

const ReCommentItem = (props) => {
  const recomment = props.recomment;
  const isLogin = props.isLogin;
  const member = props.member;
  const changeGrBoardReComment = props.changeGrBoardReComment;
  const setChangeGrBoardReComment = props.setChangeGrBoardReComment;
  const grBoardCommentRef = props.grBoardCommentNo;
  const [grBoardCommentContent, setGrBoardCommentContent] = useState(
    recomment.grBoardCommentContent
  ); //대댓글 내용
  const [grBoardCommentNo, setgrBoardCommentNo] = useState(
    recomment.grBoardCommentNo
  );
  const [modifyState, setModifyState] = useState(true); //수정 눌렀을 때 확인
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
          .get("/groupBoard/deleteComment/" + recomment.grBoardCommentNo)
          .then((res) => {
            if (res.data === 1) {
              setChangeGrBoardReComment(!changeGrBoardReComment);
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
    setGrBoardCommentContent(recomment.GrBoardCommentContent);
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
            setChangeGrBoardReComment(!changeGrBoardReComment);
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
  const navigate = useNavigate();
  const naviFeedProfile = () => {
    navigate("/feed/profile", {
      state: { memberNo: recomment.grBoardCommentWriter },
    });
  };
  return (
    <>
      {grBoardCommentRef === recomment.grBoardCommentNo2 ? (
        <>
          <span className="material-icons arrowReComment">
            subdirectory_arrow_right
          </span>
          <div className="comment-wrap recomment-wrap">
            <div className="comment-top">
              {recomment.memberImg === null ? (
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
                      src={"/member/" + recomment.memberImg}
                      sx={{ width: 22, height: 22 }}
                    />
                  </Stack>
                </div>
              )}
              <div className="commentItem-memberName" onClick={naviFeedProfile}>
                {recomment.memberName}
              </div>
              <div className="commentItem-date">
                {recomment.feedCommentDate
                  ? formatTime(recomment.feedCommentDate)
                  : ""}
              </div>
            </div>
            <div className="comment-mid">
              {modifyState ? (
                <div className="commentItem-content">
                  {recomment.grBoardCommentContent}
                </div>
              ) : (
                <textarea
                  name="commentContent"
                  className="comment-modify-form comment-input-form"
                  placeholder="댓글 추가..."
                  ref={textRef}
                  onInput={resizeHeight}
                  defaultValue={grBoardCommentContent}
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
                  grBoardCommentNo={recomment.grBoardCommentNo}
                  isLogin={isLogin}
                />
              </div>
              {isLogin ? (
                member && member.memberNo === recomment.grBoardCommentWriter ? (
                  modifyState ? (
                    <div className="comment-bottom-right">
                      <div className="comment-modify" onClick={modifyClick}>
                        수정
                      </div>
                      <div className="comment-delete" onClick={deleteComment}>
                        삭제
                      </div>
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
                  <div className="comment-bottom-right"></div>
                )
              ) : (
                <div className="comment-bottom-right"></div>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ReComment;
