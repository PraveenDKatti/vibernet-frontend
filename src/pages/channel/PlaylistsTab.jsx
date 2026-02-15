import React from "react";

export default function PlaylistsTab() {
  return (
    <div className="px-10 py-6">
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((playlist) => (
          <div key={playlist} className="space-y-2">
            <div className="bg-gray-300 h-40 rounded-xl relative">
              <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                12 Videos
              </div>
            </div>
            <p className="font-medium">Playlist {playlist}</p>
            <p className="text-sm text-gray-500">Updated yesterday</p>
          </div>
        ))}
      </div>
    </div>
  );
}
