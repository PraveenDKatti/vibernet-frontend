import { useEffect } from "react";

export default function Modal({ children, onClick }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClick) {
        onClick();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClick]);

  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative z-50">
        {children}
      </div>
    </div>
  );
}
