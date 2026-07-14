import { useNavigate } from "react-router-dom";
import { formatActionTime } from "../../utils/formatActionTime";
import { formatDuration } from "../../utils/formatDuration"
import { formatCount } from "../../utils/formatCount";

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const duration = formatDuration(video.duration)
  const viewsCount = formatCount(video.views)

  return (
    <div
      className="flex flex-col gap-3 cursor-pointer group"
      onClick={() => navigate(`/watch/${video._id}`)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white font-medium">
          {duration}
        </div>
      </div>

      {/* Details */}
      <div className="flex gap-3 px-1">
        <img
          src={video.owner?.avatar}
          className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-100 dark:border-zinc-800 hover:opacity-85 transition"
          alt="avatar"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/${video.owner?.username}`);
          }}
        />
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-sm font-semibold line-clamp-2 leading-tight text-zinc-900 dark:text-zinc-100">
            {video.title}
          </h3>
          <p
            className="text-xs text-zinc-500 mt-1 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${video.owner?.username}`);
            }}
          >
            {video.owner?.fullName}
          </p>
          <div className="text-[11px] text-zinc-500 flex items-center gap-1">
            <span>{viewsCount}</span>
            <span>•</span>
            <span>{formatActionTime(video.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}