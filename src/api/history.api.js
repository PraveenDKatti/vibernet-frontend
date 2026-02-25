import client from "./client";

export const updateHistory = (videoId) =>
  client.post(`/history/${videoId}`).then(res => res.data)

export const removeFromHistory = (videoId) =>
  client.delete(`/history/${videoId}`).then(res => res.data)


export const getWatchHistory = () =>
  client.get("/history").then(res => res.data)