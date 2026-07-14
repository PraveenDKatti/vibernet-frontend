import { useState, useEffect } from "react";
import { getAllVideos } from "../../api/video.api";

export function useChannelVideos(username) {
    const [channelVideos, setChannelVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChannelData() {
            try {
                const resVideos = await getAllVideos({ username });
                setChannelVideos(resVideos.data.docs);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        if (username) {
            fetchChannelData();
        }
    }, [username]);

    return { channelVideos, loading };
}