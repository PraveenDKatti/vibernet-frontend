import { CircleChevronLeft, CircleChevronRight, EllipsisVertical } from "lucide-react"
import { useEffect, useState } from "react"
import { getLikedVideos } from "../../api/like.api"
import { formatActionTime } from "../../utils/formatActionTime"
import { formatCount } from "../../utils/formatCount"
import SkeletonLoader from "../../components/common/SkeletonLoader"
import LoadingScreen from "../../components/common/LoadingScreen"

export default function LikedVideos() {
    const [likedFeed, setLikedFeed] = useState() //liked videos
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchLikedVideos() {
            setLoading(true)
            try {
                const response = await getLikedVideos()
                setLikedFeed(response.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchLikedVideos()
    }, [])

    if (!likedFeed) return;
    
    if(loading) return (
        <LoadingScreen />
    )

    if(error) return (
        <div>Someting went wrong</div>
    )

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

            {likedFeed.length==0 ?
            <p className="text-center">No liked videos</p> :
            <div className="grid grid-cols-4 gap-4">
                {likedFeed.map((v) => {
                    const viewsCount = formatCount(v.views)

                    return (
                        <div key={v._id} className="space-y-2">
                            <div className="h-38"><img src={v.thumbnail} className="w-full h-full rounded-md" /></div>
                            <div className="flex space-x-4">
                                <img src={v.owner.avatar} className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
                                    <p className="h-10 leading-tight font-semibold overflow-hidden">{v.title}</p>
                                    <p className="text-gray-500 text-sm">{v.owner.username}</p>
                                    <p className='flex space-x-2 text-gray-500 text-sm'>
                                        <span>{viewsCount}</span>
                                        <span className="text-zinc-700">•</span>
                                        <span>{formatActionTime(v.createdAt)}</span>
                                    </p>
                                </div>
                                <EllipsisVertical size={20} />
                            </div>
                        </div>
                    )
                })}
            </div>
            }
        </div>
    );
};
