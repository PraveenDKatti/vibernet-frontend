import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EllipsisVertical } from 'lucide-react'
import { getAllVideos } from '../../api/video.api'
import { formatActionTime } from "../../utils/formatActionTime"
import { formatCount } from '../../utils/formatCount'


export default function SuggestedVideos() {

    const [suggestedVideos, setSugggestedVideos] = useState([]) //Suggested videos at Watch page 

    useEffect(() => {
        async function fetchVideos() {
            const response = await getAllVideos()
            setSugggestedVideos(response.data.docs)
        }
        fetchVideos()
    }, [])


    return (
        <div className="col-span-1 lg:col-span-3 space-y-4 mt-6 lg:mt-0">
            <h3 className="text-sm font-bold text-gray-900 mb-2 block lg:hidden">Up Next</h3>
            {suggestedVideos.map((v) => {
                const viewsCount = formatCount(v.views)

                return (
                    <div key={v._id} className="flex gap-3 text-xs min-h-[96px] hover:bg-zinc-50 dark:hover:bg-zinc-800/30 p-1.5 rounded-xl cursor-pointer">
                        <div className="aspect-video w-36 sm:w-40 md:w-48 lg:w-32 xl:w-40 shrink-0">
                            <video
                                src={v.videoFile}
                                muted
                                playsInline
                                onMouseEnter={(e) => e.currentTarget.play()}
                                onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                    e.currentTarget.currentTime = 0;
                                }}
                                style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                                onError={(e) => console.log("Error loading video:", e)}
                            />
                        </div>
                        <div className="flex-1 min-w-0 text-gray-500 flex flex-col justify-between py-0.5">
                            <p className="font-semibold text-black dark:text-white text-sm line-clamp-2 leading-tight">
                                {v.title}
                            </p>
                            <div className="mt-1">
                                <Link to={`/${v.owner?.username}`}>
                                    <p className="text-xs text-gray-500 hover:text-gray-800 hover:underline truncate">
                                        {v.owner?.username || v.username}
                                    </p>
                                </Link>
                                <p className="text-[11px] text-gray-400 mt-0.5">
                                    {viewsCount} views • {formatActionTime(v.createdAt)}
                                </p>
                            </div>
                        </div>
                        <EllipsisVertical size={16} className="shrink-0 text-gray-400 hover:text-gray-700" />
                    </div>
                )
            })}
        </div>
    )
}
