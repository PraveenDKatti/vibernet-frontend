import React, { useEffect, useState } from 'react'
import { ThumbsUp, ThumbsDown, Forward, Minus, EllipsisVertical } from 'lucide-react'
import { formatDistanceToNow } from "date-fns"

export default function VideoInfo({video}) {

    return (
        <div className='space-y-4 leading-none'>
            <p className='leading-none text-xl font-bold'>{video.title}</p>
            <div className='flex justify-between items-center'>
                <div className='flex space-x-4'>
                    <img src={video.thumbnail} className='rounded-full bg-yellow-500 h-10 w-10' />
                    <div className='text-sm'>
                        <p>{video.owner.username}</p>
                        <p className='text-gray-500 text-sm'>10.3M subscribers</p>
                    </div>
                    <button className='rounded-full bg-black text-sm font-semibold text-white px-3 py-2 h-9'>Subscribe</button>
                </div>
                <div className='flex space-x-2 font-semibold text-md'>
                    <div className='flex items-center bg-gray-100 rounded-full px-3 py-2 h-9'>
                        <div className='flex space-x-2'><ThumbsUp size={20} /><p> 1</p></div>
                        <Minus strokeWidth={1} size={35} className='text-gray-400 mr-0 transform rotate-90' />
                        <ThumbsDown size={20} />
                    </div>
                    <div className='flex items-center space-x-4 rounded-full bg-gray-100 px-3 py-2 h-9'>
                        <Forward />
                        <p>share</p>
                    </div>
                    <EllipsisVertical />
                </div>
            </div>
            <div className='rounded-2xl bg-zinc-100 text-sm p-3'>
                <p className='font-medium'>{video.views} views {formatDistanceToNow(new Date(video.createdAt))} ago </p>
                <p>{video.description}</p>
            </div>
        </div>
    )
}
