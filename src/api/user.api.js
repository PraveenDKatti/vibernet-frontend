import client from "./client";

export const currentUser = () =>
  client.get("/users/current-user").then(res => res.data)


export const updateAccount = (data) =>
  client.patch("/users/update-account", data).then(res => res.data)


export const avatar = (data) =>
  client.patch("/users/avatar", data).then(res => res.data)


export const coverImage = (data) =>
  client.patch("/users/coverImage", data).then(res => res.data)


export const profile = (username) =>
  client.get(`/users/c/${username}`).then(res => res.data)


export const watchHistory = () =>
  client.get("/users/history").then(res => res.data)

