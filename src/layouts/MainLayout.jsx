import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import OverlaySidebar from "./OverlaySidebar";
import { useState } from "react";

export default function MainLayout() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      
      {/* Top bar */}
      <TopBar onMenuClick={() => setOverlayOpen(true)} />

      {/* Overlay sidebar (conditional) */}
      {overlayOpen && (
        <OverlaySidebar onClose={() => setOverlayOpen(false)} />
      )}

      {/* Below top bar */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
