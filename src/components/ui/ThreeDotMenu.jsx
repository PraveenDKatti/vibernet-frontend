import { Clock5, ArrowDownToLine, ListVideo, Forward, EllipsisVertical } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'

const itemIcons = {
    watchLater: Clock5,
    download: ArrowDownToLine,
    saveToPlaylist: ListVideo,
    share: Forward
}

function ThreeDotMenu({ items }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    useClickOutside(menuRef, () => {
        setIsOpen(false)
    });

    return (
        <>
            <EllipsisVertical onClick={() => setIsOpen(!isOpen)} size={20} />
            <div ref={menuRef} className='relative'>
                {isOpen &&
                    <div className='absolute bg-white py-2 rounded-lg shadow-md space-x-4'>
                        {items.map((item, index) => {
                            const Icon = itemIcons[item.icon]
                            return (
                                <span key={index} className='w-full cursor-pointer hover:bg-gray-100 p-3 flex gap-4'>
                                    {Icon && <Icon size={20} />}
                                    <button className='w-[max-content]'>{item.title}</button>
                                </span>)
                        }
                        )}
                    </div>
                }
            </div>
        </>
    )
}

export default ThreeDotMenu