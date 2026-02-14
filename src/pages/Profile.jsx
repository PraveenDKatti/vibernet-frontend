import React from "react";
import useAuthStore from "../store/authStore";
import { CircleChevronLeft, CircleChevronRight, EllipsisVertical } from "lucide-react";
import PageLoader from "../components/common/PageLoader";

export default function Profile() {
  const { user, loading } = useAuthStore();

  const mockVideos = Array(4).fill(0);

  const renderHistory = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-bold">History</p>
            <p className="text-sm text-gray-500">videos watched</p>
          </div>
          <div className="flex text-sm font-medium h-10 space-x-2">
            <button className="w-20 rounded-full border border-gray-200">
              View all
            </button>
            <CircleChevronLeft size={40} strokeWidth={0.6} className="text-gray-300" />
            <CircleChevronRight size={40} strokeWidth={0.6} className="text-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {mockVideos.map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-38 bg-black rounded-md"></div>
              <div className="flex space-x-4">
                <img className="w-10 h-10 rounded-full bg-gray-500" />
                <div className="flex-1">
                  <p>History Video Title</p>
                  <p className="text-gray-500">History description</p>
                </div>
                <EllipsisVertical size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPlaylist = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-bold">PlayList</p>
            <p className="text-sm text-gray-500">your created playlists</p>
          </div>
          <div className="flex text-sm font-medium h-10 space-x-2">
            <button className="w-20 rounded-full border border-gray-200">
              View all
            </button>
            <CircleChevronLeft size={40} strokeWidth={0.6} className="text-gray-300" />
            <CircleChevronRight size={40} strokeWidth={0.6} className="text-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {mockVideos.map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-38 bg-blue-900 rounded-md"></div>
              <div className="flex space-x-4">
                <img className="w-10 h-10 rounded-full bg-gray-500" />
                <div className="flex-1">
                  <p>Playlist Name</p>
                  <p className="text-gray-500">Playlist details</p>
                </div>
                <EllipsisVertical size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWatchLater = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-bold">Watch Later</p>
            <p className="text-sm text-gray-500">saved for later</p>
          </div>
          <div className="flex text-sm font-medium h-10 space-x-2">
            <button className="w-20 rounded-full border border-gray-200">
              View all
            </button>
            <CircleChevronLeft size={40} strokeWidth={0.6} className="text-gray-300" />
            <CircleChevronRight size={40} strokeWidth={0.6} className="text-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {mockVideos.map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-38 bg-green-900 rounded-md"></div>
              <div className="flex space-x-4">
                <img className="w-10 h-10 rounded-full bg-gray-500" />
                <div className="flex-1">
                  <p>Watch Later Video</p>
                  <p className="text-gray-500">Saved video description</p>
                </div>
                <EllipsisVertical size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLikedVideos = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-bold">Liked Videos</p>
            <p className="text-sm text-gray-500">videos you liked</p>
          </div>
          <div className="flex text-sm font-medium h-10 space-x-2">
            <button className="w-20 rounded-full border border-gray-200">
              View all
            </button>
            <CircleChevronLeft size={40} strokeWidth={0.6} className="text-gray-300" />
            <CircleChevronRight size={40} strokeWidth={0.6} className="text-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {mockVideos.map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-38 bg-red-900 rounded-md"></div>
              <div className="flex space-x-4">
                <img className="w-10 h-10 rounded-full bg-gray-500" />
                <div className="flex-1">
                  <p>Liked Video Title</p>
                  <p className="text-gray-500">Liked video description</p>
                </div>
                <EllipsisVertical size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading || !user) return <PageLoader />;

  return (
    <div>
      {/* Profile Header */}
      <div className="flex h-[135px] items-center gap-4">
        <img src={user.avatar} className="rounded-full w-30 h-30" />
        <div className="space-y-2">
          <p className="text-4xl font-bold">{user.fullName}</p>
          <div className="flex text-sm space-x-1 text-gray-500">
            <p>@{user.username}</p>
            <span>•</span>
            <p>View Channel</p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-10 mt-6">
        {renderHistory()}
        {renderPlaylist()}
        {renderWatchLater()}
        {renderLikedVideos()}
      </div>
    </div>
  );
}
