import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, ChevronLeft, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-[#FFF4D2] flex items-center justify-center p-4">
      
      {/* Main Card */}
      <div className="w-full max-w-[400px] bg-[#FFEBB7] rounded-[40px] p-8 shadow-sm relative overflow-hidden">
        
        {/* Navigation Row - Yahan Settings aur Back button hai */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          
          <div className="flex items-center gap-2 bg-white/40 px-4 py-1.5 rounded-full border border-white/20">
            <MessageSquare className="w-4 h-4 text-[#FF9F43]" />
            <span className="font-bold text-gray-800 text-xs tracking-tight">Vibe Wire</span>
          </div>
          
          <Link to="/settings" className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-700" />
          </Link>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
              Welcome Back
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-6 py-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-orange-200 outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-6 py-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-orange-200 outline-none"
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

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#FF9F43] hover:bg-[#f08d2d] text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all flex justify-center items-center gap-2"
            >
              {isLoggingIn ? <Loader2 className="h-5 w-5 animate-spin" /> : "Log In"}
            </button>
          </form>

          <div className="text-center space-y-4 pt-2">
            <Link to="/forgot-password" size="sm" className="text-sm text-orange-500 font-medium">
              Forgot Password?
            </Link>
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-gray-800 font-bold ml-1">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;