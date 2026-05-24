import React, { useState, useEffect, useRef } from 'react';
import { EllipsisVertical, Moon, Languages, Settings, Info, MessageSquareWarning, ChevronRight } from 'lucide-react';

export default function MenuModal({children, definer}) {
    const [active, setActive] = useState(false);
    const modalRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setActive(false)
            }
        }

        if (active) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [active])


    return (
        <>
            <div className='relative'>
            <div onClick={() => setActive(!active)}> {definer} </div>
                {active && (
                    <div
                        ref={modalRef}
                        className="absolute rounded-xl py-2 px-1 w-max bg-white right-1 top-12 
                    shadow-[0px_0px_10px_0.1px_rgba(0,0,0,0.1)] z-50 text-sm text-gray-700"
                    >{children}
                    </div>
                )}
            </div>
        </>
    )
}
 