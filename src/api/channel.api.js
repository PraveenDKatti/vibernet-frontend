import client from "./client";

export const getChannelStats = () =>
  client.get("/channel/stats").then(res => res.data)


export const getChannelVideos = () =>
  client.get("/channel/videos").then(res => res.data)

