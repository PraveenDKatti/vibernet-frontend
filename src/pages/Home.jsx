import { EllipsisVertical } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAllVideos } from '../api/video.api'
import { formatActionTime } from "../utils/formatActionTime"
import PageLoader from '../components/common/PageLoader'
import { formatDuration } from '../utils/formatDuration'
import { formatCount } from '../utils/formatCount'

const Home = () => {
  const [homeFeed, setHomeFeed] = useState([]) //videos for home feed.
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        const response = await getAllVideos()
        setHomeFeed(response.data.docs)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const navigate = useNavigate()

  if (loading) {
    return (
      <PageLoader />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4 min-h-screen">
      {homeFeed.map((video) => {
        const duration = formatDuration(video.duration)
        const viewsCount = formatCount(video.views)

        return (
          <div key={video._id} className="hover:bg-blue-50 dark:hover:bg-zinc-800/50 p-2 rounded-2xl space-y-3 cursor-pointer z-10 transition-colors" onClick={() => navigate(`/Watch/${video._id}`)}>
            <div className="relative aspect-video w-full">
              <img src={video.thumbnail} className='h-full w-full rounded-xl object-cover' />
              <div
                className='absolute bg-black/60 text-white font-medium right-2 bottom-2 px-1 py-0.5 text-xs rounded-md'
              >{duration}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex flex-1 space-x-3">
                <Link to={`/${video.owner.username}`} className='z-50 shrink-0' onClick={(e) => e.stopPropagation()}>
                  <img src={video.owner.avatar} alt={video.owner.username} className='rounded-full w-10 h-10 object-cover hover:opacity-85 transition' />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{video.title}</p>
                  <Link to={`/${video.owner.username}`} className="z-50 text-sm text-gray-500 hover:text-gray-800 block truncate" onClick={(e) => e.stopPropagation()}>{video.owner.username}</Link>
                  <div className='flex space-x-2 text-gray-500 text-sm'>
                    <span>{viewsCount}</span>
                    <span className="text-zinc-700">•</span>
                    <span>{formatActionTime(video.createdAt)}</span>
                  </div>
                </div>
              </div>
              <EllipsisVertical size={20} className="shrink-0 text-gray-500 hover:text-gray-850" />
            </div>
          </div>)
      })}
    </div>
  );
};

export default Home