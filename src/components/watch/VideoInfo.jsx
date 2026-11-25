import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ThumbsUp, ThumbsDown, Forward, Bookmark } from 'lucide-react'
import { formatActionTime } from "../../utils/formatActionTime"
import { toggleSubscription } from '../../api/subscription.api'
import { toggleLikeReaction } from '../../api/like.api'
import useVideoStore from '../../store/videoStore'
import { formatCount } from '../../utils/formatCount'
import ThreeDotMenu from '../ui/ThreeDotMenu'
import SaveToPlaylist from '../action/SaveToPlaylist'
import ShareVideo from '../action/ShareVideo'

export default function VideoInfo() {
    const video = useVideoStore((s) => s.currentVideo)
    const updateSubscriptionStatus = useVideoStore((s) => s.updateSubscriptionStatus)
    const updateLikeStatus = useVideoStore((s) => s.updateLikeStatus)

    const viewsCount = formatCount(video?.views)
    const subscriberCount = formatCount(video?.owner?.subscribers | 0)
    const [isOpen, setIsOpen] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)

    const handleSubscription = async () => {
        try {
            const res = await toggleSubscription(video?.owner.username)
            updateSubscriptionStatus(res.data.subscribed)
        } catch (error) {
            console.error(error);
        }
    };

    if (!video) return;

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
        <div>
            <div className='hidden md:block space-y-4 leading-none'>
                <p className='leading-none text-xl font-bold'>{video.title}</p>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-4'>
                        <Link to={`/${video.owner.username}`}>
                            <img src={video.owner.avatar} className='rounded-full bg-yellow-500 h-10 w-10 hover:opacity-85 transition' />
                        </Link>
                        <div className='text-sm'>
                            <Link to={`/${video.owner.username}`} className="font-semibold hover:underline">{video.owner.username}</Link>
                            <p className='text-gray-500 text-sm'>{subscriberCount} subscribers</p>
                        </div>
                        <button
                            onClick={handleSubscription}
                            className={`rounded-full ${video.owner.isSubscribed ? "bg-zinc-200 text-black" : "bg-black text-white"} text-sm font-semibold px-3 py-2 h-9`}
                        >{video.owner.isSubscribed ? "Unsubscribe" : "Subscribe"}</button>
                    </div>
                    <div className='flex items-center space-x-2 font-semibold text-md h-9'>
                        <div className='flex items-center bg-gray-100 rounded-full px-3 py-2'>
                            <div className='flex space-x-2 cursor-pointer'>
                                <ThumbsUp
                                    size={20}
                                    fill={video.isLiked ? "black" : "white"}
                                    onClick={() => handleReaction(video._id, "like")} />
                                <p className="text-gray-500">{video.likesCount || 0}</p>
                            </div>
                            <div className='h-5 w-[2px] mx-2 bg-gray-300' />
                            <div className='cursor-pointer'>
                                <ThumbsDown
                                    size={20}
                                    fill={video.isDisliked ? "black" : "white"}
                                    onClick={() => handleReaction(video._id, "dislike")} />
                            </div>
                        </div>
                        <div className='relative' >
                            <button onClick={()=>setToggleMenu(!toggleMenu)} className='cursor-pointer bg-gray-100 rounded-full px-3 p-2'>
                                <Bookmark size={20} />
                            </button>
                            {toggleMenu && <SaveToPlaylist />}
                        </div>
                        <div>
                            <button onClick={() => setIsOpen(!isOpen)} className='flex cursor-pointer items-center space-x-4 rounded-full bg-gray-100 px-3 py-2'><Forward size={20} /></button>
                            {isOpen && <ShareVideo onClose={()=>setIsOpen(false)} /> }
                        </div>
                        <ThreeDotMenu 
                            items={[
                                {title:'Share', icon:'share'},
                                {title:'Report', icon:'report'},
                                {title:'Download', icon:'download'}
                            ]}/>
                    </div>
                </div>
                <div className='rounded-2xl bg-zinc-100 text-sm p-3'>
                    <p className='font-medium'>{viewsCount} views {formatActionTime(video.createdAt)} </p>
                    <p>{video.description}</p>
                </div>
            </div>
            <div className='md:hidden space-y-4 leading-none'>
                <div className='rounded-2xl bg-zinc-100 text-sm p-3'>
                    <p className='leading-none text-xl font-bold'>{video.title}</p>
                    <Link to={`/${video.owner.username}`} className="font-semibold hover:underline">@{video.owner.username}</Link>
                    <p className='font-medium'>{viewsCount} views {formatActionTime(video.createdAt)} </p>
                    <p>{video.description}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex space-x-4'>
                        <Link to={`/${video.owner.username}`}>
                            <img src={video.owner.avatar} className='rounded-full bg-yellow-500 h-10 w-10 hover:opacity-85 transition' />
                        </Link>
                        <button
                            onClick={handleSubscription}
                            className={`rounded-full ${video.owner.isSubscribed ? "bg-zinc-200 text-black" : "bg-black text-white"} text-sm font-semibold px-3 py-2 h-9`}
                        >{video.owner.isSubscribed ? "Unsubscribe" : "Subscribe"}</button>
                    </div>
                    <div className='flex items-center space-x-4 font-semibold text-md h-9'>
                        <div className='flex space-x-2'>
                            <ThumbsUp
                                size={20}
                                fill={video.isLiked ? "black" : "white"}
                                onClick={() => handleReaction(video._id, "like")} />
                            <p className="text-gray-500">{video.likesCount || 0}</p>
                        </div>
                        <div>
                            <ThumbsDown
                                size={20}
                                fill={video.isDisliked ? "black" : "white"}
                                onClick={() => handleReaction(video._id, "dislike")} />
                        </div>
                        <div className='flex items-center space-x-4'>
                            <Forward />
                        </div>
                        <ThreeDotMenu 
                            items={[
                                {title:'Save to playlist', icon:'saveToPlaylist'}, 
                                {title:'Save to watch later', icon:'watchLater'},
                                {title:'Share', icon:'share'},
                                {title:'Download', icon:'download'}
                            ]}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
