import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import useAuthStore from "./store/authStore";

// layout
import MainLayout from "./layouts/MainLayout";
import WatchLayout from "./layouts/WatchLayout";
import AuthLayout from "./layouts/AuthLayout";
import PageLoader from "./components/common/PageLoader";

// pages
const Home = lazy(() => import("./pages/Home"));
const Watch = lazy(() => import("./pages/Watch"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Subscription = lazy(() => import("./pages/subscription/Subscription"));
const SubscribedChannels = lazy(() => import("./pages/subscription/SubscribedChannels"));
const Channel = lazy(() => import("./pages/channel/Channel"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NotFound = lazy(() => import('./pages/NotFound'));
const UploadVideo = lazy(() => import("./pages/UploadVideo"));

// tabs
const HomeTab = lazy(() => import("./pages/channel/tabs/HomeTab"));
const VideosTab = lazy(() => import("./pages/channel/tabs/VideosTab"));
const PlaylistsTab = lazy(() => import("./pages/channel/tabs/PlaylistsTab"));
const CommunityTab = lazy(() => import("./pages/channel/tabs/CommunityTab"));
const ChannelTab = lazy(() => import("./pages/channel/tabs/ChannelTab"));

export default function App() {
  const { checkAuth } = useAuthStore();

  // Run once on app mount to see if we have a valid session/cookie
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
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
          <Route path="/upload" element={<UploadVideo />} />
        </Route>

        <Route path="/:username" element={<Channel />}>
          <Route index element={<HomeTab />} />
          <Route path="videos" element={<VideosTab />} />
          <Route path="playlists" element={<PlaylistsTab />} />
          <Route path="community" element={<CommunityTab />} />
          <Route path="channel" element={<ChannelTab />} />
        </Route>
      </Route>

      <Route element={<AuthLayout authentication={false} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<WatchLayout />}>
        <Route path="/watch/:videoId" element={<Watch />} />
      </Route>


      <Route path="*" element={
        <Suspense fallback={<PageLoader />}>
          <NotFound />
        </Suspense>}
      />
    </Routes>
  );
}
