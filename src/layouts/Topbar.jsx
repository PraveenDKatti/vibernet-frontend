import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, User, Mic, Plus, Bell, EllipsisVertical } from "lucide-react";
import useAuthStore from "../store/authStore";
import UserMenu from "../components/common/UserMenu";
import logo2 from "../assets/icons/logo2.svg";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function TopBar({ onMenuClick }) {
  const [query, setQuery] = useState("");
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) return; // 🚫 Don't search if empty

    navigate(`/results?search_query=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      handleSearch();
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleStart = () => {
    resetTranscript();
    setIsOpen(true);
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  const handleClose = () => {
    setIsOpen(false);
    SpeechRecognition.stopListening();
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 sticky top-0 z-40">

      {/* Left */}
      <div className="flex items-center gap-3 pr-2">
        <button
          onClick={onMenuClick}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu size={22} />
        </button>

        <Link to="/" className="flex items-center gap-1">
          <img src={logo2} className="h-5" alt="logo" />
          <p className="text-[22px] font-semibold leading-none font-googleRoboto">
            Vibernet
          </p>
        </Link>
      </div>

      {/* Center (Search) */}
      <div className="hidden ml-15 md:flex items-center md:w-[650px] h-10">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search"
          className="flex-1 px-4 h-full border border-gray-300 dark:border-gray-700 rounded-l-full outline-none bg-transparent focus:border-blue-800"
        />

        <button
          onClick={handleSearch}
          disabled={!query.trim()}
          className="w-15 flex justify-center items-center h-full bg-zinc-50 hover:bg-zinc-100 border border-l-0 border-gray-300 rounded-r-full"
        >
          <Search size={22} />
        </button>

        <button className="ml-4 p-[10px] bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 rounded-full"
          onClick={handleStart}
        >
          <Mic size={22} />
        </button>

        {/* Modal Overlay (Shadow Background) */}
        {isOpen && (
          <div
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          >
            {/* Modal Box */}
            <div
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
              className="w-full max-w-md transform rounded-2xl bg-white p-6 text-center shadow-2xl transition-all scale-100"
            >
              {/* Pulsing Voice Indicator */}
              <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-4 w-4 rounded-full bg-red-600"></span>
              </div>

              {/* Status Headings */}
              <h3 className="text-xl font-bold text-gray-800">Listening...</h3>
              <p className="mt-1 text-sm text-gray-500">Speak clearly into your microphone</p>

              {/* Real-time Translation Box */}
              <div className="mt-4 min-h-[100px] rounded-xl bg-gray-50 p-4 text-left border border-gray-100">
                {transcript ? (
                  <p className="text-gray-800 font-medium leading-relaxed">{transcript}</p>
                ) : (
                  <p className="italic text-gray-400">Translating your voice live...</p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="w-full rounded-lg bg-gray-900 px-4 py-2.5 font-medium text-white shadow hover:bg-gray-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Right */}
      <div className="px-2">
        {isAuthenticated ? (
          <div className="flex items-center h-10">
            <label className="flex mr-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-200 hover:bg-zinc-200 rounded-full cursor-pointer">
              <Plus size={24} />
              <button className="text-sm font-medium ml-1">
                Create
              </button>
            </label>

            <button className="mr-1 hover:bg-zinc-200 rounded-full">
              <Bell size={24} className="m-2" />
            </button>

            <UserMenu />
          </div>
        ) : (
          <div className="flex items-center">
            <EllipsisVertical size={20} className="mx-2" />
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