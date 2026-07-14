import React from 'react'
import { Link } from 'react-router-dom'
import { ThumbsUp, ThumbsDown, Forward, Minus, EllipsisVertical } from 'lucide-react'
import { formatActionTime } from "../../utils/formatActionTime"
import { toggleSubscription } from '../../api/subscription.api'
import { toggleLikeReaction } from '../../api/like.api'
import useVideoStore from '../../store/videoStore'
import { formatCount } from '../../utils/formatCount'

export default function VideoInfo() {
    const video = useVideoStore((s) => s.currentVideo)
    const updateSubscriptionStatus = useVideoStore((s) => s.updateSubscriptionStatus)
    const updateLikeStatus = useVideoStore((s) => s.updateLikeStatus)

    const viewsCount = formatCount(video.views)
    const subscriberCount = formatCount(video.owner?.subscribers | 0)

    const handleSubscription = async () => {
        try {
            const res = await toggleSubscription(video.owner.username)
            updateSubscriptionStatus(res.data.subscribed)
        } catch (error) {
            console.error(error);
        }
    };

    const handleReaction = async (videoId, type) => {
        try {
            const res = await toggleLikeReaction({
                targetId: videoId,
                type,
                targetType: "video"
            })
            updateLikeStatus(res.data.status)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='space-y-4 leading-normal p-2 sm:p-0'>
            <p className='text-lg md:text-xl font-bold leading-snug'>{video.title}</p>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-zinc-800 pb-3'>
                <div className='flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto'>
                    <div className='flex space-x-3 items-center min-w-0'>
                        <Link to={`/${video.owner.username}`} className="shrink-0">
                            <img src={video.owner.avatar} className='rounded-full bg-yellow-500 h-10 w-10 object-cover hover:opacity-85 transition' />
                        </Link>
                        <div className='text-sm min-w-0'>
                            <Link to={`/${video.owner.username}`} className="font-semibold hover:underline block truncate">{video.owner.username}</Link>
                            <p className='text-gray-500 text-xs truncate'>{subscriberCount} subscribers</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubscription}
                        className={`rounded-full shrink-0 ${video.owner.isSubscribed ? "bg-zinc-200 text-black hover:bg-zinc-300" : "bg-black text-white hover:bg-zinc-800"} text-xs sm:text-sm font-semibold px-4 py-2 h-9 transition-colors`}
                    >{video.owner.isSubscribed ? "Unsubscribe" : "Subscribe"}</button>
                </div>
                <div className='flex flex-wrap items-center gap-2 font-semibold text-sm w-full sm:w-auto justify-start sm:justify-end'>
                    <div className='flex items-center bg-gray-100 dark:bg-zinc-800 rounded-full px-3 py-2 h-9'>
                        <div className='flex space-x-2 items-center cursor-pointer hover:opacity-80' onClick={() => handleReaction(video._id, "like")}>
                            <ThumbsUp
                                size={18}
                                fill={video.isLiked ? "currentColor" : "none"}
                                className={video.isLiked ? "text-black dark:text-white" : "text-gray-600 dark:text-zinc-400"} />
                            <p className="text-gray-700 dark:text-zinc-300 text-xs">{video.likesCount || 0}</p>
                        </div>
                        <Minus strokeWidth={1} size={30} className='text-gray-300 dark:text-zinc-600 mx-1 transform rotate-90' />
                        <div className='flex items-center cursor-pointer hover:opacity-80' onClick={() => handleReaction(video._id, "dislike")}>
                            <ThumbsDown
                                size={18}
                                fill={video.isDisliked ? "currentColor" : "none"}
                                className={video.isDisliked ? "text-black dark:text-white" : "text-gray-600 dark:text-zinc-400"} />
                        </div>
                    </div>
                    <div className='flex items-center space-x-2 rounded-full bg-gray-100 dark:bg-zinc-800 px-3 py-2 h-9 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors'>
                        <Forward size={18} />
                        <span className="text-xs">share</span>
                    </div>
                    <button className="p-2 hover:bg-gray-105 rounded-full text-gray-500">
                        <EllipsisVertical size={18} />
                    </button>
                </div>
            </div>
            <div className='rounded-2xl bg-zinc-100 text-sm p-3'>
                <p className='font-medium'>{viewsCount} views {formatActionTime(video.createdAt)} </p>
                <p>{video.description}</p>
            </div>
        </div>
    )
}
