import React, { useEffect, useState } from 'react'
import { ThumbsUp, ThumbsDown, Forward, Minus, EllipsisVertical } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { getVideoById } from '../api/video.api'
import { getVideoComments } from "../api/comment.api"
import { formatDistanceToNow } from "date-fns";
import ReactPlayer from "react-player"

const videos = Array(10).fill(0)

export default function Watch() {

    const { videoId } = useParams()
    const [video, setVideo] = useState()
    const [comments, setComments] = useState()

    useEffect(() => {
        async function getVideo() {
            const response = await getVideoById(videoId)
            setVideo(response.data)
        }

        async function getComments() {
            const response = await getVideoComments(videoId)
            setComments(response.data.docs)
        }

        getVideo()
        getComments()
    }, [videoId])


    if (!video) return <p>...Loading</p>
    if (!comments) return <p>...Loading</p>

    return (
        <div className='grid grid-cols-1 lg:grid-cols-9 lg:space-x-4'>
            <div className='lg:col-span-6 space-y-4'>
                <div className='space-y-4'>
                    <div className='aspect-video'>
                        <video
                            src={video.videoFile}
                            controls
                            muted
                            style={{ width: '100%', height: '100%', borderRadius: '12px', backgroundColor: '#000' }}
                            onError={(e) => console.log("Error loading video:", e)}
                            onPause={() => console.log('Video paused')}
                        ></video>
                    </div>
                    <div className=''>
                        <p className='text-xl font-bold'>{video.title}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex space-x-4'>
                            <img src={video.thumbnail} className='rounded-full bg-yellow-500 h-10 w-10' />
                            <div className='text-sm'>
                                <p>{video.owner.username}</p>
                                <p className='text-gray-500 text-sm'>10.3M subscribers</p>
                            </div>
                            <button className='rounded-full bg-black text-white p-2'>Subscribe</button>
                        </div>
                        <div className='flex space-x-4 font-bold text-md'>
                            <div className='flex space-x-4 bg-gray-100 rounded-full p-2'>
                                <div className='flex space-x-4'><ThumbsUp size={20} /><p> 1</p></div>
                                <Minus className='transform rotate-90' />
                                <ThumbsDown size={20} />
                            </div>
                            <div className='flex space-x-4  rounded-full bg-gray-100 p-2'>
                                <Forward />
                                <p>share</p>
                            </div>
                            <EllipsisVertical />
                        </div>
                    </div>
                    <div className='rounded-md bg-gray-200 p-4'>
                        <p className='font-medium'>{video.views} views {formatDistanceToNow(new Date(video.createdAt))} ago </p>
                        <p>{video.description}</p>
                    </div>
                </div>
                <div className='w-full space-y-4'>
                    <div className='flex space-x-4 mb-10'>
                        <button className='rounded-full w-12 h-12 bg-green-600 text-white text-xl'>u</button>
                        <input type="textarea" placeholder='Add a comment' className='flex-1 border-gray-200 outline-none border-b-1' />
                        <button className='bg-black text-white px-5 rounded-full'>Send</button>
                    </div>
                    <div className='space-y-6'>
                        {comments.map((c) => (
                            <div key={c._id} className='flex space-x-4'>
                                <button className='rounded-full w-10 h-10 bg-orange-600 text-white text-xl'>{c.owner.avatar}</button>
                                <div className='flex-1'>
                                    <div className='flex space-x-4'>
                                        <p className='font-bold'>
                                            {c.owner.username}
                                        </p>
                                        <p className='text-gray-500'>{formatDistanceToNow(new Date(c.createdAt))} ago</p>
                                    </div>
                                    <div>
                                        <p>{c.content}</p>
                                    </div>
                                    <div className='flex space-x-4'>
                                        <div className='flex space-x-2 items-center'><ThumbsUp size={20} /> <p className='text-gray-500' >1</p> </div>
                                        <div className='flex space-x-2 items-center'><ThumbsDown size={20} /> <p className='text-gray-500' >1</p> </div>
                                        <button className='font-bold'>reply</button>
                                    </div>
                                </div>
                                <EllipsisVertical />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {<div className='hidden lg:block col-span-3 space-y-4'>
                {
                    videos.map((v, i) => (
                        <div key={i} className='flex space-x-4 text-xs h-25'>
                            <div className='w-[40%] h-full rounded-md bg-black'></div>
                            <div className='w-[50%] h-full text-gray-500'>
                                <p className='font-bold text-black'>What’s Hidden Under Antarctica Will Cause Global Tension</p>
                                <p>New Nature</p>
                                <p>2M views  7 days ago</p>
                            </div>
                            <EllipsisVertical />
                        </div>
                    ))
                }
            </div>}
        </div>
    )
}
