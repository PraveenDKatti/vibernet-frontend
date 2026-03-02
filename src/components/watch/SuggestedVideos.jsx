import React, { useEffect, useState } from 'react'
import { EllipsisVertical } from 'lucide-react'
import { getAllVideos } from '../../api/video.api'
import { formatDistanceToNow } from "date-fns"


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
        <div className='hidden lg:block col-span-3 space-y-4'>
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
        </div>
    )
}
