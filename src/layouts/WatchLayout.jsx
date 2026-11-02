import { Outlet } from "react-router-dom";
import TopBar from "../components/navigation/Topbar";
import { Suspense } from "react";
import PageLoader from "../components/common/PageLoader";

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
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
