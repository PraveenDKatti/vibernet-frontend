import React, { useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

export default function MenuModal({ children, definer }) {
    const [active, setActive] = useState(false);
    const modalRef = useRef(null);

    useClickOutside(modalRef, () => {
        setActive(false);
    });

    return (
        <div className='relative'>
            <div onClick={() => setActive(!active)} className="cursor-pointer">
                {definer}
            </div>
            {active && (
                <div
                    ref={modalRef}
                    className="absolute rounded-xl py-2 px-1 w-max bg-white right-1 top-12 
                    shadow-[0px_0px_10px_0.1px_rgba(0,0,0,0.1)] z-50 text-sm text-gray-700"
                >
                    {children}
                </div>
            )}
        </div>
    );
}
