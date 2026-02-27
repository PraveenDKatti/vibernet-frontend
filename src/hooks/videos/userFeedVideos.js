export function useFeedVideos() {
    const [homeFeed, setHomeFeed] = useState([])
    useEffect(() => {
        async function fetchVideos() {
            const response = await getAllVideos()
            setHomeFeed(response.data.docs)
        }

        fetchVideos()
    }, [])
}