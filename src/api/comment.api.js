import client from "../utils/client.js";

export const getVideoComments = (videoId) =>
  client.get(`/comments/v/${videoId}`).then(res => res.data)


export const getPostComments = (postId) =>
  client.get(`/comments/p/${postId}`).then(res => res.data)


export const addVideoComment = ({videoId, content}) =>
  client.post(`/comments/v/${videoId}`, {content}).then(res => res.data)


export const addPostComment = ({postId, content}) =>
  client.post(`/comments/p/${postId}`, content).then(res => res.data)


export const updateComment = ({commentId, content}) =>
  client.patch(`/comments/c/${commentId}`, content).then(res => res.data)


export const deleteComment = (commentId) =>
  client.delete(`/comments/c/${commentId}`).then(res => res.data)

