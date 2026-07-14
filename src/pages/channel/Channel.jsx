import React, { useState, useEffect } from "react"
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom"
import { getUserChannelSubscribers, toggleSubscription } from "../../api/subscription.api"
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
    const navigate = useNavigate();
    const [channel, setChannel] = useState(null);
    const [subscribers, setSubscribers] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);

    const isOwner = user?._id === channel?._id;

    useEffect(() => {
        async function fetchChannelData() {
            try {
                setLoading(true);

                const resChannel = await channelProfile(username);
                setChannel(resChannel.data);
                setIsSubscribed(resChannel.data.isSubscribed || false);

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

    const handleToggleSubscription = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        try {
            // Optimistic update
            const newIsSubscribed = !isSubscribed;
            setIsSubscribed(newIsSubscribed);
            setSubscribers(prev => prev + (newIsSubscribed ? 1 : -1));

            // Call API
            await toggleSubscription(username);
        } catch (error) {
            console.error("Failed to toggle subscription:", error);
            // Revert state if failed
            setIsSubscribed(prev => !prev);
            setSubscribers(prev => prev + (isSubscribed ? -1 : 1));
        }
    };

    const activeTabs = tabs.filter(tab => {
        if (tab.id === "Channel") {
            return isOwner;
        }
        return true;
    });

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
                <div className="px-4 md:px-10 space-y-4">
                    {/* Cover */}
                    <div className="h-28 sm:h-36 md:h-44">
                        <img
                            src={channel.cover}
                            alt="cover"
                            className="rounded-xl w-full h-full object-cover"
                        />
                    </div>

                    {/* Channel Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
                        <img
                            src={channel.avatar}
                            alt="avatar"
                            className="rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover shrink-0"
                        />

                        <div className="flex-1 space-y-2 min-w-0">
                            <p className="text-2xl md:text-3xl lg:text-4xl font-bold truncate">{channel.fullName}</p>

                            <div className="flex flex-wrap justify-center md:justify-start text-sm space-x-1 text-gray-500">
                                <p>@{channel.username}</p>
                                <span>•</span>
                                <p>{subscribers} followers</p>
                            </div>

                            <div className="flex justify-center md:justify-start text-gray-500 text-sm">
                                <p>More about this channel</p>
                                <p className="ml-1 cursor-pointer hover:underline text-zinc-900 font-medium">
                                    ...more
                                </p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex gap-4 h-10 shrink-0 mt-2 md:mt-0">
                            {isOwner ? (
                                <button
                                    onClick={() => navigate("channel")}
                                    className="rounded-full bg-gray-100 px-4 hover:bg-gray-200 transition text-sm font-medium"
                                >
                                    Customize Channel
                                </button>
                            ) : (
                                <button
                                    onClick={handleToggleSubscription}
                                    className={`rounded-full px-4 py-2 transition font-medium text-sm ${isSubscribed
                                        ? "bg-gray-200 text-black hover:bg-gray-300"
                                        : "bg-black text-white hover:bg-gray-800"
                                        }`}
                                >
                                    {isSubscribed ? "Subscribed" : "Subscribe"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="relative mt-6">
                    <div className="absolute w-full -bottom-[1px] border-b border-gray-200"></div>
                    <div className="flex px-4 md:px-10 overflow-x-auto scrollbar-hide whitespace-nowrap gap-1">
                        {activeTabs.map(({ id, label }) => (
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
            <div className="px-4 md:px-8 py-6">
                <Outlet context={{ channel, isOwner }} />
            </div>
        </div>
    );
}
