import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, MoreVertical, MessageSquarePlus } from "lucide-react"; // Naye icons

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-96 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100">
      {/* Header: WhatsApp Style */}
      <div className="p-4 flex justify-between items-center bg-base-200/50">
        <h1 className="text-xl font-bold hidden lg:block">Chats</h1>
        <div className="flex gap-4">
          <MessageSquarePlus className="size-5 cursor-pointer text-zinc-500" />
          <MoreVertical className="size-5 cursor-pointer text-zinc-500" />
        </div>
      </div>

      {/* Search Bar: WhatsApp Style */}
      <div className="px-4 py-2 hidden lg:block">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="size-4 text-zinc-500" />
          </span>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-base-200 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-0"
          />
        </div>
      </div>

      {/* Online Filter Chips */}
      <div className="px-4 py-2 flex gap-2 hidden lg:flex">
         <button 
          onClick={() => setShowOnlineOnly(false)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${!showOnlineOnly ? 'bg-green-100 text-green-700' : 'bg-base-200 text-zinc-500'}`}
         >
           All
         </button>
         <button 
          onClick={() => setShowOnlineOnly(true)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${showOnlineOnly ? 'bg-green-100 text-green-700' : 'bg-base-200 text-zinc-500'}`}
         >
           Online ({onlineUsers.length - 1})
         </button>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full mt-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-4 flex items-center gap-4
              hover:bg-base-200 transition-all border-b border-base-200/50
              ${selectedUser?._id === user._id ? "bg-base-200" : ""}
            `}
          >
            {/* Avatar Section */}
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-14 object-cover rounded-full border border-base-300"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full ring-2 ring-base-100" />
              )}
            </div>

            {/* User Info: WhatsApp Layout */}
            <div className="hidden lg:flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[15px] truncate text-base-content">
                  {user.fullName}
                </span>
                <span className="text-[11px] text-zinc-500">12:30 PM</span>
              </div>
              <div className="text-[13px] text-zinc-500 truncate flex items-center gap-1">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-green-600 font-medium">Online</span>
                ) : (
                  "Tap to chat"
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-10 text-sm italic">No conversations found</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;