import { Clock5, ArrowDownToLine, ListVideo, Forward, EllipsisVertical, Trash, Flag } from 'lucide-react'
import { useRef, useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import useAutoPosition from '../../hooks/useAutoPosition'
import { addToWatchLater, removeFromWatchLater } from '../../api/watchlater.api'
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

function ThreeDotMenu({ items = [], videoId, onToggleMenu }) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeAction, setActiveAction] = useState(null)
    const menuRef = useRef(null)
    const dropdownRef = useRef(null)
    const { isAuthenticated } = useAuthStore()

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
        if (actionComponents[item.icon]) {
            setIsOpen(false)
            setActiveAction({
                type: item.icon,
                link: typeof item.link === 'string' ? item.link : item.link?.href || '',
                videoId: item.id || videoId,
            })
        } else {
            closeMenu()
        }

        const targetVideoId = item.id || videoId

        if (item.icon === 'watchLater') {
            if (!isAuthenticated || !targetVideoId) return
            try {
                await addToWatchLater(targetVideoId)
            } catch (err) {
                console.error(err)
            }
        }

        if (item.icon === 'remove') {
            if (!isAuthenticated || !targetVideoId) return
            try {
                await removeFromWatchLater(targetVideoId)
            } catch (err) {
                console.error(err)
            }
        }
    }

    const ActiveAction = activeAction ? actionComponents[activeAction.type] : null

    return (
        <div
            ref={menuRef}
            className='relative inline-flex h-[fit-content]'
            onClick={(event) => event.stopPropagation()}
        >
            <button
                type='button'
                aria-label='Open menu'
                aria-expanded={isOpen}
                onClick={handleClick}
                className='cursor-pointer'
            >
                <EllipsisVertical size={20} />
            </button>
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
                    shareLink={activeAction.link}
                    videoId={activeAction.videoId}
                    onClose={() => {
                        setActiveAction(null)
                        onToggleMenu?.(false)
                    }}
                />
            )}
        </div>
    )
}

export default ThreeDotMenu