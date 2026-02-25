import client from "./client";

export const toggleSubscription = (username) =>
  client.post(`/subscriptions/${username}`).then(res => res.data)


export const getUserChannelSubscribers = (username) =>
  client.get(`/subscriptions/${username}`).then(res => res.data)


export const getSubscribedChannels = (subscriberId) =>
  client.get(`/subscriptions/${subscriberId}`).then(res => res.data)


export const getSubscribedFeed = () =>
  client.get(`/subscriptions/feed`).then(res => res.data)

