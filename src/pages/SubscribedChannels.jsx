import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { List, LayoutGrid } from 'lucide-react'
import useAuthStore from '../store/authStore'
import { getSubscribedChannels } from '../api/subscription.api'
import PageLoader from '../components/common/PageLoader'

export default function SubscribedChannels() {
    const [layout, setLayout] = useState('grid') // 'grid' | 'list'
    const [channels, setChannels] = useState([])

    const navigate = useNavigate()
    const { user, loading } = useAuthStore()

    useEffect(() => {
        if (!user?._id) return

        async function fetchChannelsData() {
            try {
                const response = await getSubscribedChannels(user._id)
                setChannels(response?.data || [])
            } catch (error) {
                console.error(error)
            }
        }
        fetchChannelsData()
    }, [user])

    if (loading) return <PageLoader />

    return (
        <div className='space-y-6 mx-25'>
            {/* Header */}
            <div className='flex justify-between items-center h-20'>
                <p className='text-4xl font-bold'>All subscriptions</p>

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
            
            {/* Empty State */}
            {
                channels.length === 0 && (
                    <p className="mt-20 text-center text-xl font-semibold">
                        You haven't subscribed to anyone yet.
                    </p>
                )
            }

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
                        <div onClick={() => navigate(`/:${c.username}`)} className='flex gap-4 items-center'>
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