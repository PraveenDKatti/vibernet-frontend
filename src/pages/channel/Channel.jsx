import React, { useState, useEffect } from "react"
import { NavLink, Outlet, useParams } from "react-router-dom"
import { getUserChannelSubscribers } from "../../api/subscription.api"
import { channelProfile } from "../../api/user.api"
import useAuthStore from "../../store/authStore"
import PageLoader from '../../components/common/PageLoader'

const tabs = [
    { id: "Home", label: "Home" },
    { id: "Videos", label: "Videos" },
    { id: "Playlists", label: "Playlists" },
    { id: "Community", label: "Community" },
    { id: "Channel", label: "Channel" },
];

export default function Channel() {
    const { username } = useParams();
    const { user } = useAuthStore();
    const [channel, setChannel] = useState(null);
    const [subscribers, setSubscribers] = useState(0);
    const [loading, setLoading] = useState(true);

    const isOwner = user?._id === channel?._id;

    useEffect(() => {
        async function fetchChannelData() {
            try {
                setLoading(true);

                const resChannel = await channelProfile(username);
                setChannel(resChannel.data);

                const resSubscriber = await getUserChannelSubscribers(username);
                setSubscribers(resSubscriber.data.count || 0);
            } catch (error) {
                console.error("Failed to fetch channel data:", error);
            } finally {
                setLoading(false);
            }
        }

        if (username) {
            fetchChannelData();
        }
    }, [username]);

    if (loading) {
        return (
            <PageLoader />
        );
    }

    if (!channel) {
        return (
            <div className="flex justify-center items-center h-60">
                <p className="text-gray-500">Channel not found</p>
            </div>
        );
    }

    return (
        <div>
            <div className="relative">
                <div className="px-10 space-y-4">
                    {/* Cover */}
                    <div className="h-44">
                        <img
                            src={channel.cover}
                            alt="cover"
                            className="rounded-xl w-full h-full object-cover"
                        />
                    </div>

                    {/* Channel Header */}
                    <div className="flex items-center gap-4">
                        <img
                            src={channel.avatar}
                            alt="avatar"
                            className="rounded-full w-40 h-40 object-cover"
                        />

                        <div className="flex-1 space-y-2">
                            <p className="text-4xl font-bold">{channel.fullName}</p>

                            <div className="flex text-sm space-x-1 text-gray-500">
                                <p>@{channel.username}</p>
                                <span>•</span>
                                <p>{subscribers} followers</p>
                            </div>

                            <div className="flex text-gray-500 text-sm">
                                <p>More about this channel</p>
                                <p className="ml-1 cursor-pointer hover:underline">
                                    ...more
                                </p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex gap-4 h-10">
                            {isOwner ? (
                                <button className="rounded-full bg-gray-100 px-4 hover:bg-gray-200 transition">
                                    Customize Channel
                                </button>
                            ) : (
                                <button className="rounded-full bg-black text-white px-4 hover:bg-gray-800 transition">
                                    Subscribe
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div>
                    <div className="absolute w-full -bottom-[1px] border-b border-gray-200"></div>
                    <div className="flex px-10">
                        {tabs.map(({ id, label }) => (
                            <NavLink
                                key={id}
                                to={label === "Home" ? "" : label.toLowerCase()}
                                end={label === "Home"}
                                className={({ isActive }) =>
                                    `py-3 mr-8 font-medium border-b-2 transition ${isActive
                                        ? "border-black text-black"
                                        : "border-transparent text-gray-500 hover:border-gray-400"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-8 py-6">
                <Outlet context={{ channel, isOwner }} />
            </div>
        </div>
    );
}
