import React, { useEffect, useState } from 'react'
import { ThumbsUp, ThumbsDown, Forward, Minus, EllipsisVertical } from 'lucide-react'
import { formatDistanceToNow } from "date-fns"
import { toggleSubscription } from '../../api/subscription.api'
import { toggleLikeReaction } from '../../api/like.api'
import useVideoStore from '../../store/videoStore'

export default function VideoInfo() {
    const video = useVideoStore((s) => s.currentVideo)
    const updateSubscriptionStatus = useVideoStore((s) => s.updateSubscriptionStatus)

    const handleSubscription = async () => {
        try {
            const res = await toggleSubscription(video.owner.username)
            updateSubscriptionStatus(res.data.subscribed)
        } catch (error) {
            console.error(error);
        }
    };

    console.log(video)

    const handleReaction = async (videoId, type) => {
        try {
            await toggleLikeReaction({
                targetId: videoId,
                type,
                targetType: "video"
            })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='space-y-4 leading-none'>
            <p className='leading-none text-xl font-bold'>{video.title}</p>
            <div className='flex justify-between items-center'>
                <div className='flex space-x-4'>
                    <img src={video.thumbnail} className='rounded-full bg-yellow-500 h-10 w-10' />
                    <div className='text-sm'>
                        <p>{video.owner.username}</p>
                        <p className='text-gray-500 text-sm'>10.3M subscribers</p>
                    </div>
                    <button
                        onClick={handleSubscription}
                        className={`rounded-full ${video.owner.isSubscribed ? "bg-zinc-200 text-black" : "bg-black text-white"} text-sm font-semibold px-3 py-2 h-9`}
                    >{video.owner.isSubscribed ? "Unsubscribe" : "Subscribe"}</button>
                </div>
                <div className='flex space-x-2 font-semibold text-md'>
                    <div className='flex items-center bg-gray-100 rounded-full px-3 py-2 h-9'>
                        <div className='flex space-x-2'>
                            <ThumbsUp
                                size={20}
                                fill={video.isLiked ? "black" : "white"}
                                onClick={() => handleReaction(video._id, "like")} />
                            <p className="text-gray-500">{video.likesCount || 0}</p>
                        </div>
                        <Minus strokeWidth={1} size={35} className='text-gray-400 mr-0 transform rotate-90' />
                        <div>
                            <ThumbsDown
                                size={20}
                                fill={video.isDisliked ? "black" : "white"}
                                onClick={() => handleReaction(video._id, "dislike")} />
                        </div>
                    </div>
                    <div className='flex items-center space-x-4 rounded-full bg-gray-100 px-3 py-2 h-9'>
                        <Forward />
                        <p>share</p>
                    </div>
                    <EllipsisVertical />
                </div>
            </div>
            <div className='rounded-2xl bg-zinc-100 text-sm p-3'>
                <p className='font-medium'>{video.views} views {formatDistanceToNow(new Date(video.createdAt))} ago </p>
                <p>{video.description}</p>
            </div>
        </div>
    )
}
