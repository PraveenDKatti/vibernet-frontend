import { useEffect, useState } from "react";
import { getUserPlaylists } from "../../api/playlist.api";
import { CircleChevronLeft, CircleChevronRight, EllipsisVertical } from "lucide-react";

export default function PlayList({user, loading}) {
    const [playlists, setPlaylists] = useState()

    useEffect(() => {
        async function getPlaylists() {
            const response = await getUserPlaylists(user._id)
            console.log(response)
            setPlaylists(response.data)
        }
        getPlaylists()
    },[])

    if (loading) return <PageLoader />
    if(!playlists) return <p>your playlists will appears here</p>

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <div>
                    <p className="text-xl font-bold">PlayList</p>
                    <p className="text-sm text-gray-500">your created playlists</p>
                </div>
                <div className="flex text-sm font-medium h-10 space-x-2">
                    <button className="w-20 rounded-full border border-gray-200">
                        View all
                    </button>
                    <CircleChevronLeft size={40} strokeWidth={0.6} className="text-gray-300" />
                    <CircleChevronRight size={40} strokeWidth={0.6} className="text-gray-300" />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {playlists.map((p) => (
                    <div key={p._id} className="space-y-2">
                        <div className="h-38 bg-blue-900 rounded-md"></div>
                        <div className="flex space-x-4">
                            <img src={p.owner.avatar} className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                                <p>{p.name}</p>
                                <p className="text-gray-500">{p.description}</p>
                            </div>
                            <EllipsisVertical size={20} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
