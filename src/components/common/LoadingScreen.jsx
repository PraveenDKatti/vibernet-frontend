import React from "react";

export default function LoadingScreen({
  message = "Loading...",
  overlay = false,
  size = "md",
}) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`flex items-center justify-center gap-3
        ${overlay ? "absolute inset-0 bg-white/70 dark:bg-black/60 z-10" : ""}
      `}
    >
      <div
        className={`animate-spin rounded-full border-t-transparent
          border-gray-700 dark:border-gray-300
          ${sizeClasses[size] || sizeClasses.md}
        `}
      />
      {message && (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {message}
        </span>
      )}
    </div>
  );
}
