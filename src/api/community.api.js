import client from "./client";

export const createPost = (data) =>
  client.post("/community", data).then(res => res.data)


export const channelPosts = (userId) =>
  client.get(`/community/user/${userId}`).then(res => res.data)


export const updatePost = (postId, data) =>
  client.patch(`/community/${postId}`, data).then(res => res.data)


export const deletePost = (postId) =>
  client.delete(`/community/user/${postId}`).then(res => res.data)

