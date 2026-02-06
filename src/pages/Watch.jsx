import React from 'react'
import { ThumbsUp, ThumbsDown, Forward, Minus, EllipsisVertical } from 'lucide-react'

const comments = Array(10).fill(0)
const videos = Array(10).fill(0)

export default function Watch() {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 lg:space-x-4'>
            <div className='lg:col-span-3 space-y-4'>
                <div className='space-y-4'>
                    <div className='rounded-md h-100 bg-black'></div>
                    <div className=''>
                        <p className='text-xl font-bold'>Trump Holds Back on Military Action Against Iran as Risks and Regional Challenges Mount | WION</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex space-x-4'>
                            <img src="" className='rounded-full bg-yellow-500 h-10 w-10' />
                            <div className='text-sm'>
                                <p>WION</p>
                                <p className='text-gray-500 text-sm'>10.3M subscribers</p>
                            </div>
                            <button className='rounded-full bg-black text-white p-2'>Subscribe</button>
                        </div>
                        <div className='flex space-x-4 font-bold text-md'>
                            <div className='flex space-x-4 bg-gray-100 rounded-full p-2'>
                                <div className='flex space-x-4'><ThumbsUp size={20} /><p> 1</p></div>
                                <Minus className='transform rotate-90' />
                                <ThumbsDown size={20} />
                            </div>
                            <div className='flex space-x-4  rounded-full bg-gray-100 p-2'>
                                <Forward />
                                <p>share</p>
                            </div>
                            <EllipsisVertical />
                        </div>
                    </div>
                    <div className='rounded-md bg-gray-200 p-4'>
                        <p>5167 views  Feb 06, 2026</p>
                        <p>U.S. President Donald Trump has so far stopped short of launching direct military strikes on Iran,
                            despite rising tensions over Tehran’s nuclear programme and regional proxies. Meanwhile, defence
                            sources and analysts have raised concerns about the strain on U.S. missile defence stocks after
                            previous conflicts, complicating options for a sustained campaign. With a major U.S. naval presence
                            now deployed but diplomatic talks ongoing, Washington appears to be weighing the risks of escalation
                            against the high political and military cost of an all-out conflict.</p>
                    </div>
                </div>
                <div className='w-full space-y-4'>
                    <div className='flex space-x-4 mb-10'>
                        <button className='rounded-full w-12 h-12 bg-green-600 text-white text-xl'>u</button>
                        <input type="textarea" placeholder='Add a comment' className='flex-1 border-gray-200 outline-none border-b-1' />
                        <button className='bg-black text-white px-5 rounded-full'>Send</button>
                    </div>
                    <div className='space-y-6'>
                        {comments.map((c, i) => (
                            <div key={i} className='flex space-x-4'>
                                <button className='rounded-full w-10 h-10 bg-orange-600 text-white text-xl'>{c}</button>
                                <div className='flex-1'>
                                    <div className='flex'>
                                        <p className='font-bold'>
                                            @RodneySlinger
                                        </p>
                                        <p className='text-gray-500'>14 minutes ago</p>
                                    </div>
                                    <div>
                                        <p>Trump being bag boy for Netanyahu</p>
                                    </div>
                                    <div className='flex space-x-4'>
                                        <div className='flex space-x-2 items-center'><ThumbsUp size={20}/> <p className='text-gray-500' >1</p> </div>
                                        <div className='flex space-x-2 items-center'><ThumbsDown size={20}/> <p className='text-gray-500' >1</p> </div>
                                        <button className='font-bold'>reply</button>
                                    </div>
                                </div>
                                <EllipsisVertical />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='hidden lg:block space-y-4'>
                {
                    videos.map((v, i) => (
                        <div key={i} className='flex space-x-4 text-xs h-25'>
                            <div className='w-[40%] h-full rounded-md bg-black'></div>
                            <div className='w-[50%] h-full text-gray-500'>
                                <p className='font-bold text-black'>What’s Hidden Under Antarctica Will Cause Global Tension</p>
                                <p>New Nature</p>
                                <p>2M views  7 days ago</p>
                            </div>
                            <div>:</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
