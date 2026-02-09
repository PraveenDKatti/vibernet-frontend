import { EllipsisVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVideos } from '../api/video.api';
import { formatDistanceToNow } from "date-fns";

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    async function getVideos() {
      const response = await getAllVideos()
      setVideos(response.data.docs)
    }

    getVideos()
  }, [])

  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 min-h-screen">
      {videos.map((video) => {
        return (
          <div key={video._id} className="hover:bg-blue-50 rounded-2xl space-y-2 cursor-pointer" onClick={() => navigate(`/Watch/${video._id}`)}>
            <div className="h-50 bg-black rounded-md"></div>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium">{video.title}</p>
                <p className="text-sm text-gray-500">{video.owner.username}</p>
                <div className='flex space-x-2 text-gray-500 text-sm'>
                  <span>{video.views}</span>
                  <span className="text-zinc-700">•</span>
                  <span>{formatDistanceToNow(new Date(video.createdAt))}</span>
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