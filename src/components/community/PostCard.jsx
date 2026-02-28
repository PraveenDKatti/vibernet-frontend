import React, { useState, useRef, useEffect } from "react";
import useAuthStore from "../../store/authStore";
import {
  EllipsisVertical,
  ThumbsUp,
  ThumbsDown,
  MessageSquareText,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  updatePost,
  deletePost,
} from "../../api/post.api";
import {toggleLikeReaction} from '../../api/like.api';

import PostEditor from "./PostEditor";

export default function PostCard({ post, setPosts }) {
  const { user } = useAuthStore();

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dropdownRef = useRef(null);

  const isOwner = user?._id === post?.owner?._id;

  async function handleLike() {
    try {
      await toggleLikeReaction({ targetId: post._id, type: "like", targetType: "post" });
      setLiked((prev) => !prev);
      if (disliked) setDisliked(false);
    } catch (error) {
      console.error("Like error:", error);
    }
  }

  async function handleDislike() {
    try {
      await toggleLikeReaction({ targetId: post._id, type: "dislike", targetType: "post" });
      setDisliked((prev) => !prev);
      if (liked) setLiked(false);
    } catch (error) {
      console.error("Dislike error:", error);
    }
  }

  function toggleDropdown() {
    setShowDropdown((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleUpdate(payload) {
    try {
      const response = await updatePost(post._id, payload);

      // Update post in parent list
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === post._id ? response.data : p
        )
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  }

  async function handleDelete() {
    try {
      await deletePost(post._id);

      setPosts((prevPosts) =>
        prevPosts.filter((p) => p._id !== post._id)
      );

      setShowDropdown(false);
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  if (isEditing) {
    return (
      <PostEditor
        mode="edit"
        initialData={post}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="w-2/3">
      <div className="flex flex-col space-y-4 border p-5 rounded-xl border-gray-300 bg-white">

        {/* HEADER */}
        <div className="flex gap-4 items-start relative">
          <img
            src={post?.owner?.avatar}
            className="rounded-full w-10 h-10 object-cover"
            alt="avatar"
          />

          <div className="flex-1 flex items-center gap-4">
            <p className="font-medium">
              {post?.owner?.fullName}
            </p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>

          {/* Dropdown */}
          {isOwner && (
            <div className="relative" ref={dropdownRef}>
              <EllipsisVertical
                className="cursor-pointer"
                size={18}
                onClick={toggleDropdown}
              />

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-md py-1 z-50">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="text-gray-800">{post.content}</div>

        {/* MEDIA */}
        <div>
          {/* Images */}
          {post.type === "image" && post.images?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {post.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="post"
                  className="rounded-lg object-cover w-full max-h-96"
                />
              ))}
            </div>
          )}

          {/* Video */}
          {post.type === "video" && post.video && (
            <video controls className="rounded-lg w-full max-h-[500px]">
              <source src={post.video.videoFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Poll */}
          {post.type === "poll" && post.poll?.options?.length > 0 && (
            <div className="space-y-2">
              {post.poll.options.map((option, index) => {
                const percentage =
                  post.poll.totalVotes > 0
                    ? Math.round(
                      (option.votes / post.poll.totalVotes) * 100
                    )
                    : 0;

                return (
                  <div
                    key={index}
                    className="border rounded-lg p-2 relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-blue-100"
                      style={{ width: `${percentage}%` }}
                    ></div>

                    <div className="relative flex justify-between">
                      <span>{option.text}</span>
                      <span>{percentage}%</span>
                    </div>
                  </div>
                );
              })}

              <p className="text-xs text-gray-500">
                {post.poll.totalVotes} votes
              </p>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-6">
            {/* Like */}
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={handleLike}
            >
              <ThumbsUp
                size={20}
                className={liked ? "text-blue-600" : "text-gray-600"}
              />
              <p>{post.likesCount + (liked ? 1 : 0)}</p>
            </div>

            {/* Dislike */}
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={handleDislike}
            >
              <ThumbsDown
                size={20}
                className={disliked ? "text-red-600" : "text-gray-600"}
              />
              <p>{post.dislikesCount + (disliked ? 1 : 0)}</p>
            </div>
          </div>

          {/* Comments */}
          <div className="flex gap-2 items-center cursor-pointer">
            <p>{post.commentsCount}</p>
            <MessageSquareText size={20} />
          </div>
        </div>

      </div>
    </div>
  );
}