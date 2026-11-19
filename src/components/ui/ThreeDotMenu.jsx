import { Clock5, ArrowDownToLine, ListVideo, Forward, EllipsisVertical } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const itemIcons = {
    watchLater: Clock5,
    download: ArrowDownToLine,
    saveToPlaylist: ListVideo,
    share: Forward
}

function ThreeDotMenu({ items }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setIsOpen(false)
            }
        }

        const handleKeyDown = (event)=>{
            if(event.key == 'Escape'){
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        document.addEventListener('keydown', handleKeyDown)

        return ()=> {
            document.removeEventListener('mousedown', handleOutsideClick)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <div ref={menuRef} className='relative'>
            <EllipsisVertical
                onClick={() => setIsOpen(!isOpen)}
                size={20} />
            {!isOpen ? null :
                <div className='absolute bg-white py-2 rounded-md shadow-md space-x-4'>
                    {items.map((item, index) =>{
                        const Icon = itemIcons[item.icon]
                        return(
                        <span key={index} className='w-full cursor-pointer hover:bg-gray-100 p-4 flex justify-between'>
                            <button>{item.title}</button>
                            {Icon && <Icon size={20} /> }
                        </span>)
                    }
                    )}
                </div>
            }
        </div>
    )
}

export default ThreeDotMenu