import client from "./client";

export const toggleLikeReaction = ({ targetId, type, targetType }) =>
  client
    .post(`/likes/toggle/${targetId}?type=${type}&targetType=${targetType}`)
    .then(res => res.data);


export const getLikedVideos = () =>
  client.get("/likes/videos").then(res => res.data)

