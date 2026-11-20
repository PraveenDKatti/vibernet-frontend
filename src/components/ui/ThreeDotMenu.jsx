import { Clock5, ArrowDownToLine, ListVideo, Forward, EllipsisVertical } from 'lucide-react'
import React, { useRef, useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import useAutoPosition from '../../hooks/useAutoPosition'

const itemIcons = {
    watchLater: Clock5,
    download: ArrowDownToLine,
    saveToPlaylist: ListVideo,
    share: Forward
}

function ThreeDotMenu({ items }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const dropdownRef = useRef(null)

    useClickOutside(menuRef, () => {
        setIsOpen(false)
    });
    useAutoPosition(dropdownRef, isOpen)

    return (
        <div
            ref={menuRef}
            className='relative inline-flex h-[fit-content]'
            onClick={(event) => event.stopPropagation()}
        >
            <EllipsisVertical onClick={() => setIsOpen((open) => !open)} size={20} />
            {isOpen &&
                <div
                    ref={dropdownRef}
                    role='menu'
                    className='absolute right-0 top-full z-50 mt-2 min-w-max rounded-lg bg-white py-2 shadow-md'
                >
                    {items.map((item, index) => {
                        const Icon = itemIcons[item.icon]
                        return (
                            <button
                                key={`${item.icon}-${index}`}
                                type='button'
                                role='menuitem'
                                className='flex w-full cursor-pointer items-center gap-4 whitespace-nowrap p-3 text-left hover:bg-gray-100'
                            >
                                {Icon && <Icon size={20} />}
                                {item.title}
                            </button>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default ThreeDotMenu