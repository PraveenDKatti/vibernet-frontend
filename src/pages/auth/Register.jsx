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
  const [avatarPreview, setAvatarPreview] = useState(null);

  const navigate = useNavigate();
  const { register, login, loading, error } = useAuthStore();

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
      console.log(success)
      navigate("/login");
    }
    console.log(error);
  };

  return (
    <Modal>
      {/* Self-contained backdrop overlay */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        
        {/* Main Card */}
        <div className="w-full max-w-md bg-slate-50 border border-slate-200/80 rounded-2xl p-8 shadow-[0_20px_50px_rgba(148,163,184,0.15)] relative overflow-hidden">
          
          <div className="text-center mb-5">
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Create Account</h2>
            <p className="text-xs text-slate-500 mt-1.5">Join us and set up your personal profile.</p>
          </div>

          {error && (
            <p className="text-red-600 text-xs bg-red-50 border border-red-100 p-3 rounded-xl mb-4 text-center font-medium">
              {error}
            </p>
          )}

          <div className="space-y-4 max-h-[68vh] overflow-y-auto px-1 custom-scrollbar">
            
            {/* Soft Slate Avatar Circle */}
            <div className="flex flex-col items-center justify-center pb-2">
              <label className="relative group cursor-pointer flex flex-col items-center justify-center w-20 h-20 rounded-full border border-dashed border-slate-300 hover:border-sky-400 bg-white shadow-xs transition-all overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-sky-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
              <span className="text-md tracking-wider text-slate-400 mt-2 font-medium group-hover:text-slate-600">Add Avatar</span>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all duration-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
                placeholder="Full Name"
              />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all duration-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
                placeholder="Username"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all duration-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
                placeholder="Email Address"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all duration-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
                placeholder="Password"
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full mt-2 bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 rounded-xl transition-all duration-200 text-sm shadow-sm active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register Account"}
            </button>
          </div>

          <p className="text-xs text-slate-500 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-slate-800 hover:text-sky-600 font-semibold underline underline-offset-4 decoration-slate-300 hover:decoration-sky-400 transition-colors">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </Modal>
  );
}