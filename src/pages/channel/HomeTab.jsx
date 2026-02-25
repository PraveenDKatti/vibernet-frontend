import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { getAllVideos } from "../../api/video.api";

export default function VideosTab() {
  const { username } = useParams();
  const { user } = useAuthStore();

  const [videos, setVideos] = useState([0, 0]);
  const [loading, setLoading] = useState(true);

  const isOwner = user?.username === username;

  useEffect(() => {
    async function fetchChannelData() {
      try {
        setLoading(true);
        const resVideos = await getAllVideos({ username });
        setVideos(resVideos.data.docs);
      } catch (error) {
        console.error("Failed to fetch channel data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchChannelData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500">Loading channel...</p>
      </div>
    );
  }

  if (!videos.length) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500">Videos not found</p>
      </div>
    );
  }

  const featuredVideos = videos
  const latestVideos = videos;

  return (
    <div className="py-6 space-y-8">
      {/* Featured Video */}
      <div className="space-y-4">
        <p className="font-medium text-xl">Featured Videos</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {featuredVideos.map((video) => (
            <div key={video._id} className="space-y-2">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover rounded-xl"
              />
              <p className="font-medium line-clamp-2">
                {video.title}
              </p>
              <p className="text-sm text-gray-500">
                {video.views} views
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Uploads */}
      <div className="space-y-4">
        <p className="font-medium text-xl">Latest Uploads</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {latestVideos.map((video) => (
            <div key={video._id} className="space-y-2">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover rounded-xl"
              />
              <p className="font-medium line-clamp-2">
                {video.title}
              </p>
              <p className="text-sm text-gray-500">
                {video.views} views
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}