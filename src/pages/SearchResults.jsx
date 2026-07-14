import { EllipsisVertical } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import client from '../api/client'
import { formatActionTime } from "../utils/formatActionTime"
import PageLoader from '../components/common/PageLoader'
import { formatDuration } from '../utils/formatDuration'
import { formatCount } from '../utils/formatCount'

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const query = searchParams.get("search_query");

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;

            setLoading(true);
            try {
                const response = await client.get(`/videos?query=${query}`);
                const data = response?.data?.data?.docs || response?.data?.data || [];
                setVideos(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Search fetch error", error);
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    if (loading) {
        return <PageLoader />;
    }

    if (!videos.length) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-500">
                No videos found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 pt-4 min-h-screen">
            {videos.map((video) => {
                const duration = formatDuration(video.duration)
                const viewsCount = formatCount(video.views)

                return (
                    <div
                        key={video._id}
                        className="flex flex-col sm:flex-row gap-4 hover:bg-blue-50 dark:hover:bg-zinc-800/50 p-2 rounded-2xl cursor-pointer transition-colors"
                        onClick={() => navigate(`/watch/${video._id}`)}
                    >
                        {/* Thumbnail */}
                        <div className="w-full sm:w-[280px] md:w-[360px] lg:w-[450px] aspect-video relative shrink-0">
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="h-full w-full rounded-xl object-cover"
                            />
                            <div className="absolute bg-black/60 text-white font-medium right-2 bottom-2 px-1 py-0.5 text-xs rounded-md">
                                {duration}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-2 py-1">
                            <div className='flex justify-between items-start gap-2'>
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-base md:text-lg line-clamp-2 leading-snug">
                                        {video.title}
                                    </p>
                                    <div className='flex items-center space-x-1.5 text-gray-500 text-sm mt-1'>
                                        <span>{viewsCount} views</span>
                                        <span>•</span>
                                        <span>
                                            {formatActionTime(video.createdAt)}
                                        </span>
                                    </div>
                                </div>
                                <EllipsisVertical size={20} className="shrink-0 text-gray-500 hover:text-gray-800" />
                            </div>

                            {/* Owner */}
                            <div className="flex items-center gap-2 py-1">
                                <img
                                    src={video.owner?.avatar}
                                    alt={video.owner?.username}
                                    className="rounded-full w-8 h-8 object-cover cursor-pointer hover:opacity-85 transition shrink-0"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/${video.owner?.username}`);
                                    }}
                                />
                                <p
                                    className="text-sm text-gray-500 cursor-pointer hover:text-zinc-800 hover:underline truncate"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/${video.owner?.username}`);
                                    }}
                                >
                                    {video.owner?.username}
                                </p>
                            </div>

                            {/* Description */}
                            <div className="text-sm text-gray-500 line-clamp-2 max-w-2xl">
                                {video.description}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default SearchResults;