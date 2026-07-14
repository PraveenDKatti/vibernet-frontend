import React, { useState, useEffect } from "react";
import useAuthStore from "../../store/authStore";
import { Image, Video, AlignStartVertical } from "lucide-react";
import ImagePost from "./ImagePost";
import VideoPost from "./VideoPost";
import PollPost from "./PollPost";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";

export default function PostEditor({
  mode = "create",           // "create" | "edit"
  initialData = null,        // post object when editing
  onSubmit,                  // function passed from parent
  onCancel,                  // optional (used in edit modal)
}) {
  const { user } = useAuthStore();

  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState("text");
  const [images, setImages] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [poll, setPoll] = useState({
    question: "",
    options: ["", ""],
  });

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setPostContent(initialData.postContent || "");
      setPostType(initialData.postType || "text");
      setVideoId(initialData.videoId || "");
      setPoll(
        initialData.poll || { question: "", options: ["", ""] }
      );
    }
  }, [mode, initialData]);

  function resetForm() {
    setPostContent("");
    setImages([]);
    setVideoId("");
    setPoll({ question: "", options: ["", ""] });
    setPostType("text");
  }

  const handleImagePost = (e, fn) => {
    if (fn) {
      setImages(fn);
    } else {
      const imageFiles = Array.from(e.target.files || []);
      setImages((prev) => {
        const combined = [...prev, ...imageFiles];
        return combined.slice(0, 4);
      });
    }
  };

  async function handleSubmit() {
    try {
      if (!postContent && postType === "text") return

      let payload = { postContent, postType, }

      // IMAGE POST (FormData)
      if (postType === "image") {
        const formData = new FormData();
        formData.append("content", postContent);
        formData.append("type", "image");

        images.forEach((file) => {
          formData.append("images", file);
        });

        payload = formData;
      }

      // OTHER TYPES (JSON)
      else {
        if (postType === "video") {
          payload.videoId = videoId;
        }

        if (postType === "poll") {
          payload.poll = poll;
        }
      }

      await onSubmit(payload);

      // Reset only if creating
      if (mode === "create") {
        resetForm();
      }

      // Close editor if editing
      if (mode === "edit" && onCancel) {
        onCancel();
      }

    } catch (error) {
      console.error("Post submit error:", error);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-300 p-6 space-y-4 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 w-2/3">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <img
          src={user?.avatar}
          alt={user?.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{user?.fullName}</p>
      </div>

      {/* TEXTAREA */}
      <Textarea
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        rows={2}
        className="w-full resize-none border-zinc-150 dark:border-zinc-800"
      />

      {/* MEDIA SECTION */}
      <div>
        {postType === "image" && (
          <ImagePost
            images={images}
            handleImagePost={handleImagePost}
          />
        )}

        {postType === "video" && (
          <VideoPost
            videoId={videoId}
            setVideoId={setVideoId}
          />
        )}

        {postType === "poll" && (
          <PollPost
            poll={poll}
            setPoll={setPoll}
          />
        )}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center pt-2">

        {/* TYPE SELECTORS */}
        <div className="flex gap-4">
          <div
            onClick={() => setPostType("image")}
            className="flex rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 gap-2 items-center text-gray-600 dark:text-zinc-400 cursor-pointer transition-colors"
          >
            <Image size={20} />
            <span className="text-sm font-medium">Image</span>
          </div>

          <div
            onClick={() => setPostType("video")}
            className="flex rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 gap-2 items-center text-gray-600 dark:text-zinc-400 cursor-pointer transition-colors"
          >
            <Video size={20} />
            <span className="text-sm font-medium">Video</span>
          </div>

          <div
            onClick={() => setPostType("poll")}
            className="flex rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 gap-2 items-center text-gray-600 dark:text-zinc-400 cursor-pointer transition-colors"
          >
            <AlignStartVertical size={20} />
            <span className="text-sm font-medium">Poll</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">
          <Button
            onClick={mode === "edit" ? onCancel : resetForm}
            variant="ghost"
            size="sm"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            size="sm"
          >
            {mode === "edit" ? "Update" : "Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}