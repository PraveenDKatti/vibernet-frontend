import React, { useEffect, useState } from 'react'
import { ThumbsUp, ThumbsDown, Forward, Minus, EllipsisVertical } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { getVideoById, getAllVideos } from '../api/video.api'
import { getVideoComments } from "../api/comment.api"
import { formatDistanceToNow } from "date-fns"
import PageLoader from '../components/common/PageLoader'

export default function Watch() {

    const { videoId } = useParams()
    const [currentVideo, setCurrentVideo] = useState() //playing video in watch page
    const [suggestedVideos, setSugggestedVideos] = useState([]) //Suggested videos at Watch page 
    const [videoComments, setVideoComments] = useState()

    useEffect(() => {
        async function fetchVideo() {
            const response = await getVideoById(videoId)
            setCurrentVideo(response.data)
        }

        async function fetchVideoComments() {
            const response = await getVideoComments(videoId)
            setVideoComments(response.data.docs)
        }

        async function fetchVideos() {
            const response = await getAllVideos()
            setSugggestedVideos(response.data.docs)
        }

        fetchVideo()
        fetchVideoComments()
        fetchVideos()
    }, [videoId])


    if (!currentVideo) return <PageLoader />

    return (
        <div className='grid grid-cols-1 lg:grid-cols-9 lg:space-x-4'>
            <div className='lg:col-span-6 space-y-4'>
                <div className='space-y-4'>
                    <div className='aspect-video'>
                        <video
                            src={currentVideo.videoFile}
                            controls
                            muted
                            style={{ width: '100%', height: '100%', borderRadius: '12px', backgroundColor: '#000' }}
                            onError={(e) => console.log("Error loading video:", e)}
                            onPause={() => console.log('Video paused')}
                        ></video>
                    </div>
                    <div className=''>
                        <p className='text-xl font-bold'>{currentVideo.title}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex space-x-4'>
                            <img src={currentVideo.thumbnail} className='rounded-full bg-yellow-500 h-10 w-10' />
                            <div className='text-sm'>
                                <p>{currentVideo.owner.username}</p>
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
                        <p className='font-medium'>{currentVideo.views} views {formatDistanceToNow(new Date(currentVideo.createdAt))} ago </p>
                        <p>{currentVideo.description}</p>
                    </div>
                </div>
                <div className='w-full space-y-4'>
                    <div className='flex space-x-4 mb-10'>
                        <button className='rounded-full w-10 h-10 bg-green-600 text-white text-xl'>u</button>
                        <input type="textarea" placeholder='Add a comment' className='flex-1 border-gray-200 outline-none border-b-1' />
                        <button className='bg-black text-white px-5 rounded-full'>Send</button>
                    </div>
                    {videoComments.length === 0 ? (
                        <div className='text-center'>No comments yet.</div>
                    ) : (
                        <div className='space-y-6'>
                            {videoComments.map((c) => (
                                <div key={c._id} className='flex space-x-4'>
                                    <img src={c.owner.avatar} className='rounded-full w-10 h-10 text-white text-xl' />
                                    <div className='flex-1'>
                                        <div className='flex space-x-4'>
                                            <p className='font-medium'>
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
                                            <button className='font-medium'>reply</button>
                                        </div>
                                    </div>
                                    <EllipsisVertical />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {<div className='hidden lg:block col-span-3 space-y-4'>
                {suggestedVideos.map((v) => (
                    <div key={v._id} className='flex space-x-4 text-xs h-25'>
                        <div className='aspect-video w-[40%]'>
                            <video
                                src={v.videoFile}
                                muted
                                playsInline
                                onMouseEnter={(e) => e.currentTarget.play()}
                                onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                    e.currentTarget.currentTime = 0;
                                }}
                                style={{ width: '100%', height: '100%', borderRadius: '12px' }}
                                onError={(e) => console.log("Error loading video:", e)}
                            />
                        </div>
                        <div className='w-[50%] h-full text-gray-500'>
                            <p className='font-bold text-black'>{v.title}</p>
                            <p>{v.username}</p>
                            <p>{v.views} views {formatDistanceToNow(new Date(v.createdAt))} ago </p>
                        </div>
                        <EllipsisVertical />
                    </div>
                ))
                }
            </div>}
        </div>
    )
}
