import client from "./client";

export const toggleVideoLike = (videoId) =>
  client.post(`/likes/toggle/v/${videoId}`).then(res => res.data)


export const toggleCommentLike = (commentId) =>
  client.post(`/likes/toggle/c/${commentId}`).then(res => res.data)


export const getLikedVideos = () =>
  client.get("/likes/videos").then(res => res.data)

