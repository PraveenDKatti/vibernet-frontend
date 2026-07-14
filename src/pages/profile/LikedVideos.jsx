import { CircleChevronLeft, CircleChevronRight, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { getLikedVideos } from '../../api/like.api'
import { formatActionTime } from "../../utils/formatActionTime"
import PageLoader from "../../components/common/PageLoader"
import { formatCount } from '../../utils/formatCount'

export default function LikedVideos({ loading }) {
    const [likedFeed, setLikedFeed] = useState() //liked videos

    useEffect(() => {
        async function fetchLikedVideos() {
            const response = await getLikedVideos()
            console.log(response)
            setLikedFeed(response.data)
        }
        fetchLikedVideos()
    }, [])

    if (loading) return <PageLoader />
    if (!likedFeed) return <p>your liked videos appears here</p>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {likedFeed.map((v) => {
                    const viewsCount = formatCount(v.views)

                    return (
                        <div key={v._id} className="space-y-2 p-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 rounded-xl transition-colors">
                            <div className="aspect-video w-full">
                                <img src={v.thumbnail} className="w-full h-full rounded-md object-cover" />
                            </div>
                            <div className="flex space-x-3 text-sm">
                                <img src={v.owner.avatar} className="w-8 h-8 rounded-full object-cover shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold line-clamp-1 leading-snug">{v.title}</p>
                                    <p className="text-gray-500 text-xs truncate mt-0.5">{v.owner.username}</p>
                                    <div className="flex items-center space-x-1.5 text-gray-500 text-xs mt-0.5">
                                        <span>{viewsCount}</span>
                                        <span>•</span>
                                        <span>{formatActionTime(v.createdAt)}</span>
                                    </div>
                                </div>
                                <EllipsisVertical size={20} className="shrink-0 text-gray-400 hover:text-gray-700" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
