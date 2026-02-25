import React from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { createPost } from "../../../api/post.api";
import PostEditor from "./PostEditor";

export default function PostForm({ setPosts }) {
  const { username } = useParams();
  const { user } = useAuthStore();

  const isOwner = user?.username === username;
  if (!isOwner) return null;

  async function handleCreate(payload) {
    try {
      const response = await createPost(payload);

      // Instantly add new post to top
      setPosts((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error("Create post error:", error);
    }
  }

  return (
    <PostEditor
      mode="create"
      onSubmit={handleCreate}
    />
  );
}