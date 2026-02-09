import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import WatchLayout from "./layouts/WatchLayout"
import Home from "./pages/Home";
import Watch from "./pages/Watch"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap all pages with MainLayout */}
        <Route element={<MainLayout />}>
          {/* Home page */}
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<WatchLayout />}>
          <Route path="/Watch/:videoId" element={<Watch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
