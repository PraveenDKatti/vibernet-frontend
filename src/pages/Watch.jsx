import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useVideoStore from '../store/videoStore'
import CommentSection from '../components/watch/CommentSection'
import SuggestedVideos from '../components/watch/SuggestedVideos'
import VideoInfo from '../components/watch/VideoInfo'
import SkeletonLoader from '../components/common/SkeletonLoader'
import useAuthStore from '../store/authStore'
import {updateHistory} from '../api/history.api'

export default function Watch() {
    const { videoId } = useParams()
    const {isAuthenticated} = useAuthStore()
    const {currentVideo, fetchVideo} = useVideoStore()

    async function updateWatchHistory(){
        if(!isAuthenticated) return;
        await updateHistory(videoId)
    }

    useEffect(() => {
        fetchVideo(videoId)
        updateWatchHistory()
    }, [videoId, fetchVideo])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-9 lg:space-x-4'>
            <div className='lg:col-span-6 space-y-4'>
                <div className='grid grid-rows-1 gap-6'>
                    <div className='aspect-video'>
                        {!currentVideo ? <SkeletonLoader /> :
                            <video
                                src={currentVideo.videoFile}
                                controls
                                muted
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '12px',
                                    backgroundColor: '#000'
                                }}
                            />
                        }
                    </div>

                    <VideoInfo />
                </div>

                <CommentSection />
            </div>

            <SuggestedVideos />
        </div>
    )
}
