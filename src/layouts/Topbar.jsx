import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, X, User, Mic, Plus, Bell  } from "lucide-react";
import useAuthStore from "../store/authStore";
import UserMenu from "../components/common/UserMenu";
import PageMenu from "../components/common/PageMenu"
import logo2 from "../assets/icons/logo2.svg";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function TopBar({ onMenuClick }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const { isAuthenticated } = useAuthStore();

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

  const handleStart = async () => {
    resetTranscript();
    setIsOpen(true);

    await SpeechRecognition.startListening({
      continuous: false,
      interimResults: true,
      language: "en-US",
    });
  };

  const handleClose = () => {
    SpeechRecognition.stopListening();
    setIsOpen(false);
  };

  useEffect(() => {
    if (!listening && transcript) {
      setIsOpen(false);
      handleSearch() /* Search immeadialey after speech input stops */
    }
  }, [listening, transcript]);

  useEffect(() => {
    setQuery(transcript);
  }, [transcript]);


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
              className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-2xl transition-all scale-100"
            >
              {/* Top container */}
              <div className="w-full flex justify-between">
                {/* Status Headings */}
                <h3 className="inline text-xl font-bold text-gray-800">Listening...</h3>
                <span onClick={handleClose}><X /></span>
              </div>

              {/* Real-time Translation Box */}
              <div className="mb-4 min-h-[100px] rounded-xl p-4 text-left">
                {transcript ? (
                  <p className="text-gray-800 font-medium leading-relaxed">{transcript}</p>
                ) : (
                  <p className="italic text-gray-400">Speak clearly into your microphone</p>
                )}
              </div>

              {/* Pulsing Voice Indicator */}
              <div className="flex items-center justify-center">
                <div className="relative my-4 h-12 w-12">
                  <span className={`absolute inline-flex h-full w-full ${listening ? "animate-ping" : ""} rounded-full bg-red-400 opacity-75`}></span>
                  <span className="relative inline-flex h-full w-full rounded-full bg-red-600 text-white justify-center items-center"><Mic size={22} /></span>
                </div>
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
            {/* page menu container */}
            <div>
              <PageMenu />
            </div>
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