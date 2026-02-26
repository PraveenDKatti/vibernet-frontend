import { Link } from "react-router-dom";
import { Menu, Search, User, Mic, Plus, Bell, EllipsisVertical } from "lucide-react";
import authStore from "../store/authStore";
import UserMenu from "../components/common/UserMenu";
import logo2 from "../assets/icons/logo2.svg"

export default function TopBar({ onMenuClick }) {
  const { isAuthenticated } = authStore();

  return (
    <header className="h-14 flex items-center justify-between px-4 sticky top-0 z-40">

      {/* Left */}
      <div className="flex items-center gap-3 pr-2">
        <button onClick={onMenuClick} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <Menu size={22} />
        </button>
        <Link to="/" className="flex items-center gap-1"><img src={logo2} className="h-5" alt="logo" /><p className="text-[22px] font-semibold leading-none font-googleRoboto">Vibernet</p></Link>
      </div>

      {/* Center (Search) */}
      <div className="hidden md:flex items-center w-2/3 max-w-[650px] h-10">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 px-4 h-full border border-gray-300 dark:border-gray-700 rounded-l-full outline-none bg-transparent focus:border-blue-800"
        />
        <button className="w-15 flex justify-center items-center h-full bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full">
          <Search size={22} />
        </button>
        <button className="ml-4 p-[10px] bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 rounded-full">
          <Mic size={22} />
        </button>
      </div>

      {/* Right - Conditional Rendering */}
      <div className="px-2">
        {isAuthenticated ? (
          <div className="flex items-center h-10">
            <label className="flex mr-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-200 hover:bg-zinc-200 rounded-full">
              <Plus size={24} />
              <button className="text-sm font-medium ml-1">Create</button>
            </label>
            <button className="mr-1">
              <Bell size={24} className="mx-2" />
            </button>
            <UserMenu />
          </div>
        ) : (
          <div className="flex items-center">
            <EllipsisVertical size={20} className="mx-2"/>
            <Link
            to="/login"
            className="flex gap-2 border border-gray-300 dark:border-gray-700 px-4 py-1.5 items-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm font-medium"
          >
            <User size={18} className="text-gray-700" />
            Log In
          </Link>
          </div>
        )}
      </div>
    </header>
  );
}