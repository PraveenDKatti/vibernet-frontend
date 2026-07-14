import { useEffect, useState } from "react";
import { CircleChevronLeft, CircleChevronRight, EllipsisVertical } from "lucide-react";
import PageLoader from '../../components/common/PageLoader'
import { getWatchHistory } from '../../api/history.api'

export default function History() {
    const [historyFeed, setHistoryFeed] = useState([]) //user video watch history
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchHistory() {
            try {
                setLoading(true)
                const response = await getWatchHistory()
                setHistoryFeed(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchHistory()
    }, [])

    if (loading) return <PageLoader />
    if (!history) return <p>your watch history appears here</p>

    return (
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {historyFeed.map((v) => (
                    <div key={v._id} className="space-y-2">
                        <div className="aspect-video w-full bg-zinc-200 dark:bg-zinc-800 rounded-md flex items-center justify-center text-zinc-400 text-xs font-medium">
                            {/* Watch history item thumbnail placeholder */}
                            <span>Video</span>
                        </div>
                        <div className="flex space-x-3 text-sm">
                            <img src={v.owner.avatar} className="w-8 h-8 rounded-full object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold line-clamp-1 leading-snug">{v.title}</p>
                                <p className="text-gray-500 text-xs truncate mt-0.5">{v.description}</p>
                            </div>
                            <EllipsisVertical size={18} className="shrink-0 text-gray-500 hover:text-gray-800" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
