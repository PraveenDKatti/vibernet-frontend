import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import WatchLayout from "./layouts/WatchLayout"
import Home from "./pages/Home";
import Watch from "./pages/Watch"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthLayout from "./layouts/AuthLayout";
import useAuthStore from "./store/authStore";
import Profile from "./pages/profile/Profile";
import Subscription from "./pages/Subscription";
import SubscribedChannels from "./pages/SubscribedChannels";
import Channel from "./pages/channel/Channel"
import SearchResults from "./pages/SearchResults"
import NotFound from './pages/NotFound'
import UploadVideo from "./pages/UploadVideo";

import HomeTab from "./pages/channel/tabs/HomeTab";
import VideosTab from "./pages/channel/tabs/VideosTab";
import PlaylistsTab from "./pages/channel/tabs/PlaylistsTab";
import CommunityTab from "./pages/channel/tabs/CommunityTab";
import ChannelTab from "./pages/channel/tabs/ChannelTab";

export default function App() {
  const { checkAuth } = useAuthStore();

  // Run once on app mount to see if we have a valid session/cookie
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap all pages with MainLayout */}
        <Route element={<MainLayout />}>
          {/* Home page */}
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<SearchResults />} />

          <Route element={<AuthLayout authentication={true} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/subscriptions" element={<Subscription />} />
            <Route path="/profile/channels" element={<SubscribedChannels />} />
            <Route path="/:username" element={<Channel />}>
              <Route index element={<HomeTab />} />
              <Route path="videos" element={<VideosTab />} />
              <Route path="playlists" element={<PlaylistsTab />} />
              <Route path="community" element={<CommunityTab />} />
              <Route path="channel" element={<ChannelTab />} />
            </Route>
            <Route path="/upload" element={<UploadVideo />} />
          </Route>
        </Route>

        <Route element={<AuthLayout authentication={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<WatchLayout />}>
          <Route path="/Watch/:videoId" element={<Watch />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
