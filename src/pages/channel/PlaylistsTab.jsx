import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { getUserPlaylists } from "../../api/playlist.api";
import { useParams } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function PlaylistsTab() {
  const { username } = useParams();
  const { user } = useAuthStore();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOwner = user?.username === username;

  useEffect(() => {
    async function getPlaylists() {
      try {
        setLoading(true);
        const response = await getUserPlaylists(username);
        setPlaylists(response.data.docs || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      getPlaylists();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500">Loading playlists...</p>
      </div>
    );
  }

  if (!playlists.length) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500">Playlists not found</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      {/* 3 columns on laptop/desktop, 4 columns on big TV screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {playlists.map((plist) => (
          <div key={plist._id} className="space-y-3 group cursor-pointer">
            
            {/* Thumbnail */}
            <div className="bg-gray-300 h-40 rounded-xl relative overflow-hidden">
              
              {/* Videos Count */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {plist?.videos?.length || 0} Videos
              </div>

              {/* Menu Icon */}
              <button className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition">
                <EllipsisVertical size={16} className="text-white" />
              </button>
            </div>

            {/* Playlist Info */}
            <div className="space-y-1">
              <p className="font-semibold text-sm line-clamp-1">
                {plist?.title || "Untitled Playlist"}
              </p>

              <div className="text-xs text-gray-500 flex items-center gap-1">
                <span>{plist?.videos?.length || 0} videos</span>
                <span className="text-zinc-700">•</span>
                <span>
                  {plist?.updatedAt
                    ? formatDistanceToNow(new Date(plist.updatedAt), {
                        addSuffix: true,
                      })
                    : "Recently updated"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}