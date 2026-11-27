
export const getVideoShareUrl = (path, origin) => {
    if (!path || !origin) return ''
    const shareUrl = new URL(path, origin).toString()
    return shareUrl
}