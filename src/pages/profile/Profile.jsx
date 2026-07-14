import React from "react";
import History from './History'
import PlayList from './PlayList'
import WatchLater from './WatchLater'
import LikedVideos from './LikedVideos'
import useAuthStore from "../../store/authStore";
import PageLoader from "../../components/common/PageLoader";

export default function Profile() {
  const { user, loading } = useAuthStore();

  if (loading) return <PageLoader />;
  if (!user) return <p>Something Went Wrong..</p>

  return (
    <div className="px-2 md:px-0">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row h-auto items-center sm:items-start text-center sm:text-left gap-4 py-6 border-b border-gray-200 dark:border-zinc-800">
        <img src={user.avatar} className="rounded-full w-24 h-24 sm:w-30 sm:h-30 object-cover shrink-0" />
        <div className="space-y-2 min-w-0">
          <p className="text-3xl sm:text-4xl font-bold truncate leading-tight">{user.fullName}</p>
          <div className="flex justify-center sm:justify-start text-sm space-x-1.5 text-gray-500">
            <p>@{user.username}</p>
            <span>•</span>
            <p className="hover:underline cursor-pointer">View Channel</p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-10 mt-6">
        <History user={user} />
        <PlayList user={user} />
        <LikedVideos user={user} />
        <WatchLater user={user} />
      </div>
    </div>
  );
}
