import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { getAllVideos } from '../../api/video.api';
import { formatDistanceToNow } from "date-fns";
import { EllipsisVertical } from 'lucide-react'

export default function VideosTab() {
  const { username } = useParams();
  const { user } = useAuthStore();

  const [channelVideos, setChannelVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOwner = user?.username === username;

  useEffect(() => {
    async function fetchChannelData() {
      try {
        setLoading(true);
        const resVideos = await getAllVideos({username});
        setChannelVideos(resVideos.data.docs);
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

  if (!channelVideos.length) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500">Videos not found</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {channelVideos.map((video) => (
          <div key={video._id} className="hover:bg-blue-50 rounded-2xl space-y-2 cursor-pointer" onClick={() => navigate(`/Watch/${video._id}`)}>
            <div className="relative h-50">
              <img src={video.thumbnail} className='h-full w-full rounded-xl' />
              <div
                className='absolute bg-black/60 text-white font-medium right-2 bottom-2 px-1 py-0.5 text-xs rounded-md'
              >{parseInt(video.duration / 60)}:{(video.duration) % 60}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex flex-1 space-x-3">
                <img src={video.owner.avatar} alt={video.owner.username} className='rounded-full w-10 h-10' />
                <div>
                  <p className="font-medium">{video.title}</p>
                  <p className="text-sm text-gray-500">{video.owner.username}</p>
                  <div className='flex space-x-2 text-gray-500 text-sm'>
                    <span>{video.views}</span>
                    <span className="text-zinc-700">•</span>
                    <span>{formatDistanceToNow(new Date(video.createdAt))} ago</span>
                  </div>
                </div>
              </div>
              <EllipsisVertical size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
