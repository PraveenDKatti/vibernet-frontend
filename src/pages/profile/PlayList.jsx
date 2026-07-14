import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageLoader from '../../components/common/PageLoader'
import { CircleChevronLeft, CircleChevronRight, EllipsisVertical } from 'lucide-react'
import { getUserPlaylists, getMyPlaylists } from '../../api/playlist.api'

export default function PlayList() {
    const { username } = useParams()

    const [playlists, setPlaylists] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPlaylists() {
            try {
                setLoading(true)

                const response = username
                    ? await getUserPlaylists(username) // public
                    : await getMyPlaylists() // logged-in user

                setPlaylists(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchPlaylists()
    }, [username])

    if (loading) return <PageLoader />

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <div>
                    <p className="text-xl font-bold">PlayList</p>
                    <p className="text-sm text-gray-500">Your created playlists</p>
                </div>
                <div className="flex text-sm font-medium h-10 space-x-2">
                    <button className="w-20 rounded-full border border-gray-200">
                        View all
                    </button>
                    <CircleChevronLeft size={40} strokeWidth={0.6} className="text-gray-300" />
                    <CircleChevronRight size={40} strokeWidth={0.6} className="text-gray-300" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {playlists.map((p) => (
                    <div key={p._id} className="space-y-2 p-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 rounded-xl transition-colors">
                        <div className="aspect-video w-full bg-blue-900 rounded-md flex items-center justify-center text-white/50 text-xs font-semibold">
                            <span>Playlist</span>
                        </div>
                        <div className="flex space-x-3 text-sm">
                            <img src={p.owner.avatar} className="w-8 h-8 rounded-full object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold line-clamp-1 leading-snug">{p.name}</p>
                                <p className="text-gray-500 text-xs truncate mt-0.5">{p.description}</p>
                            </div>
                            <EllipsisVertical size={20} className="shrink-0 text-gray-400 hover:text-gray-700" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}