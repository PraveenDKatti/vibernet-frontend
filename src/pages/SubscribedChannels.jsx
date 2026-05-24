import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, List, LayoutGrid, ChevronDown } from 'lucide-react'
import { getSubscribedChannels, toggleSubscription } from '../api/subscription.api'
import PageLoader from '../components/common/PageLoader'
import MenuModal from '../components/ui/MenuModal'

export default function SubscribedChannels() {
    const [layout, setLayout] = useState('grid') // 'grid' | 'list'
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(true) // Added loading state

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchChannelsData() {
            try {
                const response = await getSubscribedChannels()
                // Ensure we map over data and add a default local notification setting if it doesn't exist
                const updatedData = (response?.data || []).map(c => ({
                    ...c,
                    notificationPreference: "All" // Fallback if backend doesn't provide this yet
                }))
                setChannels(updatedData)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchChannelsData()
    }, [])

    async function handleSubscriptionOption(item, targetChannel) {
        if (item.label === "Unsubscribe") {
            try {
                await toggleSubscription(targetChannel.channelDetails.username)
                // Remove the channel entirely from the local UI list upon unsubscribing
                setChannels(prev => prev.filter(c => c.channelDetails._id !== targetChannel.channelDetails._id))
            } catch (error) {
                console.error("Failed to unsubscribe", error)
            }
            return
        }

        // Update ONLY the specific channel's notification setting inside the state array
        setChannels(prev =>
            prev.map(c =>
                c.channelDetails._id === targetChannel.channelDetails._id
                    ? { ...c, notificationPreference: item.label }
                    : c
            )
        )

        // TODO: Call an API here to save the notification preference to the backend if applicable
        // await updateNotificationPreference(targetChannel.channelDetails.username, item.label)
    }

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
                        className={`cursor-pointer ${layout === 'list' ? 'text-black' : 'text-gray-400'}`}
                    />
                    <LayoutGrid
                        size={20}
                        onClick={() => setLayout('grid')}
                        className={`cursor-pointer ${layout === 'grid' ? 'text-black' : 'text-gray-400'}`}
                    />
                </div>
            </div>

            {/* Empty State */}
            {channels.length === 0 && (
                <p className="mt-20 text-center text-xl font-semibold">
                    You haven't subscribed to anyone yet.
                </p>
            )}

            {/* Channels Layout */}
            {/* Quick tip: You have a layout state ('grid' vs 'list') but you aren't changing your Tailwind classes here! */}
            <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                {channels.map((c) => (
                    <div
                        key={c.channelDetails._id}
                        className="flex justify-between items-center p-4 border border-zinc-100 rounded-xl"
                    >
                        {/* Left Section */}
                        <div onClick={() => navigate(`/:${c.channelDetails.username}`)} className='flex gap-4 items-center cursor-pointer'>
                            <img
                                src={c.channelDetails.avatar}
                                alt={c.channelDetails.username}
                                className='w-16 h-16 rounded-full object-cover' // Adjusted size from w-35/h-35 which are non-standard tailwind sizes
                            />

                            <div className='space-y-1'>
                                <p className='font-semibold'>{c.channelDetails.fullName}</p>
                                <div className='flex gap-2 text-sm text-gray-600'>
                                    <p>@{c.channelDetails.username}</p>
                                    <span>•</span>
                                    <p>{c.channelDetails.subscribersCount} subscribers</p>
                                </div>
                                <p className='text-sm text-gray-500 line-clamp-1'>{c.channelDetails.description}</p>
                            </div>
                        </div>

                        {/* Subscription Settings */}
                        <MenuModal 
                            definer={
                                <button className='flex justify-between items-center bg-zinc-200/60 hover:bg-zinc-200 rounded-full w-40 p-3 text-sm font-medium transition-all'>
                                    <span className='flex space-x-2 items-center'>
                                        <Bell size={16} />
                                        {/* Reads directly from individual item state instead of global state */}
                                        <span>{c.notificationPreference || "All"}</span>
                                    </span> 
                                    <ChevronDown size={16} />
                                </button>
                            }
                        >
                            {[
                                { icon: <Bell size={18} />, label: "All" },
                                { icon: <Bell size={18} />, label: "Personalized" },
                                { icon: <Bell size={18} />, label: "None" },
                                { icon: <Bell size={18} />, label: "Unsubscribe" },
                            ].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSubscriptionOption(item, c)}
                                    className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    <span className="flex gap-4 items-center">{item.icon} {item.label}</span>
                                </button>
                            ))}
                        </MenuModal>
                    </div>
                ))}
            </div>
        </div>
    )
}