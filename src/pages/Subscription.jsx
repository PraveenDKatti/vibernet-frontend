import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EllipsisVertical } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import useAuthStore from '../store/authStore'
import { getSubscribedFeed } from '../api/subscription.api'
import PageLoader from '../components/common/PageLoader'

export default function Subscription() {
    const [subscriptions, setSubscriptions] = useState([])
    const { user, loading } = useAuthStore()

    const navigate = useNavigate()

    useEffect(() => {
        if (!user?._id) return
        async function fetchSubscriptionData() {
            try {
                const response = getSubscribedFeed()
                setSubscriptions(response?.data?.docs || [])
            } catch (error) {
                console.error(error)
            }
        }
        fetchSubscriptionData()
    }, [user])

    if (loading) return <PageLoader />

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className='flex justify-between items-center h-20'>
                <p className='text-2xl font-bold'>Latest</p>
                <p
                    onClick={() => navigate('/profile/channels')}
                    className='py-2 px-3 rounded-full cursor-pointer text-sm font-medium bg-zinc-100 hover:bg-zinc-200'
                >
                    All subscriptions
                </p>
            </div>

            {/* Empty State */}
            {subscriptions.length === 0 && (
                <p className="mt-20 text-center text-xl font-semibold">
                    You haven't subscribed to anyone yet.
                </p>
            )}

            {subscriptions.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
                    {subscriptions.map((video) => {
                        const minutes = Math.floor(video.duration / 60)
                        const seconds = String(video.duration % 60).padStart(2, '0')

                        return (
                            <div
                                key={video._id}
                                className="hover:bg-blue-50 rounded-2xl space-y-2 cursor-pointer p-2"
                                onClick={() => navigate(`/watch/${video._id}`)}
                            >
                                <div className="relative h-52">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className='h-full w-full rounded-xl object-cover'
                                    />

                                    <div className='absolute bg-black/60 text-white font-medium right-2 bottom-2 px-1 py-0.5 text-xs rounded-md'>
                                        {minutes}:{seconds}
                                    </div>
                                </div>

                                <div className="flex justify-between items-start">
                                    <div className="flex flex-1 space-x-3">
                                        <img
                                            src={video.ownerDetails?.avatar}
                                            alt={video.ownerDetails?.username}
                                            className='rounded-full w-10 h-10'
                                        />

                                        <div>
                                            <p className="font-medium line-clamp-2">
                                                {video.title}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {video.ownerDetails?.username}
                                            </p>

                                            <div className='flex space-x-2 text-gray-500 text-sm'>
                                                <span>{video.views} views</span>
                                                <span>•</span>
                                                <span>
                                                    {formatDistanceToNow(new Date(video.createdAt))} ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <EllipsisVertical size={20} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

        </div>
    )
}