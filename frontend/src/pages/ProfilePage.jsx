import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Settings, LogOut, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, logout } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 p-4">
      
      <div className="w-[360px] bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Top Bar (Chatty + Actions) */}
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-4 flex justify-between items-center text-white">

          {/* Chatty Logo → Home */}
          <div 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer font-semibold"
          >
            <MessageSquare size={18} />
            Home Screen
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => navigate("/settings")}
              className="bg-white/20 p-2 rounded-full hover:bg-white/30"
            >
              <Settings size={16} />
            </button>

            <button 
              onClick={() => navigate("/profile")}
              className="bg-white/20 p-2 rounded-full hover:bg-white/30"
            >
              <User size={16} />
            </button>

            <button 
              onClick={logout}
              className="bg-white/20 p-2 rounded-full hover:bg-red-400"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative flex justify-center mt-6">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
            />

            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full cursor-pointer ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 text-center">

          <h2 className="text-lg font-semibold mt-3">
            {authUser?.fullName}
          </h2>
          <p className="text-sm text-gray-400">User Profile</p>

          {/* Info Card */}
          <div className="mt-6 bg-gray-100 rounded-2xl p-4 text-left space-y-3">

            <p className="text-sm font-medium text-gray-600">Account Info</p>

            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-500">
                <User size={16} /> Name
              </span>
              <span>{authUser?.fullName}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-500">
                <Mail size={16} /> Email
              </span>
              <span>{authUser?.email}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Date And Time</span>
              <span>{new Date().toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>

          {/* Upload Status */}
          <p className="mt-4 text-xs text-gray-400">
            {isUpdatingProfile
              ? "Uploading..."
              : "Tap camera icon to update photo"}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;