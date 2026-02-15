import client from "./client";

export const createPlaylist = (data) =>
  client.post("/playlists", data).then(res => res.data)


export const getUserPlaylists = (userId) =>
  client.get(`/playlists/user/${userId}`).then(res => res.data)


export const getPlaylistById = (playlistId) =>
  client.get(`/playlists/${playlistId}`).then(res => res.data)


export const addVideoToPlaylist = (playlistId, videoId) =>
  client.patch(
    `/playlists/user/${playlistId}/add/${videoId}`
  ).then(res => res.data)


export const removeVideoFromPlaylist = (playlistId, videoId) =>
  client.patch(
    `/playlists/${playlistId}/remove/${videoId}`
  ).then(res => res.data)


export const updatePlaylist = (playlistId, data) =>
  client.patch(`/playlists/update/${playlistId}`, data).then(res => res.data)


export const deletePlaylist = (playlistId) =>
  client.delete(`/playlists/${playlistId}`).then(res => res.data)

