import React from "react";

export default function CommunityTab() {
  return (
    <div className="px-10 py-6 space-y-6">
      {[1, 2].map((post) => (
        <div key={post} className="border rounded-xl p-4 space-y-3">
          <p className="font-semibold">Channel Name</p>
          <p className="text-gray-700">
            This is a community post example. You can share updates,
            polls, or announcements here.
          </p>
          <div className="text-sm text-gray-500">
            2 days ago • 120 Likes
          </div>
        </div>
      ))}
    </div>
  );
}
