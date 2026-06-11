import client from "./client";

export const publishVideo = (data) =>
  client.post("/videos/publish", data).then(res => res.data)


export const togglePublishStatus = (videoId) =>
  client.patch(`/videos/toggle/publish/${videoId}`).then(res => res.data)


export const updateVideo = (videoId, data) =>
  client.patch(`/videos/update/${videoId}`, data).then(res => res.data)


export const deleteVideo = (videoId) =>
  client.delete(`/videos/delete/${videoId}`).then(res => res.data)


export const getAllVideos = (params) =>
  client.get("/videos",{ params }).then(res => res.data)


export const getVideoById = (videoId) =>
  client.get(`/videos/${videoId}`).then(res => res.data)

