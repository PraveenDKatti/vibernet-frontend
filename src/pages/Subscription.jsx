import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { List, LayoutGrid, EllipsisVertical } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import useAuthStore from '../store/authStore'
import { getSubscribedChannels, getSubscribedFeed } from '../api/subscription.api'
import PageLoader from '../components/common/PageLoader'

export default function Subscription() {
    const [subscriptions, setSubscriptions] = useState([])
    const [channels, setChannels] = useState([])
    const [view, setView] = useState('feed') // 'subscription feed' | 'subscribed channels'

    const navigate = useNavigate()
    const { user, loading } = useAuthStore()

    useEffect(() => {
        if (!user?._id) return

        async function fetchSubscriptionData() {
            try {
                const [responseChannel, responseFeed] = await Promise.all([
                    getSubscribedChannels(user._id),
                    getSubscribedFeed()
                ])

                setChannels(responseChannel?.data || [])
                setSubscriptions(responseFeed?.data?.docs || [])
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
                <p className='text-2xl font-bold'>
                    {view === 'feed' ? 'Latest' : 'All subscriptions'}
                </p>

                {view === 'feed' && (
                    <p
                        onClick={() => setView('channels')}
                        className='cursor-pointer text-sm font-medium hover:underline'
                    >
                        All subscriptions
                    </p>
                )}

                {view === 'channels' && (
                    <p
                        onClick={() => setView('feed')}
                        className='cursor-pointer text-sm font-medium hover:underline'
                    >
                        Back
                    </p>
                )}
            </div>

            {/* Empty State */}
            {view === 'feed' && subscriptions.length === 0 && (
                <p className="mt-20 text-center text-xl font-semibold">
                    You haven't subscribed to anyone yet.
                </p>
            )}

            {/* Conditional Views */}
            {view === 'feed' && subscriptions.length > 0 && (
                <Feed subscriptions={subscriptions} navigate={navigate} />
            )}

            {view === 'channels' && (
                <Channels channels={channels} />
            )}

        </div>
    )
}

/* ================= FEED ================= */

function Feed({ subscriptions, navigate }) {
    return (
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
    )
}

/* ================= CHANNELS ================= */

function Channels({ channels }) {
    const [layout, setLayout] = useState('grid') // 'grid' | 'list'

    return (
        <div className='space-y-6'>

            {/* Header */}
            <div className='flex justify-between items-center h-20'>
                <p className='text-3xl font-bold'>All subscriptions</p>

                <div className='flex gap-4'>
                    <List
                        size={20}
                        onClick={() => setLayout('list')}
                        className={`cursor-pointer ${layout === 'list' ? 'text-black' : 'text-gray-400'
                            }`}
                    />

                    <LayoutGrid
                        size={20}
                        onClick={() => setLayout('grid')}
                        className={`cursor-pointer ${layout === 'grid' ? 'text-black' : 'text-gray-400'
                            }`}
                    />
                </div>
            </div>

            {/* Channels Layout */}
            <div
                className={
                    layout === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                        : 'flex flex-col gap-4'
                }
            >
                {channels.map((c) => (
                    <div
                        key={c._id}
                        className={`${layout === 'grid'
                                ? 'flex gap-4 p-4 border rounded-xl'
                                : 'flex justify-between items-center p-4 border rounded-xl'
                            }`}
                    >
                        {/* Left Section */}
                        <div className='flex gap-4 items-center'>
                            <img
                                src={c.avatar}
                                alt={c.username}
                                className='w-20 h-20 rounded-full object-cover'
                            />

                            <div className='space-y-1'>
                                <p className='font-semibold'>{c.fullName}</p>

                                <div className='flex gap-2 text-sm text-gray-600'>
                                    <p>@{c.username}</p>
                                    <span>•</span>
                                    <p>{c.subscribersCount} subscribers</p>
                                </div>
                            </div>
                        </div>

                        {/* Subscription Settings */}
                        <select className='border rounded-md px-2 py-1 text-sm'>
                            <option value="all">All</option>
                            <option value="personalized">Personalized</option>
                            <option value="none">None</option>
                            <option value="unsubscribe">Unsubscribe</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}