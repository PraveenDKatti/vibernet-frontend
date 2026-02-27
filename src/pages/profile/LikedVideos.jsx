import { CircleChevronLeft, CircleChevronRight, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { getLikedVideos } from '../../api/like.api'

export default function LikedVideos({user, loading}) {
    const [likedFeed, setLikedFeed] = useState() //liked videos

    useEffect(() => {
        async function fetchLikedVideos() {
            const response = await getLikedVideos()
            setLikedFeed(response.data)
        }
        fetchLikedVideos()
    },[])

    if (loading) return <PageLoader />
    if(!likedFeed) return <p>your liked videos appears here</p>

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

            <div className="grid grid-cols-4 gap-4">
                {likedFeed.map((v) => (
                    <div key={v._id} className="space-y-2">
                        <div className="h-38 bg-red-900 rounded-md"></div>
                        <div className="flex space-x-4">
                            <img src={v.owner.avatar} className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                                <p>{v.title}</p>
                                <p className="text-gray-500">{v.description}</p>
                            </div>
                            <EllipsisVertical size={20} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
