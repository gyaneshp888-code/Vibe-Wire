import { ChevronLeft, MoreVertical, Phone, Video } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser?._id);

  if (!selectedUser) return null;

  return (
    <div className="px-4 py-3 bg-white/80 backdrop-blur-md flex items-center justify-between border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      
      {/* Left Section: Back Button + User Info */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setSelectedUser(null)} 
          className="p-1 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-blue-500"
        >
          <ChevronLeft className="size-7" />
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          {/* User Avatar with Online Indicator */}
          <div className="relative">
            <div className="size-10 rounded-full overflow-hidden border border-gray-100 shadow-sm transition-transform group-active:scale-95">
              <img 
                src={selectedUser?.profilePic || "/avatar.png"} 
                className="object-cover w-full h-full" 
                alt="user profile" 
              />
            </div>
            {isOnline && (
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-bold text-gray-800 text-[16px] leading-tight truncate max-w-[150px]">
              {selectedUser?.fullName}
            </h3>
            <span className={`text-[11px] font-medium ${isOnline ? "text-green-500" : "text-gray-400"}`}>
              {isOnline ? "Active now" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Action Icons */}
      <div className="flex items-center gap-5 text-blue-500">
        <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
          <Video className="size-5" />
        </button>
        <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
          <Phone className="size-5" />
        </button>
        <button className="hover:bg-gray-50 p-2 rounded-full transition-colors text-gray-400">
          <MoreVertical className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;