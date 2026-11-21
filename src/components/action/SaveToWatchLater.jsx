import React from 'react'
import React, { useState } from 'react'
import {addToWatchLater} from '../../api/watchlater.api'
import { Clock5 } from 'lucide-react'

function SaveToWatchLater() {

    const saveToWatchLater = async (videoId) => {
        try {
            const response = await addToWatchLater(videoId)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='relative bg-gray-100 rounded-full px-3 p-2'>
            <Clock5 onClick={saveToWatchLater} size={20} />
        </div>
    )
}

export default SaveToWatchLater