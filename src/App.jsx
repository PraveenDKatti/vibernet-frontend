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

          <Route element={<AuthLayout authentication={true} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription" element={<Subscription />} />
          </Route>
        </Route>
        
        <Route element={<AuthLayout authentication={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<WatchLayout />}>
          <Route path="/Watch/:videoId" element={<Watch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
