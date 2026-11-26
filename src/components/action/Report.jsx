import React, { useRef, useState } from 'react'
import Modal from '../ui/Modal'
import useClickOutside from '../../hooks/useClickOutside'

const reasons = [
    'Sexual content',
    'Violent or repulsive content',
    'Hateful or abusive content',
    'Harmful or dangerous acts',
    'Spam or misleading',
]

function Report({ onClose }) {
    const [selected, setSelected] = useState('')
    const reportRef = useRef(null)
    useClickOutside(reportRef, onClose)

    const submitReport = (e) => {
        e.preventDefault()
        if (!selected) return
        onClose()
    }

    return (
        <Modal >
            <form ref={reportRef} onSubmit={submitReport} className='rounded-xl w-75 md:w-90 bg-white p-5'>
                <p className='mb-4'>Report image or title</p>
                <div className='space-y-4'>
                    {reasons.map((reason,index) =>
                        <label
                            key={index}
                            className='flex gap-4' htmlFor={`${reason}index`}>
                            <input type="radio" name='report' id={`${reason}index`} value={reason} checked={selected == reason } onChange={e => setSelected(e.target.value)} />{reason}
                        </label>
                    )}
                </div>
                <div className='space-x-2 mt-8 flex justify-end'>
                    <button
                        onClick={onClose}
                        className='rounded-full border-1 border-black/30 hover:border-none hover:bg-gray-100 p-3'>
                        Cancel</button>
                    <button
                        type='submit'
                        className={`rounded-full border-none ${selected ?  "opacity-100 bg-black text-white": "opacity-50 bg-gray-200"} p-3`}>
                        Report
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default Report