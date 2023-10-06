// 수정 필요
import React, { useState } from "react";
const CommentApp = () => {
  // 댓글 목록을 저장할 상태
  const [comments, setComments] = useState([]);
  // 새로운 댓글을 작성하는 함수
  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };
  return (
    <div>
      <h1>댓글 목록</h1>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <h2>댓글 작성</h2>
      <CommentForm addComment={addComment} />
    </div>
  );
};
const CommentForm = ({ addComment }) => {
  const [newComment, setNewComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(newComment);
    setNewComment("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 작성하세요..."
      />
      <button type="submit">댓글 작성</button>
    </form>
  );
};
export default CommentApp;
