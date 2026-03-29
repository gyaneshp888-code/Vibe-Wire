import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, ChevronLeft, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    // SignUp ke liye soft blue background
    <div className="min-h-screen bg-[#E0F2FF] flex items-center justify-center p-4">
      
      {/* Main Card */}
      <div className="w-full max-w-[400px] bg-[#CDE9FF] rounded-[40px] p-8 shadow-sm relative overflow-hidden">
        
        {/* Navigation Row - Header inside Card */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/login" className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          
          <div className="flex items-center gap-2 bg-white/40 px-4 py-1.5 rounded-full border border-white/20">
            <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
            <span className="font-bold text-gray-800 text-xs tracking-tight">Vibe Wire</span>
          </div>
          
          <Link to="/settings" className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-700" />
          </Link>
        </div>

        <div className="mt-4 space-y-8">
          {/* Header Text */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
              Create <br /> Account
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-6 py-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full px-6 py-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-6 py-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-400"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all flex justify-center items-center gap-2 mt-4"
            >
              {isSigningUp ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center pt-2">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-gray-800 font-bold ml-1 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#B8DFFF] rounded-full blur-3xl -z-10 opacity-60"></div>
      </div>
    </div>
  );
};

export default SignUpPage;