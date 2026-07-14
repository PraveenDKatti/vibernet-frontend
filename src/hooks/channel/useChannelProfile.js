export function useChannelProfile(username) {
  return {
    channel: null,
    subscribers: 0,
    loading: false,
    isOwner: false,
    username,
  };
}