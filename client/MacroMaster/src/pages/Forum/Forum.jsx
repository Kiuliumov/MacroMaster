import { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

const Forum = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts/");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Forum</h1>
      <PostForm onPostCreated={fetchPosts} />
      <div style={styles.postsWrapper}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={fetchPosts} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "64rem",
    margin: "0 auto",
    padding: "3rem 1rem",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "2rem",
  },
  postsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
};

export default Forum;
