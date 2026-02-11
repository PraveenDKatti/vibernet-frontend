export default function Modal({ children }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-card p-6 rounded-xl w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
