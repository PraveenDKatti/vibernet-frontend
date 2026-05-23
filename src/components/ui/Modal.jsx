export default function Modal({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300">
      {children}
    </div>
  );
}
