import { useEffect, useState } from "react";

export default function PageL() {

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Animated infinite progress bar */}
      <div className="relative w-3/5 h-2 bg-gray-300 overflow-hidden rounded-full mb-6">
        <div className="absolute h-full w-1/3 bg-black animate-slide"></div>
      </div>

      {/* Motivational/taunting quote */}
      <div className="text-center text-gray-600 italic text-sm max-w-md">
        It takes less than your time spent on a YouTube short.
      </div>
    </div>
  );
}