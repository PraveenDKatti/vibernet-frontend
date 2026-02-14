import { Link } from "react-router-dom";
import { Home, User2, Layers, Menu } from "lucide-react";
import logo2 from "../assets/icons/logo2.svg"

export default function OverlaySidebar({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex">

      {/* Sidebar panel */}
      <div className="w-60 bg-white flex flex-col">

        {/* Header */}
        <header className="h-14 flex items-center gap-3 px-4">
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu size={22} />
          </button>
          <Link to="/" className="flex items-center gap-1"><img src={logo2} className="h-5" alt="logo" /><p className="text-[22px] font-semibold leading-none font-googleRoboto">Vibernet</p></Link>
        </header>

        {/* Nav */}
        <nav className="flex flex-col p-4 gap-2">
          <Link to="/" onClick={onClose} className="flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Home size={22} />
            <span className="leading-none">Home</span>
          </Link>

          <Link to="/subscriptions" onClick={onClose} className="flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Layers size={22} />
            <span className="leading-none">Subscriptions</span>
          </Link>

          <Link to="/profile" onClick={onClose} className="flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <User2 size={22} />
            <span className="leading-none">Profile</span>
          </Link>
        </nav>

        <div className="h-2 border-b border-gray-400 mx-4" />

        <div className="flex flex-col p-4">
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
