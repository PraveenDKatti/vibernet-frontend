import { Clock5, ArrowDownToLine, ListVideo, Forward, EllipsisVertical, Trash, Flag } from 'lucide-react'
import React, { useRef, useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import useAutoPosition from '../../hooks/useAutoPosition'
import { addToWatchLater } from '../../api/watchlater.api'
import ShareVideo from '../action/ShareVideo'
import SaveToPlaylist from '../action/SaveToPlaylist'
import Report from '../action/Report'
import useAuthStore from '../../store/authStore'

const itemIcons = {
    watchLater: Clock5,
    download: ArrowDownToLine,
    saveToPlaylist: ListVideo,
    share: Forward,
    remove: Trash,
    report: Flag,
}

const actionComponents = {
    saveToPlaylist: SaveToPlaylist,
    share: ShareVideo,
    report: Report,
}

function ThreeDotMenu({ items, onToggleMenu }) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeAction, setActiveAction] = useState(null)
    const menuRef = useRef(null)
    const dropdownRef = useRef(null)
    const {isAuthenticated} = useAuthStore()

    const closeMenu = () => {
        setIsOpen(false)
        onToggleMenu?.(false)
    }

    useClickOutside(menuRef, closeMenu)
    useAutoPosition(dropdownRef, isOpen)

    const handleClick = () => {
        const status = !isOpen
        setIsOpen(status)
        onToggleMenu?.(status)
    }

    const handleAction = async (item) => {
        closeMenu()
        setActiveAction(actionComponents[item.icon] ? item.icon : null)
        const { title } = item
        if (title == 'WatchLater') {
            if(!isAuthenticated) return
            try {
                const response = await addToWatchLater(videoId)
            } catch (err) {
                console.error(err)
            }
        }
    }

    const ActiveAction = actionComponents[activeAction]

    return (
        <div
            ref={menuRef}
            className='relative inline-flex h-[fit-content]'
            onClick={(event) => event.stopPropagation()}
        >
            <EllipsisVertical onClick={handleClick} size={20} />
            {isOpen &&
                <div
                    ref={dropdownRef}
                    role='menu'
                    className='absolute left-0 top-full z-50 mt-2 min-w-max rounded-lg bg-white py-2 shadow-[0px_2px_6px_1px_rgb(0_0_0/0.14)]'
                >
                    {items.map((item, index) => {
                        const Icon = itemIcons[item.icon]
                        return (
                            <button
                                key={`${item.icon}-${index}`}
                                onClick={() => handleAction(item)}
                                type='button'
                                role='menuitem'
                                className='flex w-full text-[14px] font-normal cursor-pointer items-center gap-4 whitespace-nowrap h-10 px-3 text-left hover:bg-gray-100'
                            >
                                {Icon && <Icon size={24} />}
                                {item.title}
                            </button>
                        )
                    })}
                </div>
            }
            {ActiveAction && (
                <ActiveAction
                    onClose={() => setActiveAction(null)}
                    setActive={() => setActiveAction(null)}
                />
            )}
        </div>
    )
}

export default ThreeDotMenu