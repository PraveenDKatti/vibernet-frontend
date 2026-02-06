import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, LogOut, LayoutDashboard } from "lucide-react";
import authStore from "../../store/authStore";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = authStore();
  const navigate = useNavigate();
  const menuRef = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/signin");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        <img 
          src={user?.avatar} 
          className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 object-cover" 
          alt="User" 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
            <p className="text-sm font-semibold truncate">{user?.fullName}</p>
            <p className="text-xs text-gray-500 truncate">@{user?.username}</p>
          </div>
          
          <Link to={`/channel/${user?.username}`} className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
            <User size={16} /> Your Channel
          </Link>
          <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
            <LayoutDashboard size={16} /> Studio Dashboard
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
            <Settings size={16} /> Settings
          </Link>
          
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 mt-2 border-t border-gray-100 dark:border-gray-800">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}