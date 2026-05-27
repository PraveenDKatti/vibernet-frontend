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

    updateSubscriptionStatus: (status) => {
        set((state) => ({
            currentVideo: {
                ...state.currentVideo,
                owner: {
                    ...state.currentVideo.owner,
                    isSubscribed: status
                }
            }
        }))
    },

    updateLikeStatus: (status) => {
        set((state) => {
            if (!state.currentVideo) return state;

            const previouslyLiked = state.currentVideo.isLiked;
            let newLikesCount = state.currentVideo.likesCount || 0;

            // Calculate the new likesCount based on state transitions
            if (status === 'like' && !previouslyLiked) {
                // User is liking the video for the first time
                newLikesCount += 1;
            } else if (status !== 'like' && previouslyLiked) {
                // User is removing their like (either unliking or switching to dislike)
                newLikesCount = Math.max(0, newLikesCount - 1);
            }

            return {
                currentVideo: {
                    ...state.currentVideo,
                    isLiked: status === 'like',
                    isDisliked: status === 'dislike',
                    likesCount: newLikesCount
                }
            };
        });
    }
}))

export default useVideoStore