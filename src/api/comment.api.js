import client from "./client";

export const getVideoComments = (videoId) =>
  client.get(`/comments/${videoId}/comments`).then(res => res.data)


export const addComment = (videoId, data) =>
  client.post(`/comments/${videoId}/comments`, data).then(res => res.data)


export const updateComment = (commentId, data) =>
  client.patch(`/comments/c/${commentId}`, data).then(res => res.data)


export const deleteComment = (commentId) =>
  client.delete(`/comments/c/${commentId}`).then(res => res.data)

