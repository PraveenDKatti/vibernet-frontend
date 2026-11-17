import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ThumbsUp, ThumbsDown, Forward, Minus, EllipsisVertical, Bookmark } from 'lucide-react'
import { formatActionTime } from "../../utils/formatActionTime"
import { toggleSubscription } from '../../api/subscription.api'
import { toggleLikeReaction } from '../../api/like.api'
import useVideoStore from '../../store/videoStore'
import { formatCount } from '../../utils/formatCount'
import Modal from '../ui/Modal'
import useAuthStore from '../../store/authStore'
import {createPlaylist, addVideoToPlaylist} from '../../api/playlist.api'

export default function VideoInfo() {
    const video = useVideoStore((s) => s.currentVideo)
    const updateSubscriptionStatus = useVideoStore((s) => s.updateSubscriptionStatus)
    const updateLikeStatus = useVideoStore((s) => s.updateLikeStatus)
    const {isAuthenticated} = useAuthStore()

    const viewsCount = formatCount(video?.views)
    const subscriberCount = formatCount(video?.owner?.subscribers | 0)

    const [name, setName] = useState('')
    const [visibility, setVisibility] = useState('')
    const [playlists, setPlaylists] = useState([])
    const [isOpen, setIsOpen] = useState(false)

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

    const handlePlaylist = async (playlistId, videoId) => {
        try {
            const response = await addVideoToPlaylist(playlistId, videoId)
        } catch (err) {
            console.error(err)
        }
    }

    const createNewPlaylist = async (event) => {
        event.preventDefault()
        try {
            const response = await createPlaylist({name, visibility})
            console.log(response)
        } catch (err) {
            console.error(err)
        }finally{
            setName('')
            setVisibility('')
        }
    }


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
                            <div className='flex space-x-2'>
                                <ThumbsUp
                                    size={20}
                                    fill={video.isLiked ? "black" : "white"}
                                    onClick={() => handleReaction(video._id, "like")} />
                                <p className="text-gray-500">{video.likesCount || 0}</p>
                            </div>
                            <div className='h-5 w-[2px] mx-2 bg-gray-300' />
                            <div>
                                <ThumbsDown
                                    size={20}
                                    fill={video.isDisliked ? "black" : "white"}
                                    onClick={() => handleReaction(video._id, "dislike")} />
                            </div>
                        </div>
                        <div className='relative bg-gray-100 group rounded-full px-3 p-2'>
                            <Bookmark size={20} />
                            {isAuthenticated ? 
                            <div className='absolute hidden bottom-9 shadow-md bg-white group-hover:block p-2 w-40 md:w-60 space-y-4 rounded-md'>
                                <p className='font-medium'>Save to..</p>
                                {playlists.length == 0 ? <p className='text-center'>No playlists</p> :
                                    playlists.map((p) => (
                                        <div className='flex justify-between'>
                                            <p><img src={p.thumbnail} alt="" />{p.name}</p>
                                            <Bookmark
                                                size={20}
                                                onClick={() => handlePlaylist(video._id)} />
                                        </div>
                                    ))}
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className='w-full rounded-full bg-gray-100 px-3 py-2'>
                                    Create Playlist
                                </button>
                                {isOpen && (
                                    <Modal>
                                        <form onSubmit={createNewPlaylist} className='rounded-md bg-white p-4 space-y-3'>
                                            <h4 className='text-left'>New Playlist</h4>
                                            <input 
                                                type="text" 
                                                value={name} 
                                                onChange={(e)=>setName(e.target.value)} 
                                                placeholder='name' 
                                                className='w-full border-1 border-black/30 outline-none p-3 rounded-lg' />
                                            <select
                                                value={visibility}
                                                onChange={(e)=>setVisibility(e.target.value)}
                                                name="visibility" 
                                                className='w-full border-1 border-black/30 outline-none p-3 rounded-lg'>
                                                <option selected disabled value="visibility">visibility</option>
                                                <option value="private">Private</option>
                                                <option value="public">Public</option>
                                            </select>
                                            <div className='space-x-2 flex justify-end'>
                                                <button
                                                    onClick={()=>setIsOpen(!isOpen)}
                                                    className='rounded-full border-1 border-black/30 hover:border-none hover:bg-gray-100 p-3'>
                                                    Cancel</button>
                                                <button
                                                    type='submit' 
                                                    className={`rounded-full border-none ${name.length === 0 ? "opacity-50 bg-gray-200" : "opacity-100 bg-black text-white"} p-3`}>
                                                    Create</button>
                                            </div>
                                        </form>
                                    </Modal>
                                )}
                            </div>
                            :
                            <div className='absolute hidden left-8 bottom-8 text-center shadow-md bg-white group-hover:block p-4 w-50 md:w-75 space-y-4 rounded-md'>
                                <h3 className='text-md'>Want to watch this again later?</h3>
                                <p className='text-sm'>Sign in to add this video to a playlist.</p>
                                <button className='bg-black text-white w-full rounded-full p-3'>Log in</button>
                            </div>
                            }
                        </div>
                        <div className='flex items-center space-x-4 rounded-full bg-gray-100 px-3 py-2'>
                            <Forward size={20} />
                            <p>share</p>
                        </div>
                        <EllipsisVertical />
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
                        <EllipsisVertical />
                    </div>
                </div>
            </div>
        </div>
    )
}
