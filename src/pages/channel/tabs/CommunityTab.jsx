import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { channelPosts } from "../../../api/post.api";
import PostForm from "../../../components/community/PostForm";
import PostCard from "../../../components/community/PostCard";

export default function CommunityTab() {
  const { username } = useParams();
  const { user } = useAuthStore();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOwner = user?.username === username;

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await channelPosts(username);
      setPosts(response?.data || []);
    } catch (error) {
      console.error("Fetch posts error:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      fetchPosts();
    }
  }, [username, fetchPosts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isOwner && <PostForm setPosts={setPosts} />}

      {posts.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">No posts yet</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} setPosts={setPosts} />
          ))}
        </div>
      )}
    </div>
  );
}