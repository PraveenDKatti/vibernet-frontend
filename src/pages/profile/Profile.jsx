import React from "react";
import History from './History'
import PlayList from './PlayList'
import LikedVideos from './LikedVideos'
import useAuthStore from "../../store/authStore";
import PageLoader from "../../components/common/PageLoader";

export default function Profile() {
  const { user, loading } = useAuthStore();

  if (loading) return <PageLoader />;
  if(!user) return <p>Something Went Wrong..</p>

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
        <History user={user} loading={loading} />
        <PlayList user={user} loading={loading} />
        <LikedVideos user={user} loading={loading} />
      </div>
    </div>
  );
}
