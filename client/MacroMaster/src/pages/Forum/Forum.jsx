import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

const ForumStyles = {
  container: "max-w-5xl mx-auto py-12 px-4 space-y-12",
  heading: "text-4xl font-bold text-center text-green-500 mb-8",
  postsWrapper: "flex flex-col gap-8",
};

const Forum = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts/");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={ForumStyles.container}>
      <h1 className={ForumStyles.heading}>Forum</h1>
      <PostForm onPostCreated={fetchPosts} />
      <div className={ForumStyles.postsWrapper}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={fetchPosts} />
        ))}
      </div>
    </div>
  );
};

export default Forum;
