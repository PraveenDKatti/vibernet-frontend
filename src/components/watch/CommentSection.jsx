import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThumbsUp, ThumbsDown, EllipsisVertical, Laugh } from "lucide-react";
import {
    getVideoComments,
    addVideoComment,
    updateComment,
    deleteComment,
} from "../../api/comment.api";
import { toggleLikeReaction } from '../../api/like.api'
import useAuthStore from "../../store/authStore";
import useVideoStore from '../../store/videoStore'
import { formatActionTime } from "../../utils/formatActionTime";
import EmojiPicker from "emoji-picker-react";

export default function CommentSection() {
    const { user, isAuthenticated } = useAuthStore();
    const videoId = useVideoStore((s) => s.currentVideo._id)
    const commentsCount = useVideoStore((s) => s.currentVideo.commentsCount)

    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openEmoji, setOpenEmoji] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        if (videoId) fetchComments();
    }, [videoId]);

    const fetchComments = async () => {
        try {
            const { data } = await getVideoComments(videoId);
            setComments(data?.docs || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleReaction = async (commentId, type) => {
        try {
            await toggleLikeReaction({
                targetId: commentId,
                type,
                targetType: "comment"
            });
            fetchComments(); // refresh counts and flags
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = async () => {
        if (!text.trim()) return;
        try {
            setLoading(true);
            await addVideoComment({ videoId, content: text });
            setText("");
            fetchComments();
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id) => {
        if (!text.trim()) return;
        try {
            setLoading(true);
            await updateComment({ commentId: id, content: text });
            setText("");
            setActiveDropdown(null);
            fetchComments();
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await deleteComment(id);
            setActiveDropdown(null);
            fetchComments();
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = (id) =>
        setActiveDropdown((prev) => (prev === id ? null : id));

    const onEmojiClick = (emoji) => {
        setText((prev) => prev + emoji.emoji);
        setOpenEmoji(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="flex justify-center text-sm items-center min-h-20 text-gray-600">
                Comments are turned off..
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            <p className="text-xl font-semibold">
                {commentsCount || 0} comments
            </p>

            {/* Add Comment */}
            <div className="flex space-x-4 mb-10">
                <label className="rounded-full w-8 h-8 flex items-center justify-center bg-green-600 text-white text-xl">
                    {user?.username?.[0]?.toUpperCase()}
                </label>

                <div className="flex-1 space-y-2">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        type="text"
                        placeholder="Add a comment"
                        className="w-full text-sm border-gray-300 outline-none border-b pb-1"
                    />

                    <div className="flex justify-between">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setOpenEmoji((p) => !p)}
                                className="text-xl hover:scale-110 transition-transform"
                            >
                                <Laugh size={30} strokeWidth={1.5} className="text-gray-500" />
                            </button>

                            {openEmoji && (
                                <div className="absolute mt-2 z-50">
                                    <EmojiPicker onEmojiClick={onEmojiClick} />
                                </div>
                            )}
                        </div>

                        <div className="text-sm font-medium space-x-4">
                            <button
                                onClick={() => setText("")}
                                className="px-3 py-2 hover:bg-zinc-200 rounded-full"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleAdd}
                                className="bg-black text-white px-3 py-2 rounded-full disabled:opacity-50"
                            >
                                Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments */}
            {comments.length === 0 ? (
                <div className="text-center text-gray-500">No comments yet.</div>
            ) : (
                <div className="space-y-6">
                    {comments.map((c) => {
                        const isOwner = user?._id === c?.owner?._id;

                        return (
                            <div key={c._id} className="flex space-x-4">
                                <Link to={`/${c?.owner?.username}`}>
                                    <img
                                        src={c?.owner?.avatar}
                                        alt="avatar"
                                        className="rounded-full w-9 h-9 object-cover hover:opacity-85 transition cursor-pointer"
                                    />
                                </Link>

                                <div className="flex-1">
                                    <div className="flex space-x-4 text-sm">
                                        <Link to={`/${c?.owner?.username}`} className="font-medium hover:underline cursor-pointer">
                                            {c?.owner?.username || "Unknown"}
                                        </Link>
                                        <p className="text-gray-500">
                                            {formatActionTime(c.createdAt)}
                                        </p>
                                    </div>

                                    <p className="mt-1">{c.content}</p>

                                    <div className="flex space-x-4 mt-2 text-sm">
                                        <div className="flex space-x-2 items-center">
                                            <ThumbsUp
                                                size={18}
                                                fill={c.isLiked ? "black" : "white"}
                                                onClick={() => handleReaction(c._id, "like")}
                                            />
                                            <p className="text-gray-500">{c.likesCount || 0}</p>
                                        </div>

                                        <div className="flex space-x-2 items-center">
                                            <ThumbsDown
                                                size={18}
                                                fill={c.isDisliked ? "black" : "white"}
                                                onClick={() => handleReaction(c._id, "dislike")}
                                            />
                                            <p className="text-gray-500">{c.dislikesCount || 0}</p>
                                        </div>

                                        <button className="font-medium hover:underline">
                                            Reply
                                        </button>
                                    </div>
                                </div>

                                {/* 3-dot menu */}
                                <div className="relative">
                                    <EllipsisVertical
                                        className="cursor-pointer"
                                        size={18}
                                        onClick={() => toggleDropdown(c._id)}
                                    />

                                    {activeDropdown === c._id && (
                                        <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.15)] py-1 z-50">
                                            {isOwner ? (
                                                <>
                                                    <button
                                                        onClick={() => handleEdit(c._id)}
                                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(c._id)}
                                                        className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-lg"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                                                >
                                                    Report
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}