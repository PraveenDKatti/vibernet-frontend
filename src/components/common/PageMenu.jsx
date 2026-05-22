import React, { useState, useEffect, useRef } from 'react';
import { EllipsisVertical, Moon, Languages, Settings, Info, MessageSquareWarning, ChevronRight } from 'lucide-react';

export default function PageMenu() {
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
            <EllipsisVertical onClick={() => setActive(!active)} />
            <div className='relative'>
                {active && (
                    <div
                        ref={modalRef}
                        className="absolute rounded-xl py-2 px-1 w-56 bg-white right-1 top-2 
                    shadow-[0px_0px_10px_0.1px_rgba(0,0,0,0.1)] z-50 text-sm text-gray-700"
                    >
                        {[
                            { icon: <Moon size={18} />, label: "Appearance:", toggle: true },
                            { icon: <Languages size={18} />, label: "Display Language:", toggle: true },
                            { icon: <Settings size={18} />, label: "Settings:", extra: "", hasBorder: true },
                            { icon: <Info size={18} />, label: "Help" },
                            { icon: <MessageSquareWarning size={18} />, label: "Feedback" },
                        ].map((item, index) => (
                            <button
                                key={index}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-100 
                          dark:hover:bg-zinc-800 transition-colors
                          ${item.hasBorder ? 'border-t border-b border-gray-100 my-1 py-3' : ''}`}
                            >
                                <span className="flex gap-4">{item.icon} {item.label}</span>
                                {item.toggle && <ChevronRight size={18} />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
