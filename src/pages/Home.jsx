import { EllipsisVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVideos } from '../api/video.api';
import { formatDistanceToNow } from "date-fns";

const Home = () => {
  const [homeFeed, setHomeFeed] = useState([]) //videos for home feed.

  useEffect(() => {
    async function fetchVideos() {
      const response = await getAllVideos()
      setHomeFeed(response.data.docs)
    }

    fetchVideos()
  }, [])

  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 space-y-4 min-h-screen">
      {homeFeed.map((video) => {
        return (
          <div key={video._id} className="hover:bg-blue-50 rounded-2xl space-y-3 cursor-pointer" onClick={() => navigate(`/Watch/${video._id}`)}>
            <div className="relative h-52">
              <img src={video.thumbnail} className='h-full w-full rounded-xl' />
              <div
                className='absolute bg-black/60 text-white font-medium right-2 bottom-2 px-1 py-0.5 text-xs rounded-md'
              >{parseInt(video.duration / 60)}:{(video.duration) % 60}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex flex-1 space-x-3">
                <img src={video.owner.avatar} alt={video.owner.username} className='rounded-full w-10 h-10' />
                <div>
                  <p className="font-medium">{video.title}</p>
                  <p className="text-sm text-gray-500">{video.owner.username}</p>
                  <div className='flex space-x-2 text-gray-500 text-sm'>
                    <span>{video.views}</span>
                    <span className="text-zinc-700">•</span>
                    <span>{formatDistanceToNow(new Date(video.createdAt))} ago</span>
                  </div>
                </div>
              </div>
              <EllipsisVertical size={20} />
            </div>
          </div>)
      })}
    </div>
  );
};

export default Home