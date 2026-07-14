import { useState, useEffect } from "react";
import { getAllVideos } from "../../api/video.api";

export function useFeedVideos() {
    const [homeFeed, setHomeFeed] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await getAllVideos();
                setHomeFeed(response.data.docs);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, []);

    return { homeFeed, loading };
}