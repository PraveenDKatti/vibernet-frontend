import { useEffect, useState } from "react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { getWatchHistory, removeFromHistory } from '../../api/history.api'
import LoadingScreen from '../../components/common/LoadingScreen'
import { formatCount } from "../../utils/formatCount";
import { formatActionTime } from "../../utils/formatActionTime";
import ThreeDotMenu from "../../components/ui/ThreeDotMenu";
import SkeletonLoader from "../../components/common/SkeletonLoader";

export default function History() {
    const [historyFeed, setHistoryFeed] = useState([]) //user video watch history
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchHistory() {
            try {
                setLoading(true)
                const response = await getWatchHistory()
                setHistoryFeed(response.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchHistory()
    }, [])

    if (!historyFeed) return;

    if (loading) return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <div>
                    <p className="text-xl font-bold">History</p>
                    <p className="text-sm text-gray-500">videos watched</p>
                </div>
                <div className="flex text-sm font-medium h-10 space-x-2">
                    <button className="w-20 rounded-full border border-gray-200">
                        View all
                    </button>
                    <CircleChevronLeft size={40} strokeWidth={0.6} className="text-gray-300" />
                    <CircleChevronRight size={40} strokeWidth={0.6} className="text-gray-300" />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 h-50">
                {Array.from({ length: 4 }).map(() => <SkeletonLoader />)}
            </div>
        </div>
    )

    if (error) return (
        <div>something went wrong, couldn't load history</div>
    )

    return (
        <div className="space-y-4 min-h-40">
            <div className="flex justify-between">
                <div>
                    <p className="text-xl font-bold">History</p>
                    <p className="text-sm text-gray-500">videos watched</p>
                </div>
                <div className="flex text-sm font-medium h-10 space-x-2">
                    <button className="w-20 rounded-full border border-gray-200">
                        View all
                    </button>
                    <CircleChevronLeft size={40} strokeWidth={0.6} className="text-gray-300" />
                    <CircleChevronRight size={40} strokeWidth={0.6} className="text-gray-300" />
                </div>
            </div>

            {historyFeed.length == 0 ?
                <p className="text-center">No history found</p> :
                <div className="grid grid-cols-4 gap-4">
                    {historyFeed.slice(0, 4).map((h) => {
                        const v = h.video
                        const viewsCount = formatCount(v.views)
                        return (
                            <div key={v._id} className="space-y-2">
                                <div className="h-38"><img src={v.thumbnail} className="w-full h-full rounded-md" /></div>
                                <div className="flex space-x-4">
                                    <img src={v.owner.avatar} className="w-10 h-10 rounded-full" />
                                    <div className="flex-1">
                                        <p className="max-h-10 leading-tight font-semibold overflow-hidden">{v.title}</p>
                                        <p className="text-gray-500 text-sm">{v.owner.username}</p>
                                        <p className='flex space-x-2 text-gray-500 text-sm'>
                                            <span>{viewsCount}</span>
                                            <span className="text-zinc-700">•</span>
                                            <span>{formatActionTime(v.createdAt)}</span>
                                        </p>
                                    </div>
                                    <ThreeDotMenu
                                        items={[
                                            { title: 'Save to playlist', icon: 'saveToPlaylist' },
                                            { title: 'Save to watch later', icon: 'watchLater' },
                                            { title: 'Share', icon: 'share' },
                                            { title: 'Download', icon: 'download' },
                                            { title: 'Remove from Watch History', icon: 'remove' }
                                        ]} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    );
};
