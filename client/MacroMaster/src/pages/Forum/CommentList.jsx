import  { useEffect, useState } from "react";
import axios from "axios";
import CommentItem from "./CommentItem";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/posts/${postId}/comments/`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div style={styles.container}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    marginLeft: "1rem",
    borderLeft: "2px solid #e5e7eb",
    paddingLeft: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
};

export default CommentList;
