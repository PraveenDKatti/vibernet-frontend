import client from "./client";

export const toggleSubscription = (channelId) =>
  client.post(`/subscriptions/channel/${channelId}`).then(res => res.data)


export const getUserChannelSubscribers = (channelId) =>
  client.get(`/subscriptions/channel/${channelId}`).then(res => res.data)


export const getSubscribedChannels = (subscriberId) =>
  client.get(`/subscriptions/${subscriberId}`).then(res => res.data)

