import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EllipsisVertical } from 'lucide-react'
import { getAllVideos } from '../../api/video.api'
import { formatActionTime } from "../../utils/formatActionTime"
import { formatCount } from '../../utils/formatCount'
import SkeletonLoader from '../common/SkeletonLoader'


export default function SuggestedVideos() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [suggestedVideos, setSugggestedVideos] = useState([]) //Suggested videos at Watch page 

    useEffect(() => {
        async function fetchVideos() {
            setLoading(true)
            try {
                const response = await getAllVideos()
                setSugggestedVideos(response.data.docs)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchVideos()
    }, [])

    if (loading) return (
        <div className='hidden lg:block col-span-3 space-y-4'>
            <div key={v._id} className='flex space-x-4 text-xs h-25'>
                <SkeletonLoader />
            </div>
        </div>
    )

    if (error) {
        return <p role="alert">Couldn’t load suggested videos.</p>;
    }

    if (suggestedVideos.length === 0) {
        return <p>No suggested videos yet.</p>;
    }

    return (
        <div className='hidden lg:block col-span-3 space-y-4'>
            {suggestedVideos.map((v) => {
                const viewsCount = formatCount(v.views)

                return (
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
                            <Link to={`/${v.owner?.username}`}>
                                <p className="z-50 text-sm text-gray-500 hover:text-gray-800 hover:underline">
                                    {v.owner?.username || v.username}
                                </p>
                            </Link>
                            <p>{viewsCount} {formatActionTime(v.createdAt)} </p>
                        </div>
                        <EllipsisVertical />
                    </div>
                )
            })
            }
        </div>
    )
}
