import { EllipsisVertical } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAllVideos } from '../api/video.api'
import { formatActionTime } from "../utils/formatActionTime"
import { formatDuration } from '../utils/formatDuration'
import { formatCount } from '../utils/formatCount'
import SkeletonLoader from '../components/common/SkeletonLoader'

const Home = () => {
  const [homeFeed, setHomeFeed] = useState([]) //videos for home feed.
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState(null)
  const [skeletonCount, setSkeletonCount] = useState(6)

  const containerRef = useRef(null)
  const observerRef = useRef(null)

  const fetchVideos = useCallback(async (cursor) => {
    if (loading || !hasMore) return
    setLoading(true)
    let params = ""
    if (cursor && cursor.lastId && cursor.lastDate) {
      params = { lastId: cursor.lastId, lastDate: cursor.lastDate }
    }
    try {
      const response = await getAllVideos(params);
      const { data, hasMore: moreAvailable, nextCursor: newCursor } = response;
      setHomeFeed((prevFeed) => [...prevFeed, ...data.docs])
      setHasMore(moreAvailable)
      setNextCursor(newCursor)
    } catch (err) {
      setError(err.message || 'failed to fetch feed')
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore])

  const lastVideoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchVideos(nextCursor);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, nextCursor, fetchVideos]
  );

  useEffect(() => {
    fetchVideos(null)
    const observer = new ResizeObserver((entries)=>{
      for(let entry of entries) {
        const containerWidth = entry.contentRect.width
        const skeletonMinWidth = 280
        
        const columns = Math.floor(containerWidth/skeletonMinWidth) || 1
        const rows = 2
        const totalSkeletons = columns * rows
        setSkeletonCount(totalSkeletons)
      }
    })
    observer.observe(containerRef.current)
    return ()=> observer.disconnect()
  }, [])

  const navigate = useNavigate()

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 space-y-4 min-h-screen">
      {homeFeed.map((video, index) => {
        const duration = formatDuration(video.duration)
        const viewsCount = formatCount(video.views)
        const isLastElement = nextCursor && video._id === nextCursor.lastId

        return (
          <div ref={isLastElement ? lastVideoElementRef : null} key={`${video._id}-${index}`} className="hover:bg-blue-50 rounded-2xl space-y-3 cursor-pointer z-10" onClick={() => navigate(`/watch/${video._id}`)}>
            <div className="relative h-52">
              <img src={video.thumbnail} className='h-full w-full rounded-xl' />
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
                <div>
                  <p className="font-medium">{video.title}</p>
                  <Link to={`/${video.owner.username}`} className="z-50 text-sm text-gray-500 hover:text-gray-800" onClick={(e) => e.stopPropagation()}>{video.owner.username}</Link>
                  <div className='flex space-x-2 text-gray-500 text-sm'>
                    <span>{viewsCount}</span>
                    <span className="text-zinc-700">•</span>
                    <span>{formatActionTime(video.createdAt)}</span>
                  </div>
                </div>
              </div>
              <EllipsisVertical size={20} />
            </div>
          </div>)
      })}

      {loading && Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonLoader key={`skeleton-${index}`} />
        ))}
    </div>
  );
};

export default Home