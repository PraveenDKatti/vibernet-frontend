import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import useAuthStore from "../../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();

  const handleLogin = async () => {
    const success = await login({ email, password });
    if (success) {
      navigate("/");
    }
  };

  return (
    <Modal>
      {/* Self-contained backdrop overlay using a soft, dimmed slate-gray glass mask */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        
        {/* Main Card: Light cloud / whitesmoke canvas with subtle sky-blue drop shadow */}
        <div className="w-full max-w-md bg-slate-50 border border-slate-200/80 rounded-2xl p-8 shadow-[0_20px_50px_rgba(148,163,184,0.15)] relative overflow-hidden">
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Welcome Back</h2>
            <p className="text-xs text-slate-500 mt-1.5">Sign in to safely access your account dashboard.</p>
          </div>

          {error && (
            <p className="text-red-600 text-xs bg-red-50 border border-red-100 p-3 rounded-xl mb-4 text-center font-medium">
              {error}
            </p>
          )}

          <div className="space-y-4">
            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all duration-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
                placeholder="Email or Username"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all duration-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
                placeholder="Password"
              />
            </div>

            {/* Crisp, solid slate button with smooth interactions */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full mt-2 bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 rounded-xl transition-all duration-200 text-sm shadow-sm active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </div>

          <p className="text-xs text-slate-500 text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-slate-800 hover:text-sky-600 font-semibold underline underline-offset-4 decoration-slate-300 hover:decoration-sky-400 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
        
      </div>
    </Modal>
  );
}