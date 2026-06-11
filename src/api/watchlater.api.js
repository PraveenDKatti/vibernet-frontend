import client from "./client";

export const toggleWatchLater = (videoId) =>
  client.post(`/watchlater/${videoId}`).then(res => res.data)

export const deleteFromWatchLater = (videoId) =>
  client.delete(`/watchlater/${videoId}`).then(res => res.data)


export const getWatchLaterVideos = () =>
  client.get("/watchlater").then(res => res.data)
