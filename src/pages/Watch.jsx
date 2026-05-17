import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getVideoById } from '../api/video.api'
import CommentSection from '../components/watch/CommentSection'
import SuggestedVideos from '../components/watch/SuggestedVideos'
import VideoInfo from '../components/watch/VideoInfo'
import PageLoader from '../components/common/PageLoader'

export default function Watch() {

    const { videoId } = useParams()
    const [currentVideo, setCurrentVideo] = useState() //playing video in watch page
    useEffect(() => {
        async function fetchVideo() {
            const response = await getVideoById(videoId)
            setCurrentVideo(response.data)
        }
        fetchVideo()
    }, [videoId, currentVideo])

    if (!currentVideo) return <PageLoader />

    return (
        <div className='grid grid-cols-1 lg:grid-cols-9 lg:space-x-4'>
            <div className='lg:col-span-6 space-y-4'>
                <div className='grid grid-rows-1 gap-6'>
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
                    <VideoInfo video={currentVideo} />
                </div>
                <CommentSection videoId={videoId} video={currentVideo} />
            </div>
            <SuggestedVideos />
        </div>
    )
}
