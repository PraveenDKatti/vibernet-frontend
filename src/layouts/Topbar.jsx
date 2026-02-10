import { Link } from "react-router-dom";
import { Menu, Search, User } from "lucide-react";
import authStore from "../store/authStore";
import UserMenu from "../components/common/UserMenu";

export default function TopBar({ onMenuClick }) {
  const { isAuthenticated } = authStore();

  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black sticky top-0 z-40">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <Menu size={20} />
        </button>
        <Link to="/" className="text-3xl font-phenomonaRegular">Vibernet</Link>
      </div>

      {/* Center (Search) */}
      <div className="hidden md:flex items-center w-1/2 max-w-[600px] h-10">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 px-4 h-full border border-gray-300 dark:border-gray-700 rounded-l-full outline-none bg-transparent focus:border-purple-500"
        />
        <button className="w-16 flex justify-center items-center h-full bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full">
          <Search size={18} />
        </button>
      </div>

      {/* Right - Conditional Rendering */}
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <Link
            to="/signin"
            className="flex gap-2 border border-gray-300 dark:border-gray-700 px-4 py-1.5 items-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm font-medium"
          >
            <User size={18} className="text-gray-700" />
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}