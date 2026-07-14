import React, { useState, useRef } from 'react';
import { EllipsisVertical, Moon, Languages, Settings, Info, MessageSquareWarning, ChevronRight } from 'lucide-react';
import useClickOutside from '../../hooks/useClickOutside';

export default function PageMenu() {
    const [active, setActive] = useState(false);
    const modalRef = useRef(null);

    useClickOutside(modalRef, () => {
        setActive(false);
    });

    return (
        <>
            <EllipsisVertical onClick={() => setActive(!active)} className="cursor-pointer" />
            <div className='relative' ref={modalRef}>
                {active && (
                    <div
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
    );
}
