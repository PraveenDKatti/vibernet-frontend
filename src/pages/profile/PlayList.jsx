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
    )
}