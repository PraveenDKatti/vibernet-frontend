import client from "./client";

export const createPost = (data) =>
  client.post("/posts", data).then(res => res.data)


export const channelPosts = (username) =>
  client.get(`/posts/${username}`).then(res => res.data)


export const updatePost = (postId, data) =>
  client.patch(`/posts/${postId}`, data).then(res => res.data)


export const deletePost = (postId) =>
  client.delete(`/posts/${postId}`).then(res => res.data)

