import client from "./client";

export const addToWatchLater = (videoId) =>
  client.post(`/watchlater/${videoId}`).then(res => res.data)

export const removeFromWatchLater = (videoId) =>
  client.delete(`/watchlater/${videoId}`).then(res => res.data)

export const getWatchLaterVideos = () =>
  client.get("/watchlater").then(res => res.data)
