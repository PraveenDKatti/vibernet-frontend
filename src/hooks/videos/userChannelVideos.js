export function useChannelVideos(username) {
    const [channelVideos, setChannelVideos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchChannelData() {
            const resVideos = await getAllVideos({ username })
            setChannelVideos(resVideos.data.docs)
        }
    }, [username])
}