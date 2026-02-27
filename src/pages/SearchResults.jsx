import { EllipsisVertical } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import client from '../api/client'
import { formatDistanceToNow } from "date-fns"
import PageLoader from '../components/common/PageLoader'

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

    const formatDuration = (duration) => {
        if (!duration) return "0:00";
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

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
        <div className="grid grid-cols-1 gap-4 min-h-screen">
            {videos.map((video) => (
                <div
                    key={video._id}
                    className="flex gap-4 hover:bg-blue-50 rounded-2xl cursor-pointer transition"
                    onClick={() => navigate(`/watch/${video._id}`)}
                >
                    {/* Thumbnail */}
                    <div className="md:w-[500px] relative h-[280px] flex-shrink-0">
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="h-full w-full rounded-xl object-cover"
                        />
                        <div className="absolute bg-black/60 text-white font-medium right-2 bottom-2 px-1 py-0.5 text-xs rounded-md">
                            {formatDuration(video.duration)}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                        <div className='flex justify-between'>
                            <div>
                                <p className="font-medium line-clamp-2">
                                    {video.title}
                                </p>
                                <div className='flex space-x-2 text-gray-500 text-sm'>
                                    <span>{video.views ?? 0} views</span>
                                    <span>•</span>
                                    <span>
                                        {video.createdAt
                                            ? formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })
                                            : ""}
                                    </span>
                                </div>
                            </div>
                            <EllipsisVertical size={20} />
                        </div>

                        {/* Owner */}
                        <div className="flex items-center gap-2">
                            <img
                                src={video.owner?.avatar}
                                alt={video.owner?.username}
                                className="rounded-full w-10 h-10 object-cover"
                            />
                            <p className="text-sm text-gray-500">
                                {video.owner?.username}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="text-sm text-gray-600 line-clamp-2">
                            {video.description}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;