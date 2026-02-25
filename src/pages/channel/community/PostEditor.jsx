import React, { useState, useEffect } from "react";
import useAuthStore from "../../../store/authStore";
import { Image, Video, AlignStartVertical } from "lucide-react";
import ImagePost from "./ImagePost";
import VideoPost from "./VideoPost";
import PollPost from "./PollPost";

export default function PostEditor({
  mode = "create",           // "create" | "edit"
  initialData = null,        // post object when editing
  onSubmit,                  // function passed from parent
  onCancel,                  // optional (used in edit modal)
}) {
  const { user } = useAuthStore();

  const [content, setContent] = useState("");
  const [type, setType] = useState("text");
  const [images, setImages] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [poll, setPoll] = useState({
    question: "",
    options: ["", ""],
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setContent(initialData.content || "");
      setType(initialData.type || "text");
      setVideoId(initialData.videoId || "");
      setPoll(
        initialData.poll || { question: "", options: ["", ""] }
      );

      // ⚠️ Images are files in create mode,
      // but in edit mode they are URLs.
      // You may want to handle existing images differently.
    }
  }, [mode, initialData]);

  function resetForm() {
    setContent("");
    setImages([]);
    setVideoId("");
    setPoll({ question: "", options: ["", ""] });
    setType("text");
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
      if (!content && type === "text") return

      let payload = { content, type,}

      // IMAGE POST (FormData)
      if (type === "image") {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("type", "image");

        images.forEach((file) => {
          formData.append("images", file);
        });

        payload = formData;
      }

      // OTHER TYPES (JSON)
      else {

        if (type === "video") {
          payload.videoId = videoId;
        }

        if (type === "poll") {
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
    <div className="rounded-2xl border border-gray-300 p-4 space-y-4 bg-white w-2/3">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <img
          src={user?.avatar}
          alt={user?.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="font-medium">{user?.fullName}</p>
      </div>

      {/* TEXTAREA */}
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
        className="w-full resize-none rounded-lg px-3 py-2 focus:outline-none"
      />

      {/* MEDIA SECTION */}
      <div>
        {type === "image" && (
          <ImagePost
            images={images}
            handleImagePost={handleImagePost}
          />
        )}

        {type === "video" && (
          <VideoPost
            videoId={videoId}
            setVideoId={setVideoId}
          />
        )}

        {type === "poll" && (
          <PollPost
            poll={poll}
            setPoll={setPoll}
          />
        )}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center">

        {/* TYPE SELECTORS */}
        <div className="flex gap-4">
          <div
            onClick={() => setType("image")}
            className="flex rounded-full hover:bg-zinc-200 p-2 gap-2 items-center text-gray-600 cursor-pointer"
          >
            <Image size={20} />
            <span className="text-sm font-medium">Image</span>
          </div>

          <div
            onClick={() => setType("video")}
            className="flex rounded-full hover:bg-zinc-200 p-2 gap-2 items-center text-gray-600 cursor-pointer"
          >
            <Video size={20} />
            <span className="text-sm font-medium">Video</span>
          </div>

          <div
            onClick={() => setType("poll")}
            className="flex rounded-full hover:bg-zinc-200 p-2 gap-2 items-center text-gray-600 cursor-pointer"
          >
            <AlignStartVertical size={20} />
            <span className="text-sm font-medium">Poll</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">
          <button
            onClick={mode === "edit" ? onCancel : resetForm}
            className="px-4 py-2 hover:bg-zinc-200 text-black rounded-full"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-zinc-700 hover:bg-black text-white rounded-full"
          >
            {mode === "edit" ? "Update" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}