import client from "./client";

export const createPlaylist = (data) =>
  client.post("/playlist", data).then(res => res.data)


export const getUserPlaylists = (userId) =>
  client.get(`/playlist/user/${userId}`).then(res => res.data)


export const getPlaylistById = (playlistId) =>
  client.get(`/playlist/${playlistId}`).then(res => res.data)


export const addVideoToPlaylist = (playlistId, videoId) =>
  client.patch(
    `/playlist/${playlistId}/add/${videoId}`
  ).then(res => res.data)


export const removeVideoFromPlaylist = (playlistId, videoId) =>
  client.patch(
    `/playlist/${playlistId}/remove/${videoId}`
  ).then(res => res.data)


export const updatePlaylist = (playlistId, data) =>
  client.patch(`/playlist/update/${playlistId}`, data).then(res => res.data)


export const deletePlaylist = (playlistId) =>
  client.delete(`/playlist/${playlistId}`).then(res => res.data)

