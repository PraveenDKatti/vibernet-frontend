import React, { useEffect, useState } from "react";
import { getAllVideos } from "../../../api/video.api";

export default function VideoPost({ videoId, setVideoId }) {
  const [uploadedVideos, setUploadedVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await getAllVideos();
        setUploadedVideos(response.data.docs || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    }

    fetchVideos();
  }, []);

  // When user selects a video
  const handleSelectVideo = (e) => {
    setVideoId(e.target.value); // propagate to PostEditor
  };

  return (
    <div className="space-y-2">
      {/* Video selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {uploadedVideos.map((video) => (
          <label
            key={video._id}
            className={`border rounded-lg p-2 cursor-pointer ${
              videoId === video._id ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="selectedVideo"
              value={video._id}
              checked={videoId === video._id}
              onChange={handleSelectVideo}
              className="hidden"
            />
            <video
              src={video.videoFile}
              className="w-full h-32 rounded-lg"
              controls
            />
          </label>
        ))}
      </div>

      {/* Preview */}
      {videoId && (
        <div className="mt-2 aspect-video w-full">
          <video
            src={uploadedVideos.find((v) => v._id === videoId)?.videoFile}
            controls
            className="w-full h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}