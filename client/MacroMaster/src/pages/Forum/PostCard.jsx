import axios from "axios";
import CommentList from "./CommentList";

const PostCard = ({ post, onLike }) => {
  const toggleLike = async () => {
    try {
      await axios.post(`/api/posts/${post.id}/like/`);
      onLike();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{post.title}</h2>
        <button onClick={toggleLike} style={styles.likeButton}>
          ❤️ {post.likes_count}
        </button>
      </div>
      <p style={styles.body}>{post.body}</p>
      <CommentList postId={post.id} />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600",
  },
  likeButton: {
    color: "#3b82f6",
    fontWeight: "600",
    cursor: "pointer",
    background: "none",
    border: "none",
  },
  body: {
    marginBottom: "1rem",
    color: "#374151",
  },
};

export default PostCard;