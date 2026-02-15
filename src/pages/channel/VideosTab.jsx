import React from "react";

export default function VideosTab() {
  return (
    <div className="px-10 py-6">
      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((video) => (
          <div key={video} className="space-y-2">
            <div className="bg-gray-200 h-40 rounded-xl"></div>
            <p className="font-medium">Video Title {video}</p>
            <p className="text-sm text-gray-500">25K views • 1 week ago</p>
          </div>
        ))}
      </div>
    </div>
  );
}
