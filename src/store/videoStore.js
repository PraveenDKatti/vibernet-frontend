import { create } from "zustand";
import { getVideoById } from '../api/video.api'

const useVideoStore = create((set, get) => ({
    currentVideo: null,
    loading: false,

    fetchVideo: async (videoId) => {
        set({ loading: true })
        const res = await getVideoById(videoId)
        set({
            currentVideo: res.data,
            loading: false
        })
    },

    updateSubscriptionStatus: (status) =>
        set((state) => ({
            currentVideo: {
                ...state.currentVideo,
                owner: {
                    ...state.currentVideo.owner,
                    isSubscribed: status
                }
            }
        }))
}))

export default useVideoStore