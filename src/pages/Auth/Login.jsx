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
      <h2 className="text-2xl font-medium mb-6 text-white text-center">Login</h2>

      {error && <p className="text-red-500 text-xs bg-red-500/10 p-2 rounded mb-4">{error}</p>}

      <div className="space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-white"
          placeholder="Email or Username"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-white"
          placeholder="Password"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white hover:bg-white/90 font-medium py-2.5 rounded transition-all disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <p className="text-sm text-gray-400 text-center mt-6">
        Don’t have an account?{" "}
        <Link to="/register" className="text-white hover:underline">
          Register
        </Link>
      </p>
    </Modal>
  );
}