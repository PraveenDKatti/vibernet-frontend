import React, { useState } from 'react'
import Modal from '../ui/Modal'
import useAuthStore from '../../store/authStore'
import {createPlaylist, addVideoToPlaylist} from '../../api/playlist.api'
import { Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function SaveToPlaylist() {
    const [playlists, setPlaylists] = useState([])
    const [name, setName] = useState('')
    const [visibility, setVisibility] = useState('')
    const [toggleMenu, setToggleMenu] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { isAuthenticated } = useAuthStore()
    const navigate = useNavigate()

    const handlePlaylist = async (playlistId, videoId) => {
        try {
            const response = await addVideoToPlaylist(playlistId, videoId)
        } catch (err) {
            console.error(err)
        }
    }

    const createNewPlaylist = async (event) => {
        event.preventDefault()
        try {
            const response = await createPlaylist({ name, visibility })
            console.log(response)
        } catch (err) {
            console.error(err)
        } finally {
            setName('')
            setVisibility('')
        }
    }

    return (
        <div className='relative bg-gray-100 rounded-full px-3 p-2'>
            <Bookmark onClick={()=>setToggleMenu(!toggleMenu)} size={20} />
            {!isAuthenticated ?
                (toggleMenu &&
                <div className='absolute left-8 bottom-8 text-center shadow-md bg-white p-4 w-50 md:w-75 space-y-4 rounded-md'>
                    <h3 className='text-md'>Want to watch this again later?</h3>
                    <p className='text-sm'>Sign in to add this video to a playlist.</p>
                    <button
                        onClick={()=>navigate('/login')} 
                        className='bg-black text-white w-full rounded-full p-3'>Log in</button>
                </div>
                )
                :
                (toggleMenu &&
                <div className='absolute bottom-9 shadow-md bg-white p-2 w-40 md:w-60 space-y-4 rounded-md'>
                    <p className='font-medium'>Save to..</p>
                    {playlists.length == 0 ? <p className='text-center'>No playlists</p> :
                        playlists.map((p) => (
                            <div className='flex justify-between'>
                                <p><img src={p.thumbnail} alt="" />{p.name}</p>
                                <Bookmark
                                    size={20}
                                    onClick={() => handlePlaylist(video._id)} />
                            </div>
                        ))}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='w-full rounded-full bg-gray-100 px-3 py-2'>
                        Create Playlist
                    </button>
                    {isOpen && (
                        <Modal>
                            <form onSubmit={createNewPlaylist} className='rounded-md bg-white p-4 space-y-3'>
                                <h4 className='text-left'>New Playlist</h4>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='name'
                                    className='w-full border-1 border-black/30 outline-none p-3 rounded-lg' />
                                <select
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value)}
                                    name="visibility"
                                    className='w-full border-1 border-black/30 outline-none p-3 rounded-lg'>
                                    <option selected disabled value="visibility">visibility</option>
                                    <option value="private">Private</option>
                                    <option value="public">Public</option>
                                </select>
                                <div className='space-x-2 flex justify-end'>
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className='rounded-full border-1 border-black/30 hover:border-none hover:bg-gray-100 p-3'>
                                        Cancel</button>
                                    <button
                                        type='submit'
                                        className={`rounded-full border-none ${name.length === 0 ? "opacity-50 bg-gray-200" : "opacity-100 bg-black text-white"} p-3`}>
                                        Create</button>
                                </div>
                            </form>
                        </Modal>
                    )}
                </div>)
            }
        </div>
    )
}

export default SaveToPlaylist