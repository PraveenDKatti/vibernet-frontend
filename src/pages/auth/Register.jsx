import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import useAuthStore from "../../store/authStore";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const navigate = useNavigate();
  const { register, loading, error } = useAuthStore();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    const success = await register(formData);
    if (success) {
      navigate("/login");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Modal onClick={handleClose}>
      {/* Main Card */}
      <div className="w-[90vw] max-w-md bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-zinc-900 dark:text-zinc-100">

        <div className="text-center mb-5">
          <h2 className="text-2xl font-semibold tracking-tight">Create Account</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">Join us and set up your personal profile.</p>
        </div>

        {error && (
          <p className="text-red-500 text-xs bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 p-3 rounded-xl mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1 custom-scrollbar">

          {/* Avatar Circle */}
          <div className="flex flex-col items-center justify-center pb-2">
            <label className="relative group cursor-pointer flex flex-col items-center justify-center w-20 h-20 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-sky-400 bg-white dark:bg-zinc-800 shadow-xs transition-all overflow-hidden">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center text-zinc-400 group-hover:text-sky-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
            <span className="text-sm tracking-wider text-zinc-400 mt-2 font-medium group-hover:text-zinc-600 dark:group-hover:text-zinc-200">Add Avatar</span>
          </div>

          <div className="space-y-3">
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />

            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <Button
            onClick={handleRegister}
            isLoading={loading}
            className="w-full mt-2"
          >
            Register Account
          </Button>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-zinc-800 dark:text-zinc-200 hover:text-sky-600 font-semibold underline underline-offset-4 decoration-zinc-300 hover:decoration-sky-400 transition-colors">
            Login here
          </Link>
        </p>
      </div>
    </Modal>
  );
}