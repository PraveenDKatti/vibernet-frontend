import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
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

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Modal onClick={handleClose}>
      {/* Main Card */}
      <div className="w-[90vw] max-w-md bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-zinc-900 dark:text-zinc-100">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Welcome Back</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">Sign in to safely access your account dashboard.</p>
        </div>

        {error && (
          <p className="text-red-500 text-xs bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 p-3 rounded-xl mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div className="space-y-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Username"
            />

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <Button
            onClick={handleLogin}
            isLoading={loading}
            className="w-full mt-2"
          >
            Sign In
          </Button>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-zinc-800 dark:text-zinc-200 hover:text-sky-600 font-semibold underline underline-offset-4 decoration-zinc-300 hover:decoration-sky-400 transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </Modal>
  );
}