import { Link } from "react-router-dom";
import { Home, User2, Layers, Menu } from "lucide-react";

export default function OverlaySidebar({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      
      {/* Sidebar panel */}
      <div className="w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex flex-col">
        
        {/* Header */}
        <header className="h-16 flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu size={20} />
          </button>
          <span className="font-semibold text-lg">MyTube</span>
        </header>

        {/* Nav */}
        <nav className="flex flex-col py-4 gap-2">
          <Link to="/" onClick={onClose} className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link to="/subscriptions" onClick={onClose} className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Layers size={20} />
            <span>Subscriptions</span>
          </Link>

          <Link to="/profile" onClick={onClose} className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <User2 size={20} />
            <span>Profile</span>
          </Link>
        </nav>

        <hr />

        <div className="flex flex-col">
          <button className="px-4 py-2 text-left hover:bg-gray-100">Help</button>
          <button className="px-4 py-2 text-left hover:bg-gray-100">Report</button>
          <button className="px-4 py-2 text-left hover:bg-gray-100">Feedback</button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={onClose}
        className="flex-1 bg-black/40"
      />
    </div>
  );
}
