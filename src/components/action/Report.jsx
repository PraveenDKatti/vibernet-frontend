import React, { useState } from 'react'
import Modal from '../ui/Modal'

const reasons = [
    'image or title',
    'Sexual content',
    'Violent or repulsive content',
    'Hateful or abusive content',
    'Harmful or dangerous acts',
    'Spam or misleading',
]

function Report({setActive}) {
    const [selected, setSelected] = useState('')
    return (
        <Modal>
            <form onSubmit={createNewPlaylist} className='rounded-md bg-white p-4 space-y-3'>
                <div className='shadow-md bg-white p-4 w-75 md:w-125 space-y-5 rounded-xl'>
                    {reasons.map((reason) =>
                        <label className='flex gap-4' htmlFor="">
                            <input type="radio" name='report' value={reason} checked={selected == {reason}} onChange={e => setSelected(e.target.value)} />{reason}
                        </label>
                    )}
                </div>
                <div className='space-x-2 flex justify-end'>
                    <button
                        onClick={() => setActive(prev => !prev)}
                        className='rounded-full border-1 border-black/30 hover:border-none hover:bg-gray-100 p-3'>
                        Cancel</button>
                    <button
                        type='submit'
                        className={`rounded-full border-none ${selected.length === 0 ? "opacity-50 bg-gray-200" : "opacity-100 bg-black text-white"} p-3`}>
                        Report
                    </button>
                </div>
            </form>

        </Modal>
    )
}

export default Report