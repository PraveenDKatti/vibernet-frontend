import { useEffect, useState } from "react";

export default function PageLoader() {
  // Persistent start time to survive refresh
  const storedStart = typeof window !== "undefined" ? localStorage.getItem("startTime") : null;
  const startTime = storedStart ? Number(storedStart) : Date.now();

  if (!storedStart && typeof window !== "undefined") {
    localStorage.setItem("startTime", startTime.toString());
  }

  const [ms, setMs] = useState(Date.now() - startTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setMs(Date.now() - startTime);
    }, 16); // roughly 60fps

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-8">
      {/* Infinite sliding bar */}
      <div className="relative w-3/5 h-2 bg-gray-300 overflow-hidden rounded-full mb-4">
        <div className="absolute h-full w-1/3 bg-gray-600 animate-slide"></div>
      </div>

      {/* Milliseconds message */}
      <div className="text-xs text-gray-500 text-center mb-1">
        Every millisecond you are aging…
      </div>

      {/* Milliseconds counter */}
      <div className="text-sm text-gray-400 font-mono mb-4">
        {ms.toLocaleString()} ms
      </div>

      {/* Motivational/taunting quote */}
      <div className="text-center text-gray-600 italic text-sm max-w-md">
        For every scroll of shorts, you have successfully added wisdom by utilizing this time.
      </div>

      {/* Tailwind keyframes for sliding bar */}
      <style jsx>{`
        @keyframes slide {
          0% { left: -33%; }
          50% { left: 100%; }
          100% { left: -33%; }
        }
        .animate-slide {
          animation: slide 2s linear infinite;
        }
      `}</style>
    </div>
  );
}