import React from "react";

const CommentItem = ({ comment }) => {
  return (
    <div style={styles.container}>
      <span style={styles.author}>{comment.author.username}:</span>{" "}
      <span style={styles.text}>{comment.body}</span>
    </div>
  );
};

const styles = {
  container: {
    fontSize: "0.875rem",
    color: "#4b5563",
  },
  author: {
    fontWeight: "600",
  },
  text: {
    marginLeft: "0.25rem",
  },
};

export default CommentItem;