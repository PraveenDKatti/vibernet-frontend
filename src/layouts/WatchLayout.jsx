import { Outlet } from "react-router-dom";
import TopBar from "./Topbar";
import { useState } from "react";

export default function WatchLayout() {

  return (
    <div className="h-screen flex flex-col">
          {/* Top bar */}
          <TopBar />
          
          {/* OverlaySidebar */}
    
          {/* Below top bar */}
          <div className="flex flex-1 overflow-hidden">
            {/* Main content */}
            <main className="flex-1 overflow-y-auto p-4">
              <Outlet />
            </main>
          </div>
        </div>
  );
}
