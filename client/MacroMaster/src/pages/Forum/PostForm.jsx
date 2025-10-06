import React, { useState } from "react";

const PostForm = ({ onPostCreated }) => {
  const [post, setPost] = useState({ title: "", body: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      setPost({ title: "", body: "" });
      onPostCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Post title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        style={styles.input}
      />
      <textarea
        placeholder="Write something..."
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        style={styles.textarea}
      />
      <button type="submit" style={styles.button}>
        Post
      </button>
    </form>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #ddd",
  },
  textarea: {
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #ddd",
    minHeight: "100px",
  },
  button: {
    padding: "0.75rem 1.5rem",
    borderRadius: "0.75rem",
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
};

export default PostForm;
