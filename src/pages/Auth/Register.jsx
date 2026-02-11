import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import useAuthStore from "../../store/authStore";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const navigate = useNavigate();
  const { register, login, loading, error } = useAuthStore();

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImage", coverImage);

    const success = await register(formData);
    if (success) {
      const loggedIn = await login({ email, password });
      if (loggedIn) {
        navigate("/");
      }
    }

    console.log(error)

  };

  return (
    <Modal>
      <h2 className="text-2xl font-medium mb-6 text-white text-center">Create Account</h2>

      {error && <p className="text-red-500 text-xs bg-red-500/10 p-2 rounded mb-4">{error}</p>}

      <div className="space-y-3 max-h-[70vh] overflow-y-auto px-1">
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-white"
          placeholder="Full Name"
        />

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-white"
          placeholder="Username"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-white"
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2.5 rounded bg-zinc-900 border border-zinc-700 text-white outline-none focus:border-white"
          placeholder="Password"
        />

        <div className="pt-2">
          <label className="text-xs text-gray-400 block mb-1">Avatar (Required)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
          />
        </div>

        <div className="pt-2 pb-4">
          <label className="text-xs text-gray-400 block mb-1">Cover Image (Required)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-white hover:bg-white/90 font-medium py-2.5 rounded transition-all disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </div>

      <p className="text-sm text-gray-400 text-center mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-white hover:underline">
          Login
        </Link>
      </p>
    </Modal>
  );
}