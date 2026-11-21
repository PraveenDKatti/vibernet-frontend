import React, { useState } from 'react'
import Modal from '../ui/Modal'
import { Forward, X, Code } from 'lucide-react'
import { SocialIcon } from 'react-social-icons'
import { useNavigate } from 'react-router-dom'

const socials = [
    { title:"embed", icon: <Code className='rounded-full border-1 p-2 border-gray-500' color='gray' size={50} />, link: "" },
    { title:"whatsapp", icon: <SocialIcon url="https://whatsapp.com" />, link: "" },
    { title:"facebook", icon: <SocialIcon url="https://facebook.com" />, link: "" },
    { title:"twitter", icon: <SocialIcon url="https://x.com" />, link: "" },
    { title:"message", icon: <img src='https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/google-messages.webp'/>, link: "" },
    { title:"email", icon: <SocialIcon url="mailto:hello@example.com" />, link: "" },
    { title:"linkedin", icon: <SocialIcon url="https://linkedin.com" />, link: "" }
]

function ShareVideo() {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='flex items-center space-x-4 rounded-full bg-gray-100 px-3 py-2'>
            <Forward onClick={() => setIsOpen(!isOpen)} size={20} />
            {isOpen &&
                <Modal>
                    <div className='shadow-md bg-white p-4 w-75 md:w-125 space-y-5 rounded-xl'>
                        <div className='text-center'>
                            <X onClick={() => setIsOpen(!isOpen)} className='justify-self-end'/>
                            <p className='text-md mb-5 font-normal'>Share in a Post</p>
                            <button
                                onClick={() => navigate('/login')}
                                className='bg-black text-white rounded-full p-3'>Create Post</button>
                        </div>
                        <div className='border-1 border-gray-200 w-full'></div>
                        <div className='space-y-5'>
                            <p className='text-md font-normal'>Share</p>
                            <div className='flex text-center w-full gap-4 overflow-hidden'>
                                {socials.map((s, index) =>
                                    <div key={index} className='space-y-2'>
                                        <p className='md:max-h-12'>{s.icon}</p>
                                        <p className='text-sm font-normal'>{s.title}</p>
                                    </div>
                                )}
                            </div>
                            <div className='flex items-center border-1 border-gray-200 rounded-xl p-2'>
                                <input type="text" placeholder='link' className='flex-1 p-2' />
                                <button className='px-3.5 py-3 h-[max-content] text-[14px] rounded-full border-1 border-gray-300'>Copy</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default ShareVideo