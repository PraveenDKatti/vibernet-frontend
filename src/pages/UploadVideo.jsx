import React, { useState } from 'react'
import { X, ArrowUpFromLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { publishVideo } from '../api/video.api'

export default function UploadVideo() {
    const [videoFile, setVideoFile] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [thumbnail, setThumbnail] = useState()
    const [privacy, setPrivacy] = useState()

    const navigate = useNavigate()

    const fetchFile = (e) => {
        const doc = e.target.files[0]
        if (doc) {
            setVideoFile(doc)
        }
    }

    const uploadVideo = async () => {
        const success = await publishVideo(data) //once all data is fetched publish the video
    }

    const handleClose = () => {
        navigate('/')
    }

    return (
        <div className='h-screen bg-black/40 fixed inset-0 z-50 flex items-center justify-center'>
            {/* The UI to insert the video */}
            <div className='w-[75vw] h-[85vh] rounded-3xl bg-white'>
                <div className='flex items-center justify-between py-4 px-5 border-b-1 border-gray-200'>
                    <span className='text-xl font-semibold'>Upload Videos</span>
                    <X size={22} onClick={handleClose} />
                </div>
                <div className='grid place-items-center m-10'>
                    <div className="flex flex-col items-center justify-center" >
                        <label 
                            className='relative group w-35 h-35 rounded-full grid place-items-center text-black/50 bg-zinc-100 my-5'>
                            <ArrowUpFromLine size={20} className='w-10 h-10' />
                            <input type="file" accept='video/*' onChange={fetchFile} className="hidden" />
                        </label>
                    </div>
                    <p className='font-md'>Drag and drop video files to upload</p>
                    <p className='text-sm text-gray-500'>Your videos will be private until you publish them.</p>
                    <label
                        className='relative group text-white font-semibold text-sm bg-black rounded-full my-10 px-4 py-2'>
                        Select files
                        <input type="file" accept='video/*' onChange={fetchFile} className="hidden" />
                    </label>
                    <p className='text-xs text-gray-500 text-center mt-5'>By submitting your videos to YouTube, you acknowledge that you agree to YouTube's
                        Terms of Service and Community Guidelines. Please be sure not to violate others'
                        copyright or privacy rights. Learn more
                    </p>
                </div>
            </div>

            {/* Future Need: progressive Steps UI for video details */}
        </div>
    )
}
