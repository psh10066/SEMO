import axios from "axios";
import { useEffect, useState } from "react";

const ReComment = (props) => {
  const isLogin = props.isLogin;
  const member = props.member;
  const feedNo = props.feedNo;
  const feedCommentNo = props.feedCommentNo;
  const reCommentList = props.reCommentList;
  const setReCommentList = props.setReCommentList;
  const [changeFeedReComment, setChangeFeedReComment] = useState(true); //피드댓글 새로고침
  useEffect(() => {
    axios
      .get("/feed/feedReCommentList/" + feedNo)
      .then((res) => {
        // console.log(res.data);
        setReCommentList(res.data);
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [changeFeedReComment]);
  return <div className="reCommentBox-wrap"></div>;
};

export default ReComment;
